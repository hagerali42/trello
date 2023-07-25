
import { validation } from '../../middleware/validation.js';
import * as authController from './controller/auth.controller.js'
import { Router } from "express";
import * as validator from './validation.js';

const router = Router();
// 1-signUp 
router.post("/signup", validation(validator.signup),authController.signup)

// 2-login-->with create token
router.post("/login", validation(validator.login),authController.login)

router.get("/confirmEmail/:token", validation(validator.confirmEmail),authController.confirmEmail)
router.get("/newconfirmEmail/:token", validation(validator.newconfirmEmail),authController.newconfirmEmail)
router.get("/unsubscribe/:token",authController.unsubscribe)

router.post("/fogetPassword", validation(validator.forgetPassword),authController.forgetPassword)
router.post("/resetPassword", validation(validator.resetpassword),authController.resetpassword)





export default router