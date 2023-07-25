import { Schema,Types,model } from "mongoose";

const verificationCodeSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  code: {
    type: String,
    required: true
  },
  expireAt: { 
    type: Date,
    required: true
  }
});
const VerificationCode = model("VerificationCode", verificationCodeSchema)
export default VerificationCode;
