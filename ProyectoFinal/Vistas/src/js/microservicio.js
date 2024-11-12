document.addEventListener('DOMContentLoaded', () => {
    const btnAnalizar = document.getElementById('btnAnalizar');
    const sqlInput = document.getElementById('codigo_sql');
    const tokenTable = document.getElementById('tokenTable');
    const errorMessage = document.getElementById('errorMessage');
    const tokenTableBody = tokenTable.querySelector('tbody');
    const statusMessage = document.getElementById('statusMessage');
    
    btnAnalizar.addEventListener('click', (e) => {
        e.preventDefault();  // Evita el envío del formulario por defecto
        
        const sqlQuery = sqlInput.value.trim();  // Obtiene y limpia la consulta SQL desde el textarea
        
        if (!sqlQuery) {
            errorMessage.textContent = "Por favor, ingrese una consulta SQL.";
            errorMessage.style.display = 'block';
            statusMessage.style.display = 'none';
            tokenTable.style.display = 'none';
            return;
        }
        
        // Preparamos el cuerpo de la solicitud en formato JSON
        const requestBody = JSON.stringify({ sql: sqlQuery });
        
        // Enviamos la solicitud al microservicio usando fetch
        fetch('http://127.0.0.1:5000/analyze_sql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        })
        .then(response => response.json())
        .then(data => {
            // Resetea el mensaje de error
            errorMessage.style.display = 'none';
            
            if (data.result) {
                // Si la respuesta contiene "result", se considera una sentencia válida
                statusMessage.textContent = "Sentencia válida";
                statusMessage.className = "sentencia-valida"; // Clase para "Sentencia válida"
                statusMessage.style.display = 'block';
                
                // Oculta el mensaje de error y muestra la tabla
                tokenTable.style.display = 'table';
                
                // Limpia la tabla antes de llenarla
                tokenTableBody.innerHTML = '';
                
                // Llena la tabla con los tokens
                data.tokens.forEach(token => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${token.lexpos}</td>
                        <td>${token.lineno}</td>
                        <td>${token.type}</td>
                        <td>${token.value}</td>
                    `;
                    tokenTableBody.appendChild(row);
                });
            } else if (data.error) {
                // Si la respuesta contiene "error", se considera una sentencia incorrecta
                statusMessage.textContent = "Sentencia incorrecta";
                statusMessage.className = "sentencia-incorrecta"; // Clase para "Sentencia incorrecta"
                statusMessage.style.display = 'block';
                
                // Muestra el mensaje de error y oculta la tabla
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
                tokenTable.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Error al conectar con el microservicio.';
            errorMessage.style.display = 'block';
            tokenTable.style.display = 'none';
            statusMessage.style.display = 'none';
        });
    });
});
