import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
    userID: {
        type: uuID,
        required: true
    },
    score: {
        type: Int16Array,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model("test2", highscoreSchema);