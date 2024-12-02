// Selección de elementos del DOM
const comandoInput = document.getElementById('comando');
const resultadoTextarea = document.getElementById('resultado');
const mensajeConsulta = document.getElementById('mensaje-consulta');

// Función para enviar la consulta SQL al controlador PHP
const enviarConsultaSQL = async () => {
    const consulta = comandoInput.value.trim();
    mensajeConsulta.textContent = 'Ejecutando consulta...';
    resultadoTextarea.value = '';

    if (!consulta) {
        mensajeConsulta.textContent = 'Por favor, ingresa una consulta SQL.';
        return;
    }

    try {
        const respuestaDB = await fetch('../Controladores/ejecucion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql: consulta })
        });

        if (respuestaDB.ok) {
            const contentType = respuestaDB.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const datos = await respuestaDB.json();
                if (datos.error) {
                    mensajeConsulta.textContent = `Error en la consulta SQL: ${datos.error}`;
                    resultadoTextarea.value = '';
                } else {
                    mensajeConsulta.textContent = 'Consulta ejecutada con éxito';
                    resultadoTextarea.value = JSON.stringify(datos.data, null, 2);
                }
            } else {
                mensajeConsulta.textContent = "Error: La respuesta del servidor no es JSON válido. Revisa los errores del servidor.";
                resultadoTextarea.value = await respuestaDB.text();
            }
        } else {
            mensajeConsulta.textContent = `Error en la respuesta del servidor: ${respuestaDB.status} ${respuestaDB.statusText}`;
            resultadoTextarea.value = '';
        }
    } catch (error) {
        // Mensaje de error en caso de problemas de conexión
        mensajeConsulta.textContent = `Error de conexión con el servidor: ${error.message}`;
        resultadoTextarea.value = '';
    }
};

// Event listener para detectar Ctrl + Enter
comandoInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        enviarConsultaSQL();
    }
});

//----------------------------------------------------------
//----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('comando');
    const dataContainer = document.getElementById('dataContainer');
    const dataContent = document.getElementById('dataContent');
    const analisisIcono = document.querySelector('.icono-analisis');

    // Función para enviar la consulta SQL al microservicio
    async function sendSQLQuery(query) {
        try {
            const response = await fetch('http://127.0.0.1:5000/analyze_sql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sql: query }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al enviar la consulta:', error);
            return null;
        }
    }

    // Función para llenar el div con la información del microservicio con formato
    function fillDataContainer(data) {
        if (data) {
            let resultHTML = '';

            if (data.result) {
                resultHTML += `
                    <div class="resultado">
                        <h3>Resultado</h3>
                        <p>${data.result}</p>
                    </div>
                `;
            }

            if (data.error) {
                resultHTML += `
                    <div class="error">
                        <h3>Error</h3>
                        <p>${data.error}</p>
                    </div>
                `;
            }

            if (data.tokens && data.tokens.length > 0) {
                resultHTML += `
                    <div class="tokens">
                        <h3>Tokens</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    <th>Línea</th>
                                    <th>Posición</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.tokens.map(token => `
                                    <tr>
                                        <td>${token.type}</td>
                                        <td>${token.value}</td>
                                        <td>${token.lineno}</td>
                                        <td>${token.lexpos}</td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }

            dataContent.innerHTML = resultHTML;
        }
    }

    // Evento para detectar CTRL+A
    textarea.addEventListener('keydown', async (e) => {
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            const query = textarea.value;
            const data = await sendSQLQuery(query);
            fillDataContainer(data);

            // Mostrar el div si está oculto
            if (dataContainer.style.display === 'none' || dataContainer.style.display === '') {
                dataContainer.style.display = 'block';
                dataContainer.classList.remove('data-cerrado');
                dataContainer.classList.add('data-desplegado');
            }
        }
    });
});
