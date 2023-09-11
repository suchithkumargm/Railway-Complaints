import mongoose from 'mongoose';
const { Schema } = mongoose;

const ParcelComplaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    parcelNumber: {
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
const ParcelComplaint = mongoose.model('parcelComplaint', ParcelComplaintSchema);
export default ParcelComplaint;