
import userModel from '../../../../DB/model/User.model.js';
import SendEmail from '../../../utils/email.js';
import { asyncHandler } from '../../../utils/errorHandling.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import VerificationCode from '../../../../DB/model/Verefication.model.js';
 import * as validators from '../validation.js'
// 1-signUp 
export const signup = asyncHandler(
    async (req, res, next) => {

 const { userName, email, password, age, gender, phone } = req.body;

            // console.log({ age, gender, phone, userName, email, password });
            const checkUser = await userModel.findOne({ email }) 
            if (checkUser) {
                return next(new Error("Email Exist", {cause:409}))
            }
            const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
            const user = await userModel.create({ userName, email, password: hashPassword, age, gender, phone })


            //confirm Email
            const confirmEmailToken=jwt.sign({id:user.id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn: 10*60 })
            const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${confirmEmailToken}`

            //new request to confirm email valid 1 month ago
            const ReqNewconfirmEmailToken=jwt.sign({id:user.id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn: 60*60*24*30 })
            const ReqNewconfirmEmailLink=`${req.protocol}://${req.headers.host}/auth/newconfirmEmail/${ReqNewconfirmEmailToken}`

            //unsubscribe
            const unsubtoken = jwt.sign({id:user.id,email:user.email },process.env.EMAIL_SIGNATURE);
            const unsubLink=`${req.protocol}://${req.headers.host}/auth/unsubscribe/${unsubtoken}`
//             const html=`
//             <a href="${link}">Confirm email</a>
//             <br>
//             <br>
//             <a href="${ReqNewconfirmEmailLink}"> New Confirm email</a>
//             <br>
//             <br>
//             <a href="${unsubLink}" style="background-color: red; color: white; padding: 10px; text-decoration: none;">
// Unsubscribe
// </a>
//             <br>
//             <br>
//             `
            const html=`<!DOCTYPE html>
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
            <style type="text/css">
            body{background-color: #88BDBF;margin: 0px;}
            </style>
            <body style="margin:0px;"> 
            <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
            <tr>
            <td>
            <table border="0" width="100%">
            <tr>
            <td>
            <h1>
                <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
            </h1>
            </td>
            <td>
            <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            <tr>
            <td>
            <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
            <tr>
            <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
            <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
            </td>
            </tr>

            <tr>
            <td>
            <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
            </td>
            </tr>

            <tr>
            <td>
            <p style="padding:0px 100px;">
            </p>
            </td>
            </tr>

            <tr>
            <td>
            <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
            </td>
            </tr>
               <br>
               <br>
            <tr>
            <td>
            <a href="${ReqNewconfirmEmailLink}" style="margin:30px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">New Confirm Email</a>
            </td>
            </tr>

            <br>
            <br>
            <tr>
            <td>
            <a href="${unsubLink}" style="margin:30px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:red; text-decoration: none; ">Unsubscribe</a>
            </td>
            </tr>
            <br>

            </table>
            </td>
            </tr>
            <tr>
            <td>
            <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
            <tr>
            <td>
            <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
            </td>
            </tr>
            <tr>
            <td>
            <div style="margin-top:20px;">

            <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
            
            <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
            </a>
            
            <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
            </a>

            </div>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body>
            </html>`
            await SendEmail({
                to:email,
                subject:'Confirm email',
                html
            })
            return res.status(200).json({ message: "Done", user })
       
    }
)
export const confirmEmail=asyncHandler(
 async(req, res, next) =>{
    const {token} = req.params
    // console.log({token});
    const decoded=jwt.verify(token,process.env.EMAIL_SIGNATURE)
    // console.log({decoded});
    const user=await userModel.findByIdAndUpdate(decoded.id,{confirmEmail:true})
    return user?res.json({message:'Done'}) //res.redirect("URL of Login Page")
     :res.send(`<a href="">Ops You Dont have an Account</a>`); 
 }
)
export const newconfirmEmail =asyncHandler(
    async(req, res, next) =>{
       const {token} = req.params
       // console.log({token});
       const decoded=jwt.verify(token,process.env.EMAIL_SIGNATURE)
       // console.log({decoded});
       const user=await userModel.findById(decoded.id)
       if(!user){
        return next(new Error(`<a href="">Ops You Dont have an Account</a>`, {cause:400})) //res.redirect("URL of SignUp Page")
       }
       
      if(user.confirmEmail){
        return next(new Error(`'your Email confirmedd  please login in!!!'`, {cause:400})) //res.redirect("URL of Login Page")
      }
          //if user founded and confirm email==false   Send new email
            const newToken=jwt.sign({id:user.id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn: 3*60 })
            const link=`${req.protocol}://${req.headers.host}/auth/newconfirmEmail/${newToken}`
            const html=`<!DOCTYPE html>
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
            <style type="text/css">
            body{background-color: #88BDBF;margin: 0px;}
            </style>
            <body style="margin:0px;"> 
            <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
            <tr>
            <td>
            <table border="0" width="100%">
            <tr>
            <td>
            <h1>
                <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
            </h1>
            </td>
            <td>
            <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            <tr>
            <td>
            <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
            <tr>
            <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
            <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
            </td>
            </tr>
            <tr>
            <td>
            <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
            </td>
            </tr>
            <tr>
            <td>
            <p style="padding:0px 100px;">
            </p>
            </td>
            </tr>
            <tr>
            <td>
            <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
            </td>
            <br>
            <br>
            </tr>
            </table>
            </td>
            </tr>
            <tr>
            <td>
            <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
            <tr>
            <td>
            <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
            </td>
            </tr>
            <tr>
            <td>
            <div style="margin-top:20px;">

            <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
            
            <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
            </a>
            
            <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
            <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
            </a>

            </div>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body>
            </html>`
            await SendEmail({
                to:user.email,
                subject:'Confirm email',
                html
            })
            return res.send('<h1> check your inbox now</h1>')

    }
)

