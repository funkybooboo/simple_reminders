import axios, { AxiosResponse } from 'axios';
import Reminder from "../models/reminder";
import ReminderDto from "../models/ReminderDto";

class ReminderService {
    http = axios.create({
        baseURL: "http://localhost:8000/"
    });

    async getReminders(): Promise<Reminder[]> {
        try {
            const response: AxiosResponse<Reminder[]> = await this.http.get<Reminder[]>('reminders');
            return response.data;
        } catch (error) {
            console.error("Error fetching reminders:", error);
            throw error;
        }
    }

    async addReminder(title: string): Promise<Reminder> {
        try {
            const response: AxiosResponse<Reminder> = await this.http.post<Reminder>('reminders', { title });
            return response.data;
        } catch (error) {
            console.error("Error adding reminder:", error);
            throw error;
        }
    }

    async removeReminder(_id: string): Promise<void> {
        try {
            await this.http.delete<void>('reminders/' + _id);
        } catch (error) {
            console.error("Error removing reminder:", error);
            throw error;
        }
    }

    async editReminder(reminder: Reminder): Promise<Reminder> {
        try {
            const reminderDto: ReminderDto = {title: reminder.title};
            const response: AxiosResponse<Reminder> = await this.http.put<Reminder>('reminders/' + reminder._id, reminderDto);
            return response.data;
        } catch (error) {
            console.error("Error editing reminder:", error);
            throw error;
        }
    }
}

const reminderServiceInstance = new ReminderService();
export default reminderServiceInstance;
