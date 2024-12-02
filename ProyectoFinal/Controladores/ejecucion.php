<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión a la base de datos
include('../Conexión/conectabd.php');

// Asegurarse de que la respuesta sea JSON
header('Content-Type: application/json');

$response = [];

// Obtener la consulta SQL desde el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);
$sql = $data['sql'] ?? '';

if ($sql) {
    // Separar las sentencias en caso de múltiples comandos
    $queries = explode(';', $sql);

    // Ejecutar la primera consulta para seleccionar la base de datos
    $dbSelected = trim($queries[0]);
    if (strpos($dbSelected, 'USE') === 0) {
        try {
            $mysqli->query($dbSelected);
            array_shift($queries); // Remover el comando USE de la lista de consultas
        } catch (mysqli_sql_exception $e) {
            echo json_encode(["error" => "Error en la selección de base de datos: " . $e->getMessage()]);
            exit;
        }
    }

    // Ejecutar las consultas restantes
    foreach ($queries as $query) {
        $query = trim($query);
        if ($query) {
            try {
                $resultado = $mysqli->query($query);
                if ($resultado) {
                    if ($resultado->num_rows > 0) {
                        $rows = [];
                        while ($row = $resultado->fetch_assoc()) {
                            $rows[] = $row;
                        }
                        $response = ["data" => $rows];
                    } else {
                        $response = ["data" => []];
                    }
                } else {
                    $response = ["error" => "Error en la consulta SQL: " . $mysqli->error];
                    break;
                }
            } catch (mysqli_sql_exception $e) {
                $response = ["error" => "Error en la consulta SQL: " . $e->getMessage()];
                break;
            }
        }
    }
} else {
    $response = ["error" => "No se recibió ninguna consulta SQL."];
}

// Enviar la respuesta en formato JSON
echo json_encode($response);
$mysqli->close();
?>
