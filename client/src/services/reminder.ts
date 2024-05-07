import axios from 'axios'; // axois comes with definition files for ts
import Reminder from "../models/reminder";

class ReminderService {
    http = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/"
    });

    async getReminders() {
        const response = await this.http.get<Reminder[]>('/todos');
        return response.data;
    }

    async addReminder(title: string) {
        const response = await this.http.post<Reminder>('/todos', {title});
        return response.data;
    }

    async removeReminder(id: number) {
        const response = await this.http.delete<Reminder>('/todos' + id);
        return response.data;
    }
}

export default new ReminderService();