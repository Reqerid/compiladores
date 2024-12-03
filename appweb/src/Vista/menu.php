<?php
require '../Controlador/cadenero.php';
$hola=$_SESSION['usuario'];
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Minimalista</title>
    <link rel="stylesheet" href="../..//static/style2.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .navbar {
            background-color: #333;
            overflow: hidden;
        }
        .navbar a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
        .navbar a:hover {
            background-color: #ddd;
            color: black;
        }
        .logout-button {
            float: right;
            background-color: #e74c3c; /* Rojo para el botón de cerrar sesión */
            border: none;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            cursor: pointer;
            margin: 10px;
            border-radius: 5px;
        }
        .logout-button:hover {
            background-color: #c0392b;
        }
    </style>
</head>
    <body>


        <div class="navbar">
                <a >Inicio</a>
                <a >Otro</a>
                <a >Perfil</a>


                <button class="logout-button" onclick="logout()">Cerrar sesión</button>
        </div>

        <?php
                    // Verificar si el usuario ha iniciado sesión
                    if (isset($_SESSION['usuario'])) {
                        echo "<div class='bienvenido'>Bienvenido, " . htmlspecialchars($_SESSION['usuario']) . "!</div>";
                    } else {
                        echo "<p>Por favor, inicia sesión para continuar.</p>";
                    }
                ?>

<div class="button-container">
        <a href="../Controlador/reportes/reporte1.php" class="btn-icon" id="btn1">
            <img src="../../static/recursos/Reporte.png" alt="Icono 1">
            Reporte 1   
        </a>
        <a href="../Controlador/reportes/reporte2.php" class="btn-icon" id="btn2">
            <img src="../../static/recursos/Reporte.png" alt="Icono 2">
            Reporte 2
        </a>
        <a href="../Controlador/reportes/reporte3.php" class="btn-icon" id="btn3">
            <img src="../../static/recursos/Reporte.png" alt="Icono 3">
            Reporte 3
        </a>
        <a href="../Controlador/reportes/reporte4.php" class="btn-icon" id="btn4">
            <img src="../../static/recursos/Reporte.png" alt="Icono 4">
            Reporte 4
        </a>
        <a href="../Controlador/reportes/reporte5.php" class="btn-icon" id="btn5">
            <img src="../../static/recursos/Reporte.png" alt="Icono 5">
            Reporte 5
        </a>
        <a href="../Controlador/reportes/reporte6.php" class="btn-icon" id="btn6">
            <img src="../../static/recursos/Reporte.png" alt="Icono 6">
            Reporte 6
        </a>
        <a href="../Controlador/reportes/reporte7.php" class="btn-icon" id="btn7">
            <img src="../../static/recursos/Reporte.png" alt="Icono 7">
            Reporte 7
        </a>
    </div>

    </body>
</html>


<script>
        function logout() {
            // Redirigir a la página de cierre de sesión
            window.location.href = "../Controlador/logout.php"; // Asegúrate de tener esta ruta
        }
</script>
<script>
</script>
