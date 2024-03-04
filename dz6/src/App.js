import React, { useRef, useEffect, useState } from 'react'

const App = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const resizeTimeout = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeTimeout.current)
            resizeTimeout.current = setTimeout(() => {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div>
            <p>Window Width: {windowSize.width}</p>
            <p>Window Height: {windowSize.height}</p>
        </div>
    )
}

export default App
