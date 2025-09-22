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
    print("onnected to Postgres!")
except Exception as e:
    print("Connection failed:", e)

@app.post('/todos')
def add_todo():
    todo_data = request.get_json()
    with conn.cursor() as cur:
        print("Received todo data:", todo_data)
        cur.execute("INSERT INTO todos (task, completed) VALUES (%s, %s) RETURNING id;", (todo_data, False))
        new_id = cur.fetchone()[0]
        conn.commit()
    print("Inserted new todo with ID:", new_id)
    return jsonify({"id": new_id}), 200

@app.get('/todos')
def get_tasks():
    # Placeholder for fetching todos from the database
    with conn.cursor() as cur:
        cur.execute("SELECT id, task, completed FROM todos;")
        rows = cur.fetchall()
    
    response = [{"id": row[0], "task": row[1], "completed": row[2]} for row in rows]
    return jsonify(response),200


@app.patch('/todos/<int:todo_id>')
def update_todo(todo_id:int):
    body =  request.get_json()
    print("BODY: ",body.get("completed"))
    state = body.get("completed")
    with conn.cursor() as cur:
        cur.execute(f"UPDATE todos SET completed={state} WHERE id={todo_id};")
        conn.commit()
    return jsonify({"success":True}),200

@app.delete('/todos/<int:todo_id>')
def delete_todo(todo_id):
    # Placeholder for deleting a todo from the database
    print(f"Deleting todo with ID: {todo_id}")
    with conn.cursor() as cur:
        cur.execute("DELETE FROM todos WHERE id = %s", (todo_id,))
        conn.commit()
    return '', 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)