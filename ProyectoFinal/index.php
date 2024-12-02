<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analizador MySql</title>
    <link rel="stylesheet" href="Vistas/src/index.css"> <!-- Archivo CSS externo -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="icon" href="Vistas2/media/unach.png"></link>
</head>
<body>

    <!-- Pantalla de carga -->
    <div id="loadingScreen">
        <div id="logoContainer">
            <img class="unach" src="Vistas/img/unach.png" alt="Logo Universidad" id="logo">
        </div>
    </div>

    <!-- Contenido de la página -->
    <div id="mainContent" style="display: none;">
        <!--<h1>Analizador</h1>-->
        <div class="mysql-logo-container">
            <img class="mysql-logo" src="Vistas/img/mysql.png" alt="Logo MySQL">
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Simula una carga de página
            setTimeout(function() {
                $("#loadingScreen").fadeOut("slow", function() {
                    $("#mainContent").fadeIn("slow");
                    setTimeout(function() {
                        window.location.href = "Vistas2/analisis2.php"; // Cambia "vista.php" por la ruta de tu vista
                    }, 2000);
                });
            }, 3500); // Ajusta el tiempo de carga según tus necesidades
        });
    </script>

</body>
</html>
