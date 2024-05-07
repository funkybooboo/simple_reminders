import React, {useState} from 'react';

interface NewReminderProps {
    onAddReminder: (title: string) => void;
}

function NewReminder({onAddReminder}: NewReminderProps): JSX.Element {

    const [title, setTitle] = useState<string>('');

    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        if (!title) return;
        onAddReminder(title);
        setTitle('');
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title"></label>
            <input value={title} onChange={event => setTitle(event.target.value)} id="title" type="text" className="form-control"/>
            <button type="submit" className="btn btn-primary my-3 rounded-pill">Add Reminder</button>
        </form>
    );
}

export default NewReminder;