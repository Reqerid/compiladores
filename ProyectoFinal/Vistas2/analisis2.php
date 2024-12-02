<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Modulo de análisis</title>
    <link rel="stylesheet" href="css/analisis2.css?v=1"> <!-- Archivo CSS externo -->
    <link rel="icon" href="media/unach.png">
    </link>

    <style>
        /* Personalización de la barra de desplazamiento en toda la página */
        ::-webkit-scrollbar {
            width: 10px;
            /* Ancho de la barra de desplazamiento */
        }

        /* Personalización de la barra de desplazamiento en toda la página */

        ::-webkit-scrollbar-track {
            background-color: rgba(30, 30, 30, 0.7);
            /* Color de fondo de la pista con transparencia */
            border-radius: 10px;
            /* Bordes redondeados */
        }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(100, 100, 100, 0.8);
            /* Color de la barra de desplazamiento */
            border-radius: 10px;
            /* Bordes redondeados */
            border: 2px solid rgba(30, 30, 30, 0.7);
            /* Espacio alrededor de la barra, combinando con el fondo */
            transition: background-color 0.3s ease;
            /* Transición suave al cambiar de color */
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(140, 140, 140, 0.9);
            /* Color más claro al pasar el mouse */
            cursor: pointer;
            /* Cambiar el cursor a mano al pasar por encima de la barra */

        }

        ::-webkit-scrollbar-corner {
            background-color: rgba(30, 30, 30, 0.7);
            /* Coincide con el fondo de la pista */
        }
    </style>

</head>

