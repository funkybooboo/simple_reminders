import Joi from "joi";
import mongoose from "mongoose";
import CreateReminderDto from "../dtos/createReminder";
import UpdateReminderDto from "../dtos/updateReminder";

// Create the Genre model using the schema
const Reminder = mongoose.model("Reminder", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
}));

// Validate the genre data using Joi
function validator(reminder: CreateReminderDto | UpdateReminderDto) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required()
    });
    return schema.validate(reminder);
}

// Export the model, and validate function
export { Reminder, validator };
