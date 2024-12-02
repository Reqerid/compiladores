const iconoConsola = document.querySelector('.icono-consola');
const consolaFormulario = document.querySelector('.consola-formulario');
const botonCerrar = document.querySelector('#botonconsola');
const dragConsola = document.getElementById('drag-consola');

const toggleConsolaVisibility = () => {
    if (consolaFormulario.style.display === 'none' || consolaFormulario.classList.contains('consola-cerrada')) {
        consolaFormulario.style.display = 'flex';
        consolaFormulario.classList.remove('consola-cerrada');
        consolaFormulario.classList.add('consola-desplegada');
    } else {
        consolaFormulario.classList.remove('consola-desplegada');
        consolaFormulario.classList.add('consola-cerrada');
        setTimeout(() => {
            consolaFormulario.style.display = 'none';
        }, 300); // Tiempo de la animación
    }
};

iconoConsola.addEventListener('click', toggleConsolaVisibility);

botonCerrar.addEventListener('click', () => {
    consolaFormulario.classList.remove('consola-desplegada');
    consolaFormulario.classList.add('consola-cerrada');
    setTimeout(() => {
        consolaFormulario.style.display = 'none';
    }, 300); // Tiempo de la animación
});

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

dragConsola.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - consolaFormulario.getBoundingClientRect().left;
    offsetY = e.clientY - consolaFormulario.getBoundingClientRect().top;
    document.body.style.cursor = 'move';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        consolaFormulario.style.left = e.clientX - offsetX + 'px';
        consolaFormulario.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});


//AQUI EMPIEZA SALIDA----------------------------------------
const iconoSalida = document.querySelector('.icono-salida');
const salidaDiv = document.querySelector('.salida');
const botonCerrarSalida = document.querySelector('#botonSalidaCerrar');
const dragSalida = document.getElementById('drag-salida');

// Funcionalidad para mostrar/ocultar el div .salida
const toggleSalidaVisibility = () => {
    if (salidaDiv.style.display === 'none' || salidaDiv.classList.contains('salida-cerrada')) {
        salidaDiv.style.display = 'flex';
        salidaDiv.classList.remove('salida-cerrada');
        salidaDiv.classList.add('salida-desplegada');
    } else {
        salidaDiv.classList.remove('salida-desplegada');
        salidaDiv.classList.add('salida-cerrada');
        setTimeout(() => {
            salidaDiv.style.display = 'none';
        }, 300); // Tiempo de la animación
    }
};

iconoSalida.addEventListener('click', toggleSalidaVisibility);
botonCerrarSalida.addEventListener('click', toggleSalidaVisibility);

// Funcionalidad para mover el div .salida
let offsetXSalida = 0;
let offsetYSalida = 0;
let isDraggingSalida = false;

dragSalida.addEventListener('mousedown', (e) => {
    isDraggingSalida = true;
    offsetXSalida = e.clientX - salidaDiv.getBoundingClientRect().left;
    offsetYSalida = e.clientY - salidaDiv.getBoundingClientRect().top;
    document.body.style.cursor = 'move';  // Cambiar el cursor mientras se arrastra
    e.preventDefault();  // Prevenir selección de texto
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingSalida) {
        const newX = e.clientX - offsetXSalida;
        const newY = e.clientY - offsetYSalida;
        salidaDiv.style.left = `${newX}px`;
        salidaDiv.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingSalida = false;
    document.body.style.cursor = 'default';  // Restaurar el cursor
});

//AQUÍ TERMINA SALIDA -----------------------------------------------------------


// Selección de elementos
const ayudaDiv = document.querySelector('.ayuda');  // Contenedor del div de ayuda
const iconoAyuda = document.querySelector('.icono-ayuda');  // Icono de ayuda (el enlace <a>)
const botonCerrar2 = document.querySelector('.boton-cerrar');  // Botón de cerrar

// Función para mostrar u ocultar el div de ayuda
const toggleAyuda = () => {
    // Verifica si el div de ayuda ya tiene la clase 'mostrar'
    if (ayudaDiv.classList.contains('mostrar')) {
        // Si tiene la clase 'mostrar', se oculta
        ayudaDiv.classList.remove('mostrar');
    } else {
        // Si no tiene la clase 'mostrar', se muestra
        ayudaDiv.classList.add('mostrar');
    }
};

// Evento de clic en el icono de ayuda
iconoAyuda.addEventListener('click', (e) => {
    e.preventDefault();  // Evitar el comportamiento por defecto del enlace
    toggleAyuda();  // Alternar el despliegue/ocultamiento del div de ayuda
});