<body>


    <div id="backgroundContainer">
        <div id="backgroundImage1"></div>
        <div id="backgroundImage2"></div>
        <img src="media/LOGO.png" alt="Logo" id="logoCentral">
    </div>


    <!-- BOTÓN DE DIA / NOCHE -->
    <div class="DiaNoche">
        <a href="#" id="toggleMode">
            <img src="media/Claro.png" alt="Modo Claro" id="iconoClaro" class="icono-modo">
            <img src="media/Oscuro.png" alt="Modo Oscuro" id="iconoOscuro" class="icono-modo">
        </a>
    </div>





    <!--ÉSTE ES EL DIV DE LA CONSOLA-->
    <div class="consola-formulario">
        <div class="consola-header" id="drag-consola">
            <span class="consola-titulo">Consola</span>
            <a href="#salidaIcono" class="icono-salida">
                <img src="media/pantalla.png" alt="PantallaSalida">
            </a>
            <a href="#analisisIcono" class="icono-analisis">
                <img src="media/analisis.png" alt="Analisis">
            </a>
            <button class="boton-cerrar" id="botonconsola"></button>
        </div>
        <form class="formulario-consola">
            <div class="consola-entrada">
                <textarea id="comando" class="entrada-comando" placeholder="CTR+ENTER para ejecutar o CTR+A para analizar... "></textarea>
            </div>
        </form>
    </div>
    <div class="salida">
        <!-- Header similar al de consola -->
        <div class="salida-header" id="drag-salida">
            <span class="salida-titulo">Salida</span>
            <button class="boton-cerrar-salida" id="botonSalidaCerrar"></button>
        </div>
        <!-- Primer div: Pantalla de salida con un textarea -->
        <div class="pantalla-salida">
            <textarea id="resultado" class="pantalla-resultado" readonly placeholder="Resultado de la consulta SQL"></textarea>
        </div>

        <!-- Segundo div: Mensajes de error/aceptación y tabla de tokens -->
        <div class="mensaje-y-tokens">
            <!-- Cuadro de mensaje de error o éxito -->
            <div class="mensaje">
                <p id="mensaje-consulta">Esperando consulta...</p> <!-- Mensaje inicial -->
            </div>
        </div>
    </div>





    <div class="ayuda">

        <!-- Encabezado de la ayuda con botón de cerrar -->
        <div class="ayuda-header">
            <span>Ayuda de Consultas SQL</span>
        </div>

        <!-- Tarjetas de ayuda SQL -->
        <div class="tarjeta-ayuda" id="tarjeta-select" data-sql="SELECT id, nombre FROM usuarios WHERE id = 1;">
            <h3>SELECT</h3>
            <p>Recupera datos de una o varias tablas en la base de datos.</p>
            <pre><code>SELECT id, nombre FROM usuarios WHERE id = 1;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-insert" data-sql="INSERT INTO usuarios (id, nombre) VALUES (1, 'nombre1');">
            <h3>INSERT INTO</h3>
            <p>Inserta nuevos registros en una tabla específica.</p>
            <pre><code>INSERT INTO usuarios (id, nombre) VALUES (1, 'nombre1');</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-delete" data-sql="DELETE FROM usuarios WHERE id = 1;">
            <h3>DELETE</h3>
            <p>Elimina uno o más registros de una tabla.</p>
            <pre><code>DELETE FROM usuarios WHERE id = 1;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-update" data-sql="UPDATE usuarios SET nombre = 'nombre2' WHERE id = 1;">
            <h3>UPDATE</h3>
            <p>Modifica datos existentes en una tabla.</p>
            <pre><code>UPDATE usuarios SET nombre = 'nombre2' WHERE id = 1;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-create-table" data-sql="CREATE TABLE usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100), edad INT);">
            <h3>CREATE TABLE</h3>
            <p>Crea una nueva tabla en la base de datos con columnas y tipos de datos definidos.</p>
            <pre><code>CREATE TABLE usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100), edad INT);</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-drop-table" data-sql="DROP TABLE usuarios;">
            <h3>DROP TABLE</h3>
            <p>Elimina por completo una tabla de la base de datos y todos sus datos.</p>
            <pre><code>DROP TABLE usuarios;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-alter-table" data-sql="ALTER TABLE usuarios ADD COLUMN email VARCHAR(255);">
            <h3>ALTER TABLE</h3>
            <p>Modifica la estructura de una tabla, como agregar o eliminar columnas.</p>
            <pre><code>ALTER TABLE usuarios ADD COLUMN email VARCHAR(255);</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-truncate" data-sql="TRUNCATE TABLE usuarios;">
            <h3>TRUNCATE</h3>
            <p>Elimina todos los registros de una tabla sin borrar su estructura.</p>
            <pre><code>TRUNCATE TABLE usuarios;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-show-tables" data-sql="SHOW TABLES;">
            <h3>SHOW TABLES</h3>
            <p>Muestra todas las tablas existentes en la base de datos actual.</p>
            <pre><code>SHOW TABLES;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-describe" data-sql="DESCRIBE usuarios;">
            <h3>DESCRIBE</h3>
            <p>Muestra la estructura de una tabla, incluyendo columnas y tipos de datos.</p>
            <pre><code>DESCRIBE usuarios;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-create-database" data-sql="CREATE DATABASE nueva_base_datos;">
            <h3>CREATE DATABASE</h3>
            <p>Crea una nueva base de datos.</p>
            <pre><code>CREATE DATABASE nueva_base_datos;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-use-database" data-sql="USE mi_base_datos;">
            <h3>USE DATABASE</h3>
            <p>Selecciona una base de datos para trabajar con ella.</p>
            <pre><code>USE mi_base_datos;</code></pre>
        </div>

        <div class="tarjeta-ayuda" id="tarjeta-drop-database" data-sql="DROP DATABASE nueva_base_datos;">
            <h3>DROP DATABASE</h3>
            <p>Elimina una base de datos completa junto con todas sus tablas y datos. Esta operación es irreversible y debe usarse con precaución.</p>
            <pre><code>DROP DATABASE nueva_base_datos;</code></pre>
        </div>

    </div>

    <!--sección de equipo-->
    <div id="divEquipo" class="equipo-container">
        <div class="equipo-header">
            <h2>Equipo de Programadores</h2> <button class="cerrar-equipo" id="cerrarEquipoBtn">&times;</button>
        </div>
        <div class="programador" id="programador1"> <img src="media/Gabriel.png" alt="Foto de Programador 1" class="foto-perfil">
            <div class="info-programador">
                <h3 class="nombre-programador">Gabriel Hassan Bruno Sanchez</h3>
                <p class="leyenda-programador">Café y código</p>
            </div>
        </div>
        <div class="programador" id="programador2"> <img src="media/Alan.png" alt="Foto de Programador 2" class="foto-perfil">
            <div class="info-programador">
                <h3 class="nombre-programador">Alan Alexander Hernández López</h3>
                <p class="leyenda-programador">Si ves el árbol contra el que te vas a estrellar, es subviraje. Si sólo lo oyes, es sobreviraje.</p>
            </div>
        </div>
        <div class="programador" id="programador3"> <img src="media/Oscar.png" alt="Foto de Programador 3" class="foto-perfil">
            <div class="info-programador">
                <h3 class="nombre-programador">Oscar Abel Torres Gómez</h3>
                <p class="leyenda-programador">Aprender a programar es como ser mago: al principio solo haces aparecer errores, pero con práctica empiezas a crear magia.</p>
            </div>
        </div>
        <div class="programador" id="programador4"> <img src="media/Arturo.png" alt="Foto de Programador 4" class="foto-perfil">
            <div class="info-programador">
                <h3 class="nombre-programador">Diego Arturo Anzá Díaz</h3>
                <p class="leyenda-programador">Me gustan las fresas</p>
            </div>
        </div>
        <div class="programador" id="programador5"> <img src="media/Ximena.png" alt="Foto de Programador 5" class="foto-perfil">
            <div class="info-programador">
                <h3 class="nombre-programador">Ximena Segundo Natarén</h3>
                <p class="leyenda-programador">Si funciona, no lo toques. Si no funciona, reinicia a ver qué pasa</p>
            </div>

        </div>
    </div>


    <!-- BARRA DE NAVEGACIÓN -->
    <div id="mi-componente">
        <div class="iconos-izquierda">
            <a href="#consola" class="icono-consola">
                <img src="media/consola.png" alt="Consola">
            </a>
            <a href="#ayuda" class="icono-ayuda">
                <img src="media/ayuda.png" alt="Ayuda">
            </a>
            <a href="#historial" class="icono-historial">
                <img src="media/historial.png" alt="Historial">
            </a>

        </div>

        <div id="IconoCentral" class="IconoCentralizado">
            <a href="#databaseanimated" class="base-animada" onclick="return false;">
                <video id="videoIcon">
                    <source src="media/datos.webm" type="video/webm">
                    Tu navegador no soporta el elemento de video.
                </video>
            </a>
        </div>





        <a href="#equipo" class="icono-equipo" id="toggleEquipoBtn"> <img src="media/equipo.png" alt="Equipo"></a>
    </div>

    <div class="data-container" id="dataContainer">
        <div class="data-header" id="dragDataHeader">
            <span class="data-title">Microservicio Resultados</span>
            <button class="close-button" id="closeDataButton"></button>
        </div>
        <div class="data-content" id="dataContent">
            <!-- Aquí se llenará con la información del microservicio -->
        </div>
    </div>








    <!--script de la página después del doom-->
    <script src="js/script.js?V=1"></script>
    <script src="js/analisis.js"></script>
</body>

</html>
<script>
    const videoIcon = document.getElementById('videoIcon');

    function playVideoOnce() {
        // Reiniciar el video al inicio
        videoIcon.currentTime = 0;
        videoIcon.play();

        // Esperar a que el video termine y pausarlo
        videoIcon.onended = () => {
            videoIcon.pause();
        };
    }

    // Añadir el evento de clic al documento entero
    document.addEventListener('click', playVideoOnce);
</script>