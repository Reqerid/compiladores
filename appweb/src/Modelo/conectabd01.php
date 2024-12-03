<?php
// Datos de conexión
$servidor = "localhost"; // 
$usuario = "reqerid"; // 
$contraseña = "20031981"; // 
$base_de_datos= "appwebBD"; // 

$mysqli = new mysqli($servidor, $usuario, $contraseña, $base_de_datos);

// Verificar conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
} else
?>