export const unsubscribe =asyncHandler(
    async(req, res, next) =>{
       const {token} = req.params
       // console.log({token});
       const decoded=jwt.verify(token,process.env.EMAIL_SIGNATURE)
       // console.log({decoded});
       const user=await userModel.findByIdAndDelete(decoded.id)
       if(!user){
        return next(new Error(`<a href="">Ops You Dont have an Account</a>`, {cause:400})) //res.redirect("URL of SignUp Page")
       }
       
      if(user){
        res.json({message:'Email Deleted !!Register Now'}) //res.redirect("URL of SignUp Page")
      }
    }
)


// 2-login-->with create token
export const login = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new Error("In-valid email",{cause:400}))
        }
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return  next(new Error("In-valid login data",{cause:400}))
        }
        const token = jwt.sign({userName:user.userName,id:user._id ,isLoggedIn:user.isLoggedIn=true ,age:user.age,phone:user.phone},
             process.env.TOKEN_SIGNATURE,
             {expiresIn:60*60*24}
             );
        user.isLoggedIn==true 
        await user.save();
        return res.json({ message: "Done", token })
}
)


//foget password
export const forgetPassword= asyncHandler(
 async(req, res, next) =>{
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
    return next(new Error("User not found", {cause:400}))
    }
  
    const verificationCode = Math.floor(100000 + Math.random() * 900000); 
  
    await VerificationCode.create({ 
      userId: user._id,
      code: verificationCode,
      expireAt: Date.now() + 15 * 60 * 1000
    });
  
     // Send email
    await SendEmail({
    to:email,
    subject:'Reset Password',
    html:`Click this <a href="${req.protocol}://${req.headers.host}/resetPassword?code=${verificationCode}">${verificationCode}</a> to reset your password.`
    })
  
   return res.json({message:"verification code send successful"});
 }
)

// Reset password route 
export const resetpassword= asyncHandler(
    async(req, res, next) =>{
        const { email, verificationCode, newPassword ,confirmPassword} = req.body;
        if (newPassword !== confirmPassword) {
            return next(new Error("Passwords do not match", {cause:400}))
        }
        const user = await userModel.findOne({ email });
  
        if (!user) {
            return next(new Error('Invalid link',{cause:400}))
        }
        const codeRecord = await VerificationCode.findOne({ 
          userId: user._id,
          code: verificationCode 
        });
      
        if (!codeRecord) {
            return next(new Error('Invalid link',{cause:400}))
        }
        user.password =await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUND));
        await user.save();
        console.log({user});
         return res.send('Password reset successfully');
    }
)

