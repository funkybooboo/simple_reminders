import axios from 'axios'; // axois comes with ts definition files
import Reminder from "../models/reminder";

class ReminderService {
    http = axios.create({
        baseURL: "http://localhost:8000"
    });

    async getReminders() {
        const response = await this.http.get<Reminder[]>('/reminders');
        return response.data;
    }

    async addReminder(title: string) {
        const response = await this.http.post<Reminder>('/reminders', {title});
        return response.data;
    }

    async removeReminder(id: number) {
        const response = await this.http.delete<Reminder>('/reminders' + id);
        return response.data;
    }

    async editReminder(reminder: Reminder) {
        const response = await this.http.put<Reminder>('/reminders', reminder);
        return response.data;
    }
}

export default new ReminderService();