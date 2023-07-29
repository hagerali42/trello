import { auth } from '../../middleware/auth.js';
import {admain } from '../../middleware/admain.js';
import * as taskController from './controller/task.controller.js'
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import * as validator from './validation.js';
const router = Router()
//1- Add a new task
router.post('/',validation(validator.addTask), [ auth,admain] , taskController.addTask )

// 2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
router.put('/:taskId',validation(validator.updateTask), [ auth,admain] , taskController.updateTask )

// 3-delete task(user must be logged in) (creator only can delete task)
router.delete('/:taskId',validation(validator.deleteTask), [ auth,admain] , taskController.deleteTask )

// 4-get all tasks with user data  التسكات الي المدير عملها
router.get('/', taskController.getAllTask )


// 5-Get tasks of one user with user data  (manger)التسكات الي المدير عملها
router.get('/taskAdmain', [ auth,admain] , taskController.getAllCreatedTask )

//6-get all tasks assigen to me(client)
router.get('/taskEmployee',auth, taskController.getAllAssigntome )

// 7-Get all tasks that are not done after deadline
router.get('/lateTasks',auth, taskController.lateTasks )

router.get('/CompleteTasks', taskController.getAllTaskComplete )

//8- Get all tasks that are not done after deadline (employee)
router.get('/lateTasks/employee',auth, taskController.lateTasksEmployee )


export default router