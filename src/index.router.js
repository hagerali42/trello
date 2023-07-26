import connectDB from "../DB/DBconection.js"
import userRouter from './modules/User/user.router.js'
import authRouter from './modules/auth/auth.router.js'
import taskRouter from './modules/Taskes/task.router.js'
import { globalErrorHandler } from "./utils/errorHandling.js"
const bootstrap =(app,express)=>{
    app.use(express.json())



    app.use('/auth', authRouter)
    app.use('/task', taskRouter)
    app.use('/user', userRouter)
    app.use("*", (req, res, next) => {
        return res.json({ message: "In-valid Routing" })
    })
    app.use(globalErrorHandler)

    connectDB()
}
export default bootstrap