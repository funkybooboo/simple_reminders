import React from 'react';
import Reminder from "../models/reminder";

interface ReminderListProps {
    reminders: Reminder[];
    onRemoveReminder: (_id: string) => void;
}

function ReminderList({reminders, onRemoveReminder}: ReminderListProps) {
    return (
        <ul className='list-group'>
            {
                reminders.map(reminder =>
                    <li key={reminder._id} className='list-group-item'>
                        {reminder.title}
                        <button className="btn btn-outline-success mx-2 rounded-pill"></button>
                        <button onClick={() => { onRemoveReminder(reminder._id); }}
                                className="btn btn-outline-danger mx-2 rounded-pill">Delete</button>
                    </li>)
            }
        </ul>
    );
}

export default ReminderList;