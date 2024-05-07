import React from 'react';
import Reminder from "../models/reminder";

interface ReminderListProps {
    reminders: Reminder[];
    onRemoveReminder: (id: number) => void;
}

function ReminderList({reminders, onRemoveReminder}: ReminderListProps): JSX.Element {
    return (
        <ul className='list-group'>
            {
                reminders.map(reminder =>
                    <li className='list-group-item' key={reminder.id}>
                        {reminder.title}
                        <button onClick={() => onRemoveReminder(reminder.id)} className="btn btn-outline-danger mx-2 rounded-pill">Delete</button>
                    </li>)
            }
        </ul>
    );
}

export default ReminderList;