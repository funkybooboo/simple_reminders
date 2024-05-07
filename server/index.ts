import express from 'express';
import remindersRouter from './routers/reminders';
import homeRouter from './routers/home';

const app = express();

app.use(express.json());
app.use('/', homeRouter);
app.use('/reminders', remindersRouter);


app.listen(8000, () => {
    console.log("Server started...");
});