from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get('/todos')
def get_todos():
    # Placeholder for fetching todos from the database
    todos = [
        {"id": 1, "task": "Sample Task 1", "completed": False},
        {"id": 2, "task": "Sample Task 2", "completed": True}
    ]
    return jsonify(todos)

@app.post('/todos')
def add_todo():
    # Placeholder for adding a new todo to the database
    new_todo = {"id": 3, "task": "New Task", "completed": False}
    return jsonify(new_todo), 201

@app.patch('/todos/<int:todo_id>')
def update_todo(todo_id,state):
    # Placeholder for updating a todo in the database
    updated_todo = {"id": todo_id, "task": "Updated Task", "completed": state}
    return jsonify(updated_todo)

@app.delete('/todos/<int:todo_id>')
def delete_todo(todo_id):
    # Placeholder for deleting a todo from the database
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)