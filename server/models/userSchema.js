import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion:{
        type: String,
        required: true
    },
    securityQuestionNumber:{
        type: Number,
        required: true
    }
});

export default mongoose.model("User", userSchema);