import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
    score: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model("test2", highscoreSchema);