// Evento de clic en el botón de cerrar
botonCerrar.addEventListener('click', () => {
    ayudaDiv.classList.remove('mostrar');  // Ocultar el div de ayuda
});

// Selección de elementos
const textareaComando = document.getElementById('comando'); // Textarea de la consola
const tarjetasAyuda = document.querySelectorAll('.tarjeta-ayuda'); // Todas las tarjetas de ayuda

// Función para insertar el código de ayuda en el textarea
const insertarCodigoEnTextarea = (codigoSQL) => {
    textareaComando.value = codigoSQL;
    textareaComando.focus(); // Enfocar el textarea después de insertar el código
};

// Añadir evento de clic a cada tarjeta de ayuda
tarjetasAyuda.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        const codigoSQL = tarjeta.getAttribute('data-sql'); // Obtener el código SQL desde el atributo data-sql
        insertarCodigoEnTextarea(codigoSQL); // Insertar el código en el textarea
    });
});

//BOTÓN/ICONO DE EQUIPO//---------------------------------------------------
//BOTÓN/ICONO DE EQUIPO//---------------------------------------------------
//BOTÓN/ICONO DE EQUIPO//---------------------------------------------------
const equipoContainer = document.getElementById('divEquipo');
const toggleEquipoBtn = document.getElementById('toggleEquipoBtn');
const cerrarEquipoBtn = document.getElementById('cerrarEquipoBtn');

toggleEquipoBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    if (!equipoContainer.classList.contains('open')) {
        equipoContainer.classList.remove('closed');
        requestAnimationFrame(() => {
            equipoContainer.style.visibility = 'visible'; // Hacer visible
            equipoContainer.classList.add('open');
        });
    }
});

cerrarEquipoBtn.addEventListener('click', () => {
    equipoContainer.classList.remove('open');
    equipoContainer.classList.add('closed');
    setTimeout(() => {
        equipoContainer.style.visibility = 'hidden';
    }, 500); // Tiempo de la animación
});

//MODO OSCURO Y MODO CLARO
//MODO OSCURO Y MODO CLARO
//MODO OSCURO Y MODO CLARO
//MODO OSCURO Y MODO CLARO
document.getElementById('toggleMode').addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.toggle('modo-claro');
    document.body.classList.toggle('modo-oscuro');

    // Forzar el redibujado de los iconos para asegurarse de que la transición se vea bien
    const iconoClaro = document.getElementById('iconoClaro');
    const iconoOscuro = document.getElementById('iconoOscuro');
    if (document.body.classList.contains('modo-claro')) {
        iconoOscuro.style.display = 'none';
        iconoClaro.style.display = 'block';
    } else {
        iconoClaro.style.display = 'none';
        iconoOscuro.style.display = 'block';
    }
});



//DIV ANALISIS Y ICONO ANALISIS
//DIV ANALISIS Y ICONO ANALISIS
//DIV ANALISIS Y ICONO ANALISIS
//DIV ANALISIS Y ICONO ANALISIS

const analisisIcono = document.querySelector('.icono-analisis');
const dataContainer = document.getElementById('dataContainer');
const closeDataButton = document.getElementById('closeDataButton');
const dragDataHeader = document.getElementById('dragDataHeader');

analisisIcono.addEventListener('click', () => {
    if (dataContainer.style.display === 'none' || dataContainer.style.display === '') {
        dataContainer.style.display = 'block';
        dataContainer.classList.remove('data-cerrado');
        dataContainer.classList.add('data-desplegado');
    } else {
        dataContainer.classList.remove('data-desplegado');
        dataContainer.classList.add('data-cerrado');
        setTimeout(() => {
            dataContainer.style.display = 'none';
        }, 300); // Tiempo de espera para la duración de la animación
    }
});

closeDataButton.addEventListener('click', () => {
    dataContainer.classList.remove('data-desplegado');
    dataContainer.classList.add('data-cerrado');
    setTimeout(() => {
        dataContainer.style.display = 'none';
    }, 300); // Tiempo de espera para la duración de la animación
});

// Funcionalidad de arrastre
dragDataHeader.addEventListener('mousedown', (e) => {
    let shiftX = e.clientX - dataContainer.getBoundingClientRect().left;
    let shiftY = e.clientY - dataContainer.getBoundingClientRect().top;

    const onMouseMove = (e) => {
        dataContainer.style.left = e.pageX - shiftX + 'px';
        dataContainer.style.top = e.pageY - shiftY + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    });

    dragDataHeader.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', onMouseMove);
    });
});

dragDataHeader.ondragstart = () => {
    return false;
};

