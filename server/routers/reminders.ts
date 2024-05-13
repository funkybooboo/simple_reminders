import { Router } from "express";
import CreateReminderDto from "../dtos/createReminder";
import UpdateReminderDto from "../dtos/updateReminder";
import { Reminder, validator } from "../models/reminder";
import mongoose from "mongoose";

const router = Router();

router.get('/', async (request, response) => {
    console.log('GET');
    try {
        const reminders = await Reminder.find().sort({_id: 1});
        response.status(200).json(reminders);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (request, response) => {
    console.log('GET');
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
    console.log('POST');
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
    try {
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: 'Invalid reminder ID' });
        }
        const { error } = validator(request.body as UpdateReminderDto);
        if (error) {
            return response.status(400).json({ error: error.details[0].message });
        }
        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return response.status(404).json({ error: 'Reminder not found' });
        }

        reminder.title = request.body.title;
        const updatedReminder = await reminder.save();

        return response.status(200).json(updatedReminder);
    } catch (error) {
        console.error('Error updating reminder:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (request, response) => {
    console.log('DELETE');
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
