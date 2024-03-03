import React, {useState} from 'react';
import TodoInput from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([])
  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, {id: Date.now(), text: value, done: false}])
    }else  {
      alert('Please print something')
    }
  }
  return (
      <div className="wrapper">
        <h1>Create Todo</h1>
        <TodoInput
            putTodo={putTodo}
        />
        <ul className="todos">
          {
            todos.map(el => {
              return(
                  <li key={el.id} >
                    {el.text}
                  </li>
              )
            })
          }
        </ul>
      </div>
  )
}

export default App