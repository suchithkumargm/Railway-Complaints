import mongoose from 'mongoose';
const { Schema } = mongoose;

const StationComplaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    stationName: {
        type: String,
        required: true
    },
    platformNumber: {
        type: Number,
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
const StationComplaint = mongoose.model('stationComplaint', StationComplaintSchema);
export default StationComplaint;