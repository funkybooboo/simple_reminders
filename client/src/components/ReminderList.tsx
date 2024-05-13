import React, { useState } from 'react';
import Reminder from "../models/reminder";

interface Props {
    reminders: Reminder[];
    onRemoveReminder: (_id: string) => void;
    onEditReminder: (editedReminder: Reminder) => void;
}

function ReminderList({ reminders, onRemoveReminder, onEditReminder }: Props) {
    const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');

    const handleEditClick = (reminder: Reminder) => {
        setEditingReminderId(reminder._id);
        setEditedTitle(reminder.title);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    };

    const handleSubmit = () => {
        if (editingReminderId) {
            const editedReminder: Reminder = {
                _id: editingReminderId,
                title: editedTitle,
            };
            onEditReminder(editedReminder);
            setEditingReminderId(null);
            setEditedTitle('');
        }
    };

    return (
        <ul className='list-group'>
            {reminders.map(reminder =>
                <li key={reminder._id} className='list-group-item'>
                    {editingReminderId === reminder._id ? (
                        <div>
                            <input type="text" value={editedTitle} onChange={handleTitleChange} />
                            <button onClick={handleSubmit} className="btn btn-primary mx-2 rounded-pill">
                                Submit
                            </button>
                        </div>
                    ) : (
                        <div>
                            {reminder.title}
                            <button onClick={() => handleEditClick(reminder)} className="btn btn-outline-success mx-2 rounded-pill">
                                Edit
                            </button>
                            <button onClick={() => onRemoveReminder(reminder._id)} className="btn btn-outline-danger mx-2 rounded-pill">
                                Delete
                            </button>
                        </div>
                    )}
                </li>
            )}
        </ul>
    );
}

export default ReminderList;
