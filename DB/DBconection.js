import mongoose from "mongoose";
const connectDB=async()=>{
    // connect
    return await mongoose.connect(`${process.env.DB_URL}`)
    .then(result=>{
        console.log('Database connected successfully');
    }).catch(err=>{
        console.log('Error connecting to database ' + err.message);
    })
}
export default connectDB