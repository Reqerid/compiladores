<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión a la base de datos
include('../Conexión/conectabd.php');

// Obtener la consulta SQL desde el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);
$sql = $data['sql'] ?? '';  // Obtener la consulta SQL del JSON

$response = [];

if ($sql) {
    // Ejecutar la consulta SQL
    $resultado = $mysqli->query($sql);
    
    if ($resultado) {
        // Si la consulta tiene resultados, devolverlos
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
        // Si hay un error en la consulta SQL
        $response = ["error" => "Error en la ejecución de la consulta: " . $mysqli->error];
    }
} else {
    $response = ["error" => "No se recibió ninguna consulta SQL."];
}

// Enviar la respuesta en formato JSON
echo json_encode($response);

// Cerrar la conexión a la base de datos
$mysqli->close();
?>
