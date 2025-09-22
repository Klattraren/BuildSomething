from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    host="localhost",     
    database="default",
    user="postgres",
    password="postgres",
    port=5432
)

# @app.get('/todos')
# def get_todos():
#     # Placeholder for fetching todos from the database
#     todos = [
#         {"id": 1, "task": "Sample Task 1", "completed": False},
#         {"id": 2, "task": "Sample Task 2", "completed": True}
#     ]
#     response = "fetched tasks from database: " + str(todos)
#     return jsonify(response)

@app.post('/todos')
def add_todo():
    todo_data = request.get_json()
    response = "added task to database: " + str(todo_data)
    # cur = conn.cursor()
    # cur.execute("INSERT INTO todos (task, completed) VALUES (%s, %s)", (todo_data['task'], todo_data['completed']))
    # conn.commit()
    # cur.close()
    return jsonify(response)

# @app.patch('/todos/<int:todo_id>')
# def update_todo(todo_id,state):
#     # Placeholder for updating a todo in the database
#     updated_todo = {"id": todo_id, "task": "Updated Task", "completed": state}
#     return jsonify(updated_todo)

# @app.delete('/todos/<int:todo_id>')
# def delete_todo(todo_id):
#     # Placeholder for deleting a todo from the database
#     return '', 204

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)