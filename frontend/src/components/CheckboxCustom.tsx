import "./CheckboxCustom.css";

const CheckboxCustom = ({ text, onDelete}) => {
    const updateTask = async () => {
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
          method: "PATCH"
      });
      const data = await response.json();
      console.log(data);
    }

    const handleCheckboxChange = (box) => {
      updateTask();
      console.log("Checkbox is now:", box.target.checked);
    }
    
  return (
    <div id="checkbox_area">
      <span>{text}</span> {/* display the passed text */}
      <button id="delete_button" onClick={onDelete}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
      </button>
      <input id="custom_checkbox" type="checkbox" onChange={handleCheckboxChange} name="myCheckbox" />
    </div>
  );
};

export default CheckboxCustom;


