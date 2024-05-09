import express from 'express';
import mongoose from "mongoose";
import remindersRouter from './routers/reminders';
import homeRouter from './routers/home';

const app = express();

const db = "mongodb://localhost/simple_reminders"
mongoose.connect(db)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => {
        console.error("Could not connect to MongoDB:", err); // Print the error for better debugging
        process.exit(1);
    });

app.use(express.json());
app.use('/', homeRouter);
app.use('/reminders', remindersRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});

export default server;
