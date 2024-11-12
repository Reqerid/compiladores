document.addEventListener('DOMContentLoaded', function() {

    // Referencias a elementos del DOM
    const btnEjecutar = document.getElementById('btnEjecutar');
    const sqlForm = document.getElementById('sqlForm');
    const codigoSql = document.getElementById('codigo_sql');
    const statusMessage = document.getElementById('statusMessage');
    const tokenTable = document.getElementById('tokenTable');
    const errorMessage = document.getElementById('errorMessage');
    const consultaDiv = document.querySelector('.consulta'); // Usamos el div de la clase "consulta"

    // Manejo del evento de clic en el botón de ejecutar
    btnEjecutar.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const sqlQuery = codigoSql.value.trim();

        if (!sqlQuery) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Por favor ingresa una consulta SQL.';
            return;
        }

        // Limpiar posibles mensajes de error previos
        errorMessage.style.display = 'none';
        statusMessage.textContent = '';
        tokenTable.style.display = 'none';

        // Mostrar mensaje de espera
        statusMessage.textContent = 'Ejecutando la consulta...';
        statusMessage.classList.remove('error');
        statusMessage.classList.add('info');

        // Realizar la solicitud al servidor
        fetch('../Controladores/ejecucion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql: sqlQuery }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json(); // Asumimos que la respuesta es JSON
        })
        .then(data => {
            // Verificar si la respuesta contiene errores
            if (data.error) {
                statusMessage.textContent = data.error;
                statusMessage.classList.remove('info');
                statusMessage.classList.add('error');
            } else {
                // Mostrar los datos de la consulta en la "consola"
                statusMessage.textContent = 'Consulta ejecutada con éxito.';
                statusMessage.classList.remove('info');
                statusMessage.classList.add('success');

                // Mostrar resultados en formato tabla o consola
                mostrarResultados(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = 'Hubo un error al procesar la consulta.';
            statusMessage.classList.remove('info');
            statusMessage.classList.add('error');
        });
    });

    // Función para mostrar los resultados de la consulta en formato de "consola"
    // Función para mostrar los resultados de la consulta en formato de "consola"
    function mostrarResultados(data) {
        // Limpiar el contenido previo en la consola
        consultaDiv.innerHTML = '';  // Limpiar el div .consulta antes de agregar nuevos resultados
        
        let html = '<table><tr>';
        
        // Encabezados de la tabla (usar claves del primer objeto de "data")
        if (data.data && data.data.length > 0) {
            Object.keys(data.data[0]).forEach(key => {
                html += `<th>${key}</th>`;
            });
            html += '</tr>';

            // Filas de datos
            data.data.forEach(row => {
                html += '<tr>';
                Object.values(row).forEach(value => {
                    html += `<td>${value}</td>`;
                });
                html += '</tr>';
            });

            html += '</table>';
        } else {
            html = '<p>No se encontraron resultados.</p>';
        }

        consultaDiv.innerHTML = html;  // Añadir los resultados al div .consulta

        // Establecer un límite de ancho y el estilo de overflow en la tabla
        const table = consultaDiv.querySelector('table');
        if (table) {
            table.style.maxWidth = '800px';   // Ajusta el ancho máximo que deseas
            table.style.overflowX = 'auto';   // Desplazamiento horizontal si excede el ancho
            table.style.display = 'block';    // Asegura que el overflow funcione
        }
    }


    // Función para cerrar la ventana de información
    function closeWindow() {
        const informacionDiv = document.querySelector('.informacion');
        informacionDiv.style.display = 'none';
    }

    // Función para cerrar la ventana de historial
    function closeWindow2() {
        const historialDiv = document.querySelector('.historial');
        historialDiv.style.display = 'none';
    }

});
