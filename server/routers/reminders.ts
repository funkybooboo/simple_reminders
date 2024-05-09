import { Router } from "express";
import CreateReminderDto from "../dtos/createReminder";
import UpdateReminderDto from "../dtos/updateReminder";
import { Reminder, validator } from "../models/reminder";

const router = Router();

router.get('/', async (request, response) => {
    try {
        const reminders = await Reminder.find().sort({_id: 1});
        response.status(200).json(reminders);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (request, response) => {
    try {
        const reminder = await Reminder.findById(request.params.id);
        if (!reminder) {
            response.status(404).send('Reminder not found');
            return;
        }
        response.status(200).json(reminder);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

router.post('/', async (request, response) => {
    const { error } = validator(request.body as CreateReminderDto);
    if (error) {
        response.status(400).send(error.details[0].message);
        return;
    }
    try {
        const reminder = new Reminder(request.body);
        await reminder.save();
        response.status(201).json(reminder);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (request, response) => {
    const { error } = validator(request.body as UpdateReminderDto);
    if (error) {
        response.status(400).send(error.details[0].message);
        return;
    }
    try {
        const reminder = await Reminder.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!reminder) {
            response.status(404).send('Reminder not found');
            return;
        }
        response.status(200).json(reminder);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const reminder = await Reminder.findByIdAndDelete(request.params.id);
        if (!reminder) {
            response.status(404).send('Reminder not found');
            return;
        }
        response.status(200).json(reminder);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

export default router;
