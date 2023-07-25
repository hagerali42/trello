import userModel from "../../../../DB/model/User.model.js"
import taskModel from "../../../../DB/model/task.model.js"
import { asyncHandler } from "../../../utils/errorHandling.js"

// 1-add task with status (toDo)(user must be logged in) //user with token (mangar)
export const addTask = asyncHandler(
    async (req, res,next) => {
        const now = new Date();
        // console.log(now);
        const user = req.user;   //FROM auth middleware 
        const { title, description, deadline,assignTo } = req.body;
        
        const employid=await userModel.findById(assignTo)
        if(!employid){
            return next(new Error("this user You want to assign this task not exisit"))
        }
        if (new Date(deadline) < now) {
            return next(new Error("Enter a valid date"));
          }
        const task =await taskModel.create({ title, description, deadline,assignTo,userId: user.id});
        
       return  res.status(201).json({ message :'Done',task });

    }
)
// 2-update task (title , description , status) and assign task to other user(user must be logged in)
// (creator only can update task)
export const updateTask = asyncHandler(
    async (req, res,next) => {
        const user = req.user;   //FROM auth middleware 
        const {taskId} = req.params
        const { title, description, status } = req.body;
        const task = await taskModel.findById(taskId);
        if (!task) {
        return next(new Error('Task not found'))
        }
        if (task.userId !=user.id) {
            return next(new Error('You are not authorized to update this task'))
        }
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
    
        await task.save();
        return  res.status(200).json({ message :'Done ',task });

    }
)
// 3-delete task(user must be logged in) (creator only can delete task)
export const deleteTask = asyncHandler(
    async (req, res,next) => {
        const user = req.user;   //FROM auth middleware 
        const {taskId} = req.params
        const task =await taskModel.findByIdAndDelete(taskId);
        if (task.userId !=user.id) {
            return next(new Error('You are not authorized to delete this task'))
        }
        if (!task) {
        return next(new Error('Task not found'))
        }
        return  res.status(200).json({ message :'Done'});

    }
)

// 4-get all tasks  with user data 
export const getAllTask = asyncHandler(
    async (req, res,next) => {
        const tasks = await taskModel.find().populate([
        { path: 'userId', select: 'userName email'},
        { path: 'assignTo', select: 'userName email' }
        ])
        return  res.status(201).json({ message :'Done',tasks});
    }
)

// 5-Get tasks of one user with user data  التسكات الي المدير عملها
export const getAllCreatedTask = asyncHandler(
    async (req, res,next) => {
        const user = req.user;
        const tasks = await taskModel.find({ userId: user.id }).populate([
        { path: 'userId', select: 'userName email '},
        { path: 'assignTo', select: 'userName email ' }
        ])
        console.log(user.id);
        return  res.status(200).json({ message :'Done',tasks});


    }
)

//6-get all tasks assigen to me(client)
export const getAllAssigntome = asyncHandler(
    async (req, res,next) => {
        const user = req.user;
        const tasks = await taskModel.find({ assignTo: user.id }).populate([
        { path: 'userId', select: 'userName email '},
        { path: 'assignTo', select: 'userName email ' }
        ])
        console.log(user.id);
        return  res.status(200).json({ message :'Done',tasks});


    }
)

//7- Get all tasks that are not done after deadline(manger)
export const lateTasks = asyncHandler(
    async (req, res,next) => {
        const user = req.user;
        const tasks = await taskModel.find({userId: user.id , status: { $ne: 'done' },deadline: { $lt: new Date() }}).populate([
        { path: 'userId', select: 'userName email '},
        { path: 'assignTo', select: 'userName email ' }
        ])
        return  res.status(200).json({ message :'Done',tasks});


    }
)
//7+  Get all tasks that are not done after deadline(employee)
export const lateTasksEmployee = asyncHandler(
    async (req, res,next) => {
        const user = req.user;
        const tasks = await taskModel.find({assignTo: user.id , status: { $ne: 'done' },deadline: { $lt: new Date() }}).populate([
        { path: 'userId', select: 'userName email '},
        { path: 'assignTo', select: 'userName email ' }
        ])

        if(!tasks){
            return next(new Error('User not found'))
        }
        return  res.status(200).json({ message :'Done',tasks});


    }
)

