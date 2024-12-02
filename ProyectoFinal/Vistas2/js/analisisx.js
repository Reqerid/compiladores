// Selección de elementos
const comandoInput = document.getElementById('comando');
const resultadoTextarea = document.getElementById('resultado');
const mensajeConsulta = document.getElementById('mensaje-consulta');
const tablaTokens = document.getElementById('tabla-tokens').querySelector('tbody');

// Función para enviar la consulta SQL al microservicio
const enviarConsultaSQL = async () => {
    const consulta = comandoInput.value;

    try {
        // Primer paso: enviar la consulta al microservicio de análisis SQL
        const respuesta = await fetch('http://localhost:5000/analyze_sql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql: consulta })
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();

            // Mostrar mensaje de éxito o error en el análisis
            mensajeConsulta.textContent = datos.result;

            // Limpiar la tabla de tokens antes de llenarla
            tablaTokens.innerHTML = '';

            // Llenar la tabla de tokens
            datos.tokens.forEach(token => {
                const fila = document.createElement('tr');
                const celdaToken = document.createElement('td');
                const celdaTipo = document.createElement('td');
                celdaToken.textContent = token.value;
                celdaTipo.textContent = token.type;
                fila.appendChild(celdaToken);
                fila.appendChild(celdaTipo);
                tablaTokens.appendChild(fila);
            });

            // Segundo paso: si el análisis es exitoso, enviar la consulta a la base de datos mediante ejecucion.php
            try {
                const respuestaDB = await fetch('../Controladores/ejecucion.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sql: consulta })
                });

                if (respuestaDB.ok) {
                    const datosDB = await respuestaDB.json();

                    if (datosDB.data) {
                        // Si hay resultados, formatearlos y mostrarlos en resultadoTextarea
                        let resultadoTexto = '';
                        datosDB.data.forEach(row => {
                            resultadoTexto += JSON.stringify(row) + '\n';
                        });
                        resultadoTextarea.value = resultadoTexto;
                    } else if (datosDB.error) {
                        // Si hubo un error en la ejecución SQL, mostrar el mensaje de error
                        resultadoTextarea.value = datosDB.error;
                    }
                } else {
                    resultadoTextarea.value = 'Error al ejecutar la consulta en la base de datos';
                }
            } catch (error) {
                resultadoTextarea.value = 'Error de conexión con el servidor de base de datos';
            }
        } else {
            mensajeConsulta.textContent = 'Error en el análisis de la consulta';
            resultadoTextarea.value = '';
        }
    } catch (error) {
        mensajeConsulta.textContent = 'Error de conexión con el microservicio';
        resultadoTextarea.value = '';
    }
};

// Event listener para detectar Ctrl + Enter
comandoInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();  // Evitar salto de línea
        enviarConsultaSQL();
    }
});
