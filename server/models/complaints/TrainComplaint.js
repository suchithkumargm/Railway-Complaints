import mongoose from 'mongoose';
const { Schema } = mongoose;

const TrainComplaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    trainNumber: {
        type: String,
        required: true
    },
    pnrNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subtype: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    description:{
        type:String,
        required:true
    }
});
const TrainComplaint = mongoose.model('trainComplaint', TrainComplaintSchema);
export default TrainComplaint;