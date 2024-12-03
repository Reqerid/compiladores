<?php
session_start();
include '../Modelo/conectabd01.php';

// Verificar si el formulario ha sido enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener valores del formulario
    $email = $_POST['email'] ?? '';
    $contraseña = $_POST['contraseña'] ?? '';

    // Comprobar si los campos están vacíos
    if (empty($email) || empty($contraseña)) {
        echo "Por favor, completa todos los campos.";
        exit;
    }

    // Preparar la consulta SQL para obtener el hash de la contraseña del usuario
    $sql = "SELECT contraseña, nombre_usuario FROM usuarios WHERE email = ?";
    $stmt = $mysqli->prepare($sql);
    
    // Comprobar si la preparación fue exitosa
    if ($stmt === false) {
        echo "Error en la preparación de la consulta: " . htmlspecialchars($mysqli->error);
        exit;
    }

    // Vincular parámetros y ejecutar
    $stmt->bind_param('s', $email);
    $stmt->execute();
    
    // Obtener el resultado
    $result = $stmt->get_result();

    // Comprobar si hay un usuario coincidente
    if ($result->num_rows > 0) {
        // Obtener el hash de la contraseña
        $row = $result->fetch_assoc();
        $hashed_password = $row['contraseña'];
        $nombre_usuario =$row['nombre_usuario'];

        // Verificar la contraseña ingresada contra el hash
        if (password_verify($contraseña, $hashed_password)) {
            $_SESSION['usuario'] = $nombre_usuario; // Guardar el nombre de usuario en la sesión
            header("Location: ../Vista/menu.php");
            exit;
        } else {
            echo "Credenciales incorrectas.";
            $_SESSION['usuario'] = null;
            header("Location: ../../index.php");
            exit;
        }
    } else {
        echo "Credenciales incorrectas.";
        $_SESSION['usuario'] = null;
        header("Location: ../../index.php");
        exit;
    }

    // Cerrar la declaración
    $stmt->close();
}

// Cerrar la conexión
$mysqli->close();
?>



