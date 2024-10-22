document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('buttons-container');
    const labels = [
        'C', '(', ')', '\u00F7',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '=', 'Árbol'
    ];

    const actions = {
        '(': "appendToDisplay('(')",
        ')': "appendToDisplay(')')",
        'C': 'clearDisplay()',
        '\u00F7': "appendToDisplay('/')",
        '*': "appendToDisplay('*')",
        '-': "appendToDisplay('-')",
        '+': "appendToDisplay('+')",
        '=': "calculateResult()",
        'Árbol': 'showTree()'  // Agregamos la acción para el botón "Tree"
    };

    labels.forEach(label => {
        const button = document.createElement('button');
        button.className = 'button';
        button.innerText = label;

        if (actions[label]) {
            button.setAttribute('onclick', actions[label]);
            if (label !== 'C') {
                button.classList.add('operator');
            }
        } else {
            button.setAttribute('onclick', `appendToDisplay('${label}')`);
        }

        container.appendChild(button);
    });

    document.getElementById('show-tree').addEventListener('click', showTree);
});

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    document.getElementById('token-body').innerHTML = '';
    document.querySelector('.token-table').classList.add('oculto');
    document.getElementById('tree-container').classList.add('oculto'); // Ocultar el árbol
}

function calculateResult() {
    const expression = document.getElementById('display').value;
    $.post('/calculate', { expression: expression }, function (data) {
        document.getElementById('display').value = data.result;
        updateTokenTable(data.tokens);
    });
}

function updateTokenTable(tokens) {
    const tbody = document.getElementById('token-body');
    const table = document.querySelector('.token-table');

    tbody.innerHTML = '';

    tokens.forEach(([token, tipo]) => {
        const row = document.createElement('tr');
        const tokenCell = document.createElement('td');
        const tipoCell = document.createElement('td');

        tokenCell.textContent = token;
        tipoCell.textContent = tipo;

        row.appendChild(tokenCell);
        row.appendChild(tipoCell);
        tbody.appendChild(row);
    });

    table.classList.remove('oculto');
}

function showTree() {
    const expression = document.getElementById('display').value;
    const tokens = expression.match(/\d+|[+\-*/()]/g); // Tokenizar expresión correctamente
    const treeData = buildTree(tokens);

    renderTree(treeData);
    document.getElementById('tree-container').classList.remove('oculto');
}

function buildTree(tokens) {
    function parseExpression(minPrecedence = 1) {
        let leftNode = parsePrimary();

        while (tokens[index] && getPrecedence(tokens[index]) >= minPrecedence) {
            const operator = tokens[index++];
            const precedence = getPrecedence(operator);

            const rightNode = parseExpression(precedence + 1);
            leftNode = { name: operator, children: [leftNode, rightNode] };
        }
        return leftNode;
    }

    function parsePrimary() {
        const token = tokens[index++];
        if (token === '(') {
            const node = parseExpression();
            index++; // Saltar el ')'
            return node;
        }
        return { name: token, children: [] };
    }

    function getPrecedence(operator) {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    }

    let index = 0;
    return parseExpression();
}

function renderTree(data) {
    const width = 400;
    const height = 300;
    const container = d3.select("#tree-container");
    container.html(''); // Limpiar árbol anterior

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", "translate(50, 50)");

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    const links = g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .classed("link", true)
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    const nodes = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .classed("node", true)
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodes.append("circle")
        .attr("r", 20);

    nodes.append("text")
        .attr("dy", 5)
        .attr("x", d => d.children ? -10 : 10)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}

function parseExpression(expression) {
    const tokens = expression.match(/\d+|[+\-*/()]/g);
    let index = 0;

    function parseFactor() {
        const token = tokens[index++];
        if (token === '(') {
            const node = parseExpression();
            index++;  // Ignorar el ')'
            return node;
        } else if (/\d+/.test(token)) {
            return { type: 'Número', value: parseInt(token) };
        }
        throw new Error("Expresión inválida");
    }

    function parseTerm() {
        let node = parseFactor();
        while (tokens[index] === '*' || tokens[index] === '/') {
            const operator = tokens[index++];
            node = { type: 'Operador', operator, left: node, right: parseFactor() };
        }
        return node;
    }

    function parseExpression() {
        let node = parseTerm();
        while (tokens[index] === '+' || tokens[index] === '-') {
            const operator = tokens[index++];
            node = { type: 'Operador', operator, left: node, right: parseTerm() };
        }
        return node;
    }

    return parseExpression();

    
}

// Inicializa un array para almacenar los resultados
const resultadosGuardados = [];

// Función para guardar el resultado en la lista y actualizar la tabla
function guardarResultado() {
    const resultado = document.getElementById('display').value; // Obtener el resultado actual de la calculadora

    if (resultado) {
        resultadosGuardados.push(resultado); // Agregar el resultado al array
        actualizarTabla(); // Llamar a la función para actualizar la tabla
    }
}

// Función para actualizar la tabla con los resultados guardados
function actualizarTabla() {
    const tbody = document.getElementById('resultado-body'); // Obtener el cuerpo de la tabla
    tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    resultadosGuardados.forEach((resultado) => {
        const row = document.createElement('tr'); // Crear una nueva fila
        const resultadoCell = document.createElement('td'); // Crear celda para el resultado
        const buttonCell = document.createElement('td'); // Crear celda para el botón

        resultadoCell.textContent = resultado; // Asignar el resultado a la celda
        buttonCell.innerHTML = `<button onclick="usarResultado('${resultado}')">Usar</button>`; // Crear el botón "Usar"

        row.appendChild(resultadoCell); // Agregar la celda del resultado a la fila
        row.appendChild(buttonCell); // Agregar la celda del botón a la fila
        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });
}

// Función para usar el resultado (puedes definirla según tu necesidad)
function usarResultado(resultado) {
    document.getElementById('display').value += resultado; // Coloca el resultado en el display de la calculadora
}


