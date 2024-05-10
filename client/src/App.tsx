import React, {useEffect, useState} from 'react';
import './App.css';
import ReminderList from "./components/ReminderList";
import Reminder from "./models/reminder";
import reminderService from "./services/reminder";
import NewReminder from "./components/NewReminder";

function App(): JSX.Element {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    useEffect(() => {
        loadReminders();
    }, []);

    const loadReminders = async () => {
        try {
            const reminders = await reminderService.getReminders();
            setReminders(reminders as Reminder[]);
        } catch (error) {
            console.log("Error loading reminders:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    }

    const addReminder = async (title: string) => {
        try {
            const newReminder = await reminderService.addReminder(title);
            setReminders([newReminder as Reminder, ...reminders]);
        } catch (error) {
            console.log("Error adding reminder:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    }

    const removeReminder = async (id: number) => {
        try {
            await reminderService.removeReminder(id);
            setReminders(reminders.filter(reminder => reminder.id !== id));
        } catch (error) {
            console.log("Error removing reminder:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    }

    const removeAllReminders = async () => {
        try {
            await Promise.all(reminders.map(reminder => reminderService.removeReminder(reminder.id)));
            setReminders([]);
        } catch (error) {
            console.log("Error removing reminders:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    }

    return (
        <div className="App">
            <NewReminder onAddReminder={addReminder}/>
            <ReminderList reminders={reminders} onRemoveReminder={removeReminder} />
            <button onClick={removeAllReminders} className="btn btn-danger mx-2 rounded-pill">Delete All</button>
        </div>
    );
}

export default App;
