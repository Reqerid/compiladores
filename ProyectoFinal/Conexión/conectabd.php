<?php
// Datos de conexión
$servidor = "localhost";
$usuario = "reqerid";
$contraseña = "20031981";

// Crear la conexión
$mysqli = new mysqli($servidor, $usuario, $contraseña);

// Verificar si hay errores de conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}
?>
