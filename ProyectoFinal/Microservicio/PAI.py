import requests
import json

BASE_URL = "http://127.0.0.1:5000/analyze_sql"

def send_sql_query(sql):
    headers = {"Content-Type": "application/json"}
    data = json.dumps({"sql": sql})
    response = requests.post(BASE_URL, headers=headers, data=data)
    return response.json()

# Lista de consultas SQL incorrectas
incorrect_queries = [
    "CREAT DATABASE nueva_base_datos;",  # Error tipográfico en CREATE
    "USE;",  # Falta el nombre de la base de datos
    "CREATE TABLE usuarios (id INT AUTO_INCREMENT PRIMARY KEY nombre VARCHAR(100) edad INT);",  # Falta una coma
    "INSERT INTO usuarios id, nombre VALUES (1, 'nombre1');",  # Falta paréntesis alrededor de las columnas
    "SELECT id nombre FROM usuarios WHERE id = 1;",  # Falta la coma entre columnas
    "UPDAT usuarios SET nombre = 'nombre2' WHERE id = 1;",  # Error tipográfico en UPDATE
    "DELETE FROM usuarios WHERE id;",  # Falta la comparación en WHERE
    "ALTER TABLE usuarios ADD email VARCHAR(255;",  # Falta un paréntesis de cierre
    "TRUNCATE usuarios;",  # Falta la palabra clave TABLE
    "SHWO TABLES;",  # Error tipográfico en SHOW
    "DESCRIB usuarios;",  # Error tipográfico en DESCRIBE
    "CREATE DATA nueva_base_datos;",  # Error tipográfico en DATABASE
    "DROP DATABASE;",  # Falta el nombre de la base de datos
]

for query in incorrect_queries:
    response = send_sql_query(query)
    print(f"Query: {query}\nResponse: {response}\n")
