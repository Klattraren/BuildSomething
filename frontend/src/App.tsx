import { useState, useEffect } from 'react'
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
    return data;
  }



  const addCheckbox = async () => {
    if (taskText.trim() === "") return; // prevent empty tasks
    const data = await postTask(taskText);
    setCheckboxes([...checkboxes, { id: data.id, text: taskText, created: true}]);
    setTaskText(""); // clear input after adding
    console.log(`Added task: ${taskText}, with id: ${data.id}`);
  };




  const deleteCheckbox = async (todoId) => {
    setCheckboxes(checkboxes.filter((checkbox) => checkbox.id !== todoId));
    console.log("Deleted checkbox with id:", todoId);

    try {
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const getAllTasksOnLoad = async () => {
    const response = await fetch(`http://localhost:5000/todos`);
    const data = await response.json();
    console.log("Fetched tasks on load:", data);
    // set all at once, not in a loop
    setCheckboxes(data.map(item => ({
      id: item.id,
      text: item.task,
      created: true
    })));
  };

  useEffect(() => {
    getAllTasksOnLoad();
  }, []);




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
