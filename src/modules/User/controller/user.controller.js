import userModel from "../../../../DB/model/User.model.js"
// import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinery.js";


// 3-change password (user must be logged in)
export const changePassword =asyncHandler(
    async(req,res,next) => {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;   //FROM auth middleware 
        const  isMatch=await bcrypt.compare(oldPassword,user.password)
        if (!isMatch) {
            next(new Error('Invalid old password',{cause:400}))
            }
            user.password = await bcrypt.hash(newPassword, 8);
            await user.save();
            res.status(200).json({ message: 'Password updated' });
    }
    
)

// 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser =asyncHandler(
    async(req, res, next) => {
        const {userName,age,phone}=req.body
        const user = req.user;   //FROM auth middleware
        user.age = age;
        user.userName = userName;
        user.phone = phone;
        user.isLoggedIn = true;
        await user.save();
      return res.status(200).json({message: 'user updated', user });
    
    }
)
// 5-delete user(user must be logged in)
export const deleteUser =asyncHandler(
    async(req, res, next) => {
        const user = req.user; //FROM auth middleware

        console.log(user.id,"dedeedede");
        await userModel.findByIdAndDelete(user.id);
        user.isDeleated=true;
        await user.save();
        return res.status(200).json({ message: 'User deleted' });
    
    }
)

// export const getprofile =asyncHandler(
//     async(req, res, next) => {
//         const user = req.user; //FROM auth middleware
//         const users=await userModel.find();
//         return res.status(200).json({ message: 'Done' ,users});
    
//     }
// )
// 6-soft delete(user must be logged in)
export const deleteSoft =asyncHandler(

    async(req, res, next) => {
        const user = req.user;
        user.isDeleated=true;
        user.isLoggedIn=false
        await user.save();
        return res.status(200).json({ message: 'User soft deleted', data: { user}});
    
    }
)

// //8-profile picture
// export const profilePicture=asyncHandler(
//     async(req, res, next)=>{
//         return res.json({ message:"Done",file:req.file})
//     }

// )

//7-logoutttt
export const logout = asyncHandler(
    async (req, res, next) => {
    const user = req.user;
  
    // Check if user is already logged out
    if (user.isLoggedIn==false) {
      return next(new Error("User is already logged out", { cause: 400 }));
    }
   // Set user data  to false 
    const logOut = { ...user.toObject(), password: undefined,isLoggedIn : false };
   
  
    // Set isLoggedIn to false and save user
     user.isLoggedIn = false;
    await user.save();
  
    return res.status(200).json({ message: "Logged Out!" });
  });

  
  export const profilePicture = asyncHandler(async (req, res, next) => {
    const user = req.user; //from middleware
    //1-upload profile picture to cloudinery
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `users/${user.id}/profilePicture` }
    );
  
    //2-save file path in database
    const finduser = await userModel.findByIdAndUpdate(
      user.id,
      { profilePicture: { secure_url, public_id } },
      { new: true }
    );
  
    return res.json({ message: "Done", result: finduser });
  });
  export const getAlluserass =asyncHandler(
    async(req, res, next) => {
        const user = req.user; //FROM auth middleware
        const users=await userModel.find();
        return res.status(200).json({ message: 'Done' ,users});
    
    }
)
  export const getUsr = asyncHandler(async (req, res, next) => {
    const user = req.user; //from middleware  
    const finduser = await userModel.findById(user.id);
    return res.json({ message: "Done", result: finduser });
  });