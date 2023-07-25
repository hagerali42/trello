import { auth } from '../../middleware/auth.js';
import * as userController from './controller/user.controller.js'
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import * as validator from './validation.js';
const router = Router()
// 3-change password (user must be logged in)
router.patch('/change-password',validation(validator.change_password), auth ,userController.changePassword )

// 4-update user (age , firstName , lastName)(user must be logged in)
router.put('/',validation(validator.update), auth ,userController.updateUser )

// 5-delete user(user must be logged in)
router.delete('/', auth ,userController.deleteUser )

// 6-soft delete(user must be logged in)
router.patch('/soft-delete', auth ,userController.deleteSoft )

// 7-logout
router.patch('/logout', auth ,userController.logout )





export default router