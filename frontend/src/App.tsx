import { useState } from 'react'
import './App.css'
import CheckboxCustom from './components/CheckboxCustom'
import "./components/AddTask.css"

function App() {
  const [count, setCount] = useState(0)
  const [checkboxes, setCheckboxes] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addCheckbox = () => {
    if (taskText.trim() === "") return; // prevent empty tasks
    setCheckboxes([...checkboxes, { id: checkboxes.length, text: taskText }]);
    setTaskText(""); // clear input after adding
  };

  return (
    <div>
      <div id="title">
        <h1>To-Do List</h1>
      </div>

      <div id="header_area">
        <input 
          placeholder="input item" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
        />
        <button onClick={addCheckbox} id="add_task_button">Add task +</button>
      </div>


     <div>
        <hr style={{ width: "80vw" }} />
        {checkboxes.map((checkbox) => (
          <CheckboxCustom key={checkbox.id} text={checkbox.text} />
        ))}
      </div>
    </div>
  )
}

export default App
