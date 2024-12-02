import requests
import json

BASE_URL = "http://127.0.0.1:5000/analyze_sql"

def send_sql_query(sql):
    headers = {"Content-Type": "application/json"}
    data = json.dumps({"sql": sql})
    response = requests.post(BASE_URL, headers=headers, data=data)
    return response.json()

queries = [
    "CREATE DATABASE nueva_base_datos;",
    "USE mi_base_datos;",
    "CREATE TABLE usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100), edad INT);",
    "INSERT INTO usuarios (id, nombre) VALUES (1, 'nombre1');",
    "SELECT id, nombre FROM usuarios WHERE id = 1;",
    "UPDATE usuarios SET nombre = 'nombre2' WHERE id = 1;",
    "DELETE FROM usuarios WHERE id = 1;",
    "ALTER TABLE usuarios ADD COLUMN email VARCHAR(255);",
    "TRUNCATE TABLE usuarios;",
    "SHOW TABLES;",
    "DESCRIBE usuarios;",
    "DROP TABLE usuarios;",
    "DROP DATABASE nueva_base_datos;"
]

for query in queries:
    response = send_sql_query(query)
    print(f"Query: {query}\nResponse: {response}\n")
