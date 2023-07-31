// users collection-->schema( userName , email , password hashed , age , gender , phone)
import { Schema,model } from "mongoose";
const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number },
    phone: String,
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
    isDeleated: { type: Boolean, default: false},
    isLoggedIn: { type: Boolean, default:false},
    confirmEmail: { type: Boolean, default:false},
    isAdmain: { type: Boolean, default:false},
    profilePicture: String ,
},
    
{ timestamps: true })

const userModel = model("User", userSchema)
export default userModel;