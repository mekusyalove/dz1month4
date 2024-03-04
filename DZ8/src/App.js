import React, { useState, useCallback } from 'react'

const ParentComponent = () => {
    const [count, setCount] = useState(0)
    const increment = useCallback(() => {
        setCount(prevCount => prevCount + 1)
    }, [])

    return (
        <div>
            <h1>Count: {count}</h1>
            <ChildComponent increment={increment} />
        </div>
    )
}

const ChildComponent = ({ increment }) => {
    return (
        <div>
            <button onClick={increment}>Increment count</button>
        </div>
    )
}

export default ParentComponent
