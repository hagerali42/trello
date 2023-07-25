import userModel from "../../../../DB/model/User.model.js"
// import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../../utils/errorHandling.js";


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
//7-logout
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
