import {useState} from "react"

const App = () => {
  const [form, setFrom] = useState({
      name: '',
      email: '',
      password: '',
      date: ''
  })
    const handleSubmit = (e) => {
      e.preventDefault()
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-around"}}>
            <form onSubmit={handleSubmit}>
                <h2>Log in</h2>
                <span>Name:</span>
                <input type="text" placeholder='Name...' onChange={(e) => setFrom({...form, name: e.target.value})}/>
                <span>Email:</span>
                <input type="email" placeholder='Email...' onChange={(e) => setFrom({...form, email: e.target.value})}/>
                <span>Password:</span>
                <input type="password" placeholder='Password...'
                       onChange={(e) => setFrom({...form, password: e.target.value})}/>
                <span>Date:</span>
                <input type="text" placeholder='Number...'
                       onChange={(e) => setFrom({...form, date: e.target.value})}/>
            </form>
            <form onSubmit={handleSubmit}>
                <h2>Answer</h2>
                <span>Name:</span>
                <p title='name'>{form.name}</p>
                <span>Email:</span>
                <p title='Email'>{form.email}</p>
                <span>Password:</span>
                <p title='Password'>{form.password}</p>
                <span>Date:</span>
                <p title='Date'>{form.date}</p>
            </form>
        </div>
    )
}

export default App