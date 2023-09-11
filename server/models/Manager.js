import mongoose from 'mongoose';
const { Schema } = mongoose;

const ManagerSchema = new Schema({
    employeeId: {
       type: String,
       required: true 
    },
    password: {
       type: String,
       required: true 
    }
  });
const Manager = mongoose.model('manager', ManagerSchema);
export default Manager;