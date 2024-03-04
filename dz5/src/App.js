import React, { useState } from 'react'

const App = () => {
    const [items, setItems] = useState([])

    const addItem = () => {
        setItems([...items, { id: items.length, value: Math.random() }])
    }

    const removeItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems)
    }

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id} onClick={() => removeItem(item.id)}>
                        {item.value}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
