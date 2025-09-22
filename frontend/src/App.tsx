import { useState } from 'react'
import './App.css'
import CheckboxCustom from './components/CheckboxCustom'
import "./components/AddTask.css"

function App() {
  const [count, setCount] = useState(0)
  const [checkboxes, setCheckboxes] = useState([]);
  const [taskText, setTaskText] = useState("");

   const postTask = async (newTask) => {
    const response = await fetch(`http://localhost:5000/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });
    const data = await response.json();
    console.log(data);
  }

  const addCheckbox = () => {
    if (taskText.trim() === "") return; // prevent empty tasks
    setCheckboxes([...checkboxes, { id: checkboxes.length, text: taskText, created: true}]);
    setTaskText(""); // clear input after adding
    console.log("Added task:", taskText);
    postTask(taskText);
  };

  const deleteCheckbox = (id) => {
    setCheckboxes(checkboxes.filter((checkbox) => checkbox.id !== id));
    console.log("Deleted checkbox with id:", id);
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
          <CheckboxCustom 
            key={checkbox.id} 
            text={checkbox.text} 
            onDelete={() => deleteCheckbox(checkbox.id)} // pass delete function
          />
        ))}
      </div>
    </div>
  )
}

export default App
