$(document).ready(function() {
    // Efecto de desplazamiento suave para anclas
    $("a").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;

            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Efecto en los cards al hacer hover
    $(".metric-card").hover(
        function() {
            $(this).css("background-color", "var(--color-medium)");
        },
        function() {
            $(this).css("background-color", "var(--color-dark)");
        }
    );

    // Botón de información
    document.getElementById("btnInformacion").addEventListener("click", function() {
        const informacionDiv = document.querySelector(".informacion");
        if (informacionDiv.style.display === "none" || informacionDiv.style.display === "") {
            informacionDiv.style.display = "block";
        } else {
            informacionDiv.style.display = "none";
        }
    });

    // Botón historial
    document.getElementById("btnHistorial").addEventListener("click", function() {
        const historialDiv = document.querySelector(".historial");
        if (historialDiv.style.display === "none" || historialDiv.style.display === "") {
            historialDiv.style.display = "block";
        } else {
            historialDiv.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const informacionDiv = document.querySelector(".informacion");
    const headerDiv = document.querySelector(".informacion-header");

    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    // Drag en el encabezado de información
    headerDiv.addEventListener("mousedown", function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = informacionDiv.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        
        informacionDiv.style.userSelect = "none"; 
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            informacionDiv.style.left = `${e.clientX - offsetX}px`;
            informacionDiv.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
        informacionDiv.style.userSelect = "";
    });
});

// Función para cerrar la ventana de información
function closeWindow() {
    const informacionDiv = document.querySelector('.informacion');
    informacionDiv.style.display = 'none';
}

// HISTORIAL --------------------------------------------------------

// Función para cerrar la ventana de historial
function closeWindow2() {
    const historialDiv = document.querySelector('.historial');
    historialDiv.style.display = 'none';
}

// Mover la ventana de historial
document.addEventListener("DOMContentLoaded", function() {
    const historialDiv = document.querySelector(".historial");
    const historialHeader = historialDiv.querySelector(".historial-header");

    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    historialHeader.addEventListener("mousedown", function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = historialDiv.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        
        historialDiv.style.userSelect = "none"; 
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            historialDiv.style.left = `${e.clientX - offsetX}px`;
            historialDiv.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
        historialDiv.style.userSelect = "";
    });
});

// Función para mostrar los tokens en la tabla de información
function mostrarTokens(tokens) {
    const informacionDiv = document.querySelector('.informacion');
    
    // Limpiar el contenido previo en la tabla de información
    informacionDiv.innerHTML = ''; 

    let html = '<table id="tokenTable"><tr>';
    
    // Encabezados de la tabla
    html += '<th>Token</th><th>Tipo</th><th>Valor</th>';
    html += '</tr>';

    // Filas de datos de tokens
    tokens.forEach(token => {
        html += `<tr><td>${token.nombre}</td><td>${token.tipo}</td><td>${token.valor}</td></tr>`;
    });

    html += '</table>';

    // Agregar el HTML de la tabla a la div de información
    informacionDiv.innerHTML = html;

    // Establecer un límite de altura y el estilo de overflow en la tabla
    const tokenTable = informacionDiv.querySelector('#tokenTable');
    if (tokenTable) {
        tokenTable.style.maxHeight = '390px';
        tokenTable.style.overflowY = 'auto';
        tokenTable.style.display = 'block';
    }
}
