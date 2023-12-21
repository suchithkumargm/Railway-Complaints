import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
       type: String,
       required: true 
    },
    email: {
       type: String,
       required: true,
       unique: true 
    },
    password: {
       type: String,
       required: true 
    },
    mobile:{
        type: String,
        required: true 
    }
  });
const User = mongoose.model('user', UserSchema);
export default User;