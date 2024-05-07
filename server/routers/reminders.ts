import { Router } from "express";
import CreateReminderDto from "../dtos/createReminder";
import Reminder from "../models/reminder";
import UpdateReminderDto from "../dtos/updateReminder";

const router = Router();

const reminders: Reminder[] = []; // replace with database

router.get('/', (request, response) => {
    response.status(200).send(reminders);
});

router.get('/:id', (request, response) => {
    const reminder = reminders.find(reminder => reminder.id + '' === request.params.id);
    if (!reminder) {
        response.status(400).send('Invalid ID');
        return;
    }
    response.status(200).send(reminder);
});

router.post('/', (request, response) => {
    const { title } = request.body as CreateReminderDto;
    const reminder = new Reminder(title);
    reminders.push(reminder);
    response.status(201).send(reminder);
});

router.put('/', (request, response) => {
    const newReminder = request.body as UpdateReminderDto;
    if (!newReminder || !(newReminder instanceof Reminder)) {
        response.status(400).send('Invalid Request');
        return;
    }
    const index = reminders.findIndex(reminder => reminder.id === newReminder.id);
    reminders[index] = newReminder;
    response.status(200).send(newReminder);
});

router.delete('/:id', (request, response) => {
    const index = reminders.findIndex(reminder => reminder.id + '' === request.params.id);
    if (!index) {
        response.status(400).send('Invalid ID');
        return;
    }
    const reminder = reminders[index];
    reminders.splice(index, 1);
    response.status(200).send(reminder);
});

export default router;