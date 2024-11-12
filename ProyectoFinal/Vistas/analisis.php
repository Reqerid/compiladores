<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Análisis</title>
    <link rel="stylesheet" href="src/analisis.css?V=10.2"> <!-- Archivo CSS externo -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="src/js/analisis.js?v=1"></script> <!-- Archivo JS externo -->
    <script src="src/js/ejecuta.js?v=1"></script>
    <script src="src/js/microservicio.js"></script> <!--script del microservicio-->
</head>
<body>
    <!-- Contenedor principal -->
    <div class="container">
        <!-- Logo MySQL en la parte superior derecha -->
        <img src="img/mysql.png" alt="Logo MySQL" id="mysqlLogo"> 

        <header class="header">
            <h1>Análisis de Inyecciones MySql</h1>
            <p>Bienvenido al módulo de análisis. A continuación se muestran los elementos principales del análisis.</p>
        </header>

        <!-- Sección de métricas -->
        <div class="metrics">
            <div class="metric-card">
                <h2>Léxico</h2>
                <p> Se encarga de dividir el código en tokens (palabras clave, operadores, etc.), identificando patrones que puedan ser maliciosos.</p>
            </div>
            <div class="metric-card">
                <h2>Sintáctico</h2>
                <p>Verifica que la estructura de la consulta SQL sea válida según las reglas del lenguaje, ayudando a detectar errores o manipulaciones.</p>
            </div>
            <div class="metric-card">
                <h2>Semántico</h2>
                <p>Valida que la consulta SQL tenga sentido dentro del contexto, asegurando que las secuencias sean ejecutables sin errores.</p>
            </div>
        </div>
            
    </div>


    <div class="formulariosql">
        <h2>Ingresar Código SQL</h2>
        <form id="sqlForm" action="#" method="post">
            <textarea name="codigo_sql" id="codigo_sql" rows="10" placeholder="</>"></textarea>
            <div class="botonesformulariosql">
                <button type="submit" id="btnAnalizar">Analizar</button>
                <button type="button" id="btnEjecutar">Ejecutar</button>
                <button id="btnInformacion" type="button">Información</button>
                <button id="btnHistorial" type="button">Historial</button>
            </div>
        </form>
    </div>


    <div class="informacion">
        <div class="informacion-header">
            <h2>Información</h2>
            <button class="close-btn" onclick="closeWindow()">X</button>
        </div>
        <div class="informacion-content">
            <p id="statusMessage" class=""></p> <!-- Mensaje de estado de la sentencia -->
            <table id="tokenTable" style="width:100%; display: none;">
                <thead>
                    <tr>
                        <th>Lexpos</th>
                        <th>Linea</th>
                        <th>Tipo</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <p id="errorMessage" style="color: red; display: none;"></p>
        </div>

    </div>

    <div class="historial">
        <div class="historial-header">
            <h2>Historial</h2>
            <button class="close-btn" onclick="closeWindow2()">X</button>
        </div>
        <div class="historial-content">
            <!-- Contenido de la ventana -->
            <p>Este es el contenido de la ventana de historial.</p>
        </div>
    </div>

    <div class="consulta">
        <div class="table-container">
            <table>
                <!-- Contenido de la tabla -->
            </table>
        </div>
    </div>




</body>
</html>
