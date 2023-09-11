import mongoose from 'mongoose';
const { Schema } = mongoose;

const MiscellaneousComplaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
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
const MiscellaneousComplaint = mongoose.model('miscellaneousComplaint', MiscellaneousComplaintSchema);
export default MiscellaneousComplaint;