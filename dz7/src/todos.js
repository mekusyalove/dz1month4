import React from "react";

let nextId = 0

export function createTodos(text, completed = false) {
    return {
        id: nextId++,
        text,
        completed
    }

}

export const initialTodos = [
    
]