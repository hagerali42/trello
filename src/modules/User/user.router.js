import { auth } from '../../middleware/auth.js';
import {admain } from '../../middleware/admain.js';

import * as userController from './controller/user.controller.js'
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import * as validator from './validation.js';
import { cloudinaryUpload } from '../../utils/multercloud.js';
const router = Router()
// 3-change password (user must be logged in)
router.patch('/change-password',
validation(validator.change_password),
auth ,userController.changePassword )

// 4-update user (age , firstName , lastName)(user must be logged in)
router.put('/',
validation(validator.update),
[ auth] ,userController.updateUser )

// 5-delete user(user must be logged in)
router.delete('/',
[ auth,admain] ,
userController.deleteUser )

//6-get All users
router.get('/users',
[ auth,admain] ,
userController.getAlluserass )
//get one user
router.get('/Oneuser',
auth,
userController.getUsr )
// 7-soft delete(user must be logged in)
router.patch('/soft-delete',
[ auth,admain] ,
userController.deleteSoft )

// //8-uploade profile Picture
// router.post('/users/profilePic',auth,
// upload().single('profilePic'),
// userController.profilePicture )

// 7-logout
router.patch('/logout',
auth ,userController.logout )

//8-profile
router.post('/profilePic',auth,
cloudinaryUpload().single('profilePic'),
userController.profilePicture )




export default router