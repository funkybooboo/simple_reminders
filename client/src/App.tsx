import React, {useEffect, useState} from 'react';
//import logo from './logo.svg';
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
        const reminders = await reminderService.getReminders();
        setReminders(reminders);
    }

    const removeReminder = (id: number) => {
        setReminders(reminders.filter(reminder => reminder.id !== id));
    }

    const removeAllReminders = () => {
        setReminders([]);
    }

    const addReminder = async (title: string) => {
        const newReminder = await reminderService.addReminder(title);
        setReminders([newReminder, ...reminders]);
    }

    return (
        <div className="App">
            <NewReminder onAddReminder={addReminder}/>
            <ReminderList reminders={reminders} onRemoveReminder={removeReminder} />
            <button onClick={() => removeAllReminders()} className="btn btn-danger mx-2 rounded-pill">Delete All</button>
        </div>
    );
}

export default App;
