from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

def analizar_lexico(expression):
    # Expresión regular actualizada para detectar decimales y otros tokens
    tokens = re.findall(r'\d+\.\d+|\d+|\+|\-|\*|\/|\(|\)', expression)
    tipos = []

    for token in tokens:
        if re.match(r'\d+\.\d+', token):  # Detectar número decimal
            tipos.append((token, "Número decimal"))
        elif token.isdigit():  # Detectar número entero
            tipos.append((token, "Número entero"))
        elif token in "+-*/":  # Detectar operadores
            operadores = {
                '+': "Operador suma",
                '-': "Operador resta",
                '*': "Operador multiplicación",
                '/': "Operador división"
            }
            tipos.append((token, operadores[token]))
        elif token == '(':  # Paréntesis izquierdo
            tipos.append((token, "Paréntesis izquierdo"))
        elif token == ')':  # Paréntesis derecho
            tipos.append((token, "Paréntesis derecho"))

    return tipos

# Prueba del analizador léxico
expresion = "3.14 + 2 * (7.0 - 5)"
resultado = analizar_lexico(expresion)

# Mostrar los tokens generados
for token, tipo in resultado:
    print(f"Token: {token}, Tipo: {tipo}")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=["POST"])
def calculate():
    try:
        expression = request.form['expression']
        tokens = analizar_lexico(expression)
        result = eval(expression)
        return jsonify(result=result, tokens=tokens)
    except Exception as e:
        return jsonify(result=f"Error: {e}", tokens=[])

if __name__ == "__main__":
    app.run(debug=True)
