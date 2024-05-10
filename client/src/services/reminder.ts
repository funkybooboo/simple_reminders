import axios, { AxiosResponse, AxiosError } from 'axios';
import Reminder from "../models/reminder";

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

    async removeReminder(id: number): Promise<void> {
        try {
            await this.http.delete<void>('reminders/' + id);
        } catch (error) {
            console.error("Error removing reminder:", error);
            throw error;
        }
    }

    async editReminder(reminder: Reminder): Promise<Reminder> {
        try {
            const response: AxiosResponse<Reminder> = await this.http.put<Reminder>('reminders/' + reminder.id, reminder);
            return response.data;
        } catch (error) {
            console.error("Error editing reminder:", error);
            throw error;
        }
    }
}

export default new ReminderService();
