import React, { useState, useEffect, useRef } from "react"
import { initialTodos, createTodos } from "./todos"
import "./App.css"

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos || [])
    const [showActive, setShowActive] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showOptionsForTodo, setShowOptionsForTodo] = useState(null)
    const [editText, setEditText] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const optionsContainerRef = useRef(null)
    const modalRef = useRef(null)

    function checkActiveBox(todoId) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    function handleOptionsClick(todoId) {
        const updatedTodos = todos.map(todo =>
            todo.id === todoId
                ? { ...todo, showOptions: !todo.showOptions }
                : { ...todo, showOptions: false }
        )
        setTodos(updatedTodos)
        setShowOptionsForTodo(todoId)
    }

    useEffect(() => {
        function handleDocumentClick(e) {
            if (showOptionsForTodo !== null) {
                const optionsContainer = document.querySelector(".options-container")

                if (
                    optionsContainer &&
                    !optionsContainer.contains(e.target) &&
                    e.target.className !== "options-dots"
                ) {
                    setShowOptionsForTodo(null)
                }
            }
        }

        document.addEventListener("click", handleDocumentClick)

        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [showOptionsForTodo])

    function handleDeleteClick(todoId) {
        setSelectedTodo(todoId)
        setIsModalOpen(true)
    }

    function handleEditClick(todoId) {
        const todoToEdit = todos.find(todo => todo.id === todoId)
        setEditText(todoToEdit.text)
        setShowOptionsForTodo(null)
        setSelectedTodo(todoId)
        setIsEditing(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setSelectedTodo(null)
        setEditText("")
        setIsEditing(false)
    }

    function confirmDelete() {
        const updatedTodos = todos.filter(todo => todo.id !== selectedTodo)
        setTodos(updatedTodos)
        closeModal()
    }

    function handleEditConfirm() {
        const updatedTodos = todos.map(todo =>
            todo.id === selectedTodo ? { ...todo, text: editText, showOptions: false } : todo
        )
        setTodos(updatedTodos)
        closeModal()
    }

    return (
        <div style={containerStyle}>
            <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
            <ul style={listStyle}>
                {todos.map(todo => (
                    <li key={todo.id} style={listItemStyle}>
                        <div style={taskContainerStyle}>
                            {todo.completed ? <s>{todo.text}</s> : todo.text}
                            <div className="options-container" ref={optionsContainerRef}>
                                <span className="options-dots" onClick={() => handleOptionsClick(todo.id)}>
                                    &#9776;
                                </span>
                                {showOptionsForTodo === todo.id && (
                                    <div className="options-dropdown" style={optionsDropdownStyle}>
                                        <button onClick={() => handleEditClick(todo.id)}>Редактировать</button>
                                        <button onClick={() => handleDeleteClick(todo.id)}>Удалить</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
                        <span className="modal-close" onClick={closeModal}>
                            &#9746;
                        </span>
                        <p>Подтвердить удаление</p>
                        <button className='confurmBtnDel' onClick={confirmDelete}>Подтвердить</button>
                        <button className='closeBtnDel' onClick={closeModal}>Отмена</button>
                    </div>
                </div>
            )}
            {isEditing && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
                        <span className="modal-close" onClick={closeModal}>
                            &#9746;
                        </span>
                        <p>Редактировать задачу</p>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={inputStyle}
                            placeholder="&#9998;..."
                        />
                        <button className='confirmBtnRed' onClick={handleEditConfirm}>Подтвердить</button>
                        <button className='closeBtnRed' onClick={closeModal}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const NewTodo = ({ onAdd }) => {
    const [text, setText] = useState("")
    const [error, setError] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleAddClick = () => {
        if (text.trim() === "") {
            setError("Напишите что-нибудь....")
            return
        }
        setError(null)
        setText("")
        onAdd(createTodos(text))
    }

    const clickEnterAdd = (e) => {
        if (e.key === "Enter") {
            handleAddClick()
        }
    }

    return (
        <div style={newTodoStyle}>
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={clickEnterAdd}
                style={inputStyle}
                placeholder={error || "Добавить задачу"}
            />
            <button onClick={handleAddClick} style={buttonStyle}>
                Добавить
            </button>
        </div>
    )
}



const containerStyle = {
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
}

const newTodoStyle = {
    marginBottom: "10px",
}

const inputStyle = {
    marginRight: "5px",
    padding: "10px",
    fontSize: "14px",
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "5px",
}

const buttonStyle = {
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#0088cc",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
}

const listStyle = {
    listStyleType: "none",
    padding: "0",
}

const listItemStyle = {
    marginBottom: "5px",
}

const taskContainerStyle = {
    display: "flex",
    alignItems: "center",
}

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    position: "relative",
}

const optionsDropdownStyle = {
    position: "absolute",
    top: "20px",
    right: "0",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "5px",
    zIndex: "1",
}
