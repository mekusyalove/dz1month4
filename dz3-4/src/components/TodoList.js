
import React, { useState } from 'react';

const TodoList = (props) => {
    const [value, setValue] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.putTodo(value);
            setValue("");
        }}>
            <input type="text" placeholder='print...' value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TodoList