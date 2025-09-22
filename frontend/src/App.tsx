import { useState, useEffect } from 'react'
import './App.scss'
import CheckboxCustom from './components/CheckboxCustom'
import "./components/AddTask.scss"

type TaskType = {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [checkboxes, setCheckboxes] = useState<TaskType[]>([]);
  const [taskText, setTaskText] = useState("");

   const postTask = async (newTask:string) => {
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
    setCheckboxes([...checkboxes, { id: data.id, task: taskText, completed: false}]);
    setTaskText(""); // clear input after adding
    console.log(`Added task: ${taskText}, with id: ${data.id}`);
  };


  const deleteCheckbox = async (todoId:number) => {
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
    const data:TaskType[] = await response.json();
    console.log("Fetched tasks on load:", data);
    setCheckboxes(data);
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
          placeholder="Input task" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
        />
        <button onClick={addCheckbox} id="add_task_button">Add task +</button>
      </div>


     
      <div>
        <hr style={{ width: "80vw" }} />
        <ul id="task_list">
        {checkboxes.map((checkbox) => (
          <CheckboxCustom 
            key={checkbox.id} 
            text={checkbox.task}
            taskId={checkbox.id} 
            completed={checkbox.completed}
            onDelete={() => deleteCheckbox(checkbox.id)} // pass delete function
          />
        ))}
        </ul>
      </div>
    </div>
  )
}

export default App
