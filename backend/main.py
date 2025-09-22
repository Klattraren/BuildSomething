from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

conn = None
try:
    conn = psycopg2.connect(
        host="postgres",  # changed from localhost to postgres (service/container name)
        database="default",
        user="postgres",
        password="postgres",
        port=5432
    )
    print("Connected to Postgres!")
except Exception as e:
    print("Connection failed:", e)

@app.post('/todos')
def add_todo():
    if conn is None:
        return jsonify({"error": "Database connection not available"}), 500
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
    if conn is None:
        return jsonify({"error": "Database connection not available"}), 500
    with conn.cursor() as cur:
        cur.execute("SELECT id, task, completed FROM todos;")
        rows = cur.fetchall()
    
    response = [{"id": row[0], "task": row[1], "completed": row[2]} for row in rows]
    return jsonify(response),200


@app.patch('/todos/<int:todo_id>')
def update_todo(todo_id:int):
    if conn is None:
        return jsonify({"error": "Database connection not available"}), 500
    body =  request.get_json()
    print("BODY: ",body.get("completed"))
    state = body.get("completed")
    with conn.cursor() as cur:
        cur.execute(f"UPDATE todos SET completed={state} WHERE id={todo_id};")
        conn.commit()
    return jsonify({"success":True}),200

@app.delete('/todos/<int:todo_id>')
def delete_todo(todo_id):
    if conn is None:
        return jsonify({"error": "Database connection not available"}), 500
    print(f"Deleting todo with ID: {todo_id}")
    with conn.cursor() as cur:
        cur.execute("DELETE FROM todos WHERE id = %s", (todo_id,))
        conn.commit()
    return '', 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)