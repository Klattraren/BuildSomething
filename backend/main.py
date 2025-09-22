from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

try:
    conn = psycopg2.connect(
        host="localhost",     # or "postgres" if Flask is in Docker
        database="default",
        user="postgres",
        password="postgres",
        port=5432
    )
    print("✅ Connected to Postgres!")
except Exception as e:
    print("❌ Connection failed:", e)

@app.post('/todos')
def add_todo():
    todo_data = request.get_json()
    cur = conn.cursor()
    print("Received todo data:", todo_data)
    cur.execute("INSERT INTO todos (task, completed) VALUES (%s, %s) RETURNING id;", (todo_data, False))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    print("Inserted new todo with ID:", new_id)
    return jsonify({"id": new_id}), 201

@app.get('/todos')
def get_tasks():
    # Placeholder for fetching todos from the database
    cur = conn.cursor()
    cur.execute("SELECT id, task, completed FROM todos;")
    rows = cur.fetchall()
    cur.close()
    response = [{"id": row[0], "task": row[1], "completed": row[2]} for row in rows]
    return jsonify(response)


# @app.patch('/todos/<int:todo_id>')
# def update_todo(todo_id,state):
#     # Placeholder for updating a todo in the database
#     updated_todo = {"id": todo_id, "task": "Updated Task", "completed": state}
#     return jsonify(updated_todo)

@app.delete('/todos/<int:todo_id>')
def delete_todo(todo_id):
    # Placeholder for deleting a todo from the database
    print(f"Deleting todo with ID: {todo_id}")
    cur = conn.cursor()
    cur.execute("DELETE FROM todos WHERE id = %s", (todo_id,))
    conn.commit()
    cur.close()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)