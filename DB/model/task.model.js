// tasks collection-->schema(title , description , status{toDo , doing , done} , userId , assignTo , deadline)
import mongoose, { Schema,model } from "mongoose";
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    status: {
        type: String,
        default: "toDo",
        enum: ['toDo', 'doing','done'],
        default:'toDo',

    },

    userId: { 
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    assignTo:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    deadline:{
       type:Date,
       required: true,
    },
    isDeleated: { type: Boolean, default: false},
},
{ timestamps: true })

const taskModel = model("Task", taskSchema)
export default taskModel;
