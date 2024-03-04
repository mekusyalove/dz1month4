import React, { useState } from 'react'

const Object = () => {
    const [user, setUser] = useState({ name: '', age: 0 })

    const handleNameChange = (event) => {
        setUser({ ...user, name: event.target.value })
    }

    const handleAgeChange = (event) => {
        setUser({ ...user, age: parseInt(event.target.value) })
    }

    return (
        <div>
            <input type="text" placeholder="Enter name" value={user.name} onChange={handleNameChange} />
            <input type="number" placeholder="Enter age" value={user.age} onChange={handleAgeChange} />
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
        </div>
    )
}

export default Object
