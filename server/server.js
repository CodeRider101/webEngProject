import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import leaderboardRouter from './routes/leaderboardRoutes.js';

const app = express();
const port = 8000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/game", gameRouter);
app.use("/api/leaderboard", leaderboardRouter);



mongoose.connect('mongodb+srv://jere_YT:rIG0jourr6rrUlng@vtordle-data.n0naebt.mongodb.net/'
)
.then(() => {
  app.listen(port);
  console.log('Server is running on port ' + port);
  console.log('Connected to the database!')
}).catch(() => {
    console.log('Connection failed!')
});
