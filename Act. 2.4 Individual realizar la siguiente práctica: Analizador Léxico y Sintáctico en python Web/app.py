import ply.lex as lex
import ply.yacc as yacc
from flask import Flask, render_template, request

app = Flask(__name__)

# Definición de tokens
tokens = (
    'FOR', 'PARIZQ', 'PARDER', 'LLAVEIZQ', 'LLAVEDER', 'INT',
    'identificador', 'igual', 'numero', 'suma', 'pcoma', 'lessthan',
    'punto', 'cadena'
)

# Definir tokens simples
t_PARIZQ = r'\('
t_PARDER = r'\)'
t_LLAVEIZQ = r'\{'
t_LLAVEDER = r'\}'
t_igual = r'='
t_suma = r'\+'
t_lessthan = r'<='
t_punto = r'\.'
t_pcoma = r';'
t_cadena = r'\".*?\"'
t_identificador = r'[a-zA-Z_][a-zA-Z_0-9]*'
t_numero = r'\d+'

# Definir palabras reservadas
def t_FOR(t):
    r'\bfor\b'
    return t

def t_INT(t):
    r'\bint\b'
    return t

# Manejo de nuevas líneas
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# Manejo de errores
def t_error(t):
    print(f"Token no válido: {t.value[0]}")
    t.lexer.skip(1)

# Ignorar espacios y tabulaciones
t_ignore = ' \t'

# Función para analizar el texto de entrada
def analizar_lexico(data):
    lexer = lex.lex()
    lexer.input(data)
    resultado_lexema = []

    while True:
        tok = lexer.token()
        if not tok:
            break
        resultado_lexema.append((tok.type, tok.value, tok.lineno))
    
    return resultado_lexema


# Variable global para almacenar el resultado sintáctico
resultado_sintactico = ""

# Definir reglas sintácticas para el parser
def p_inicio(p):
    '''inicio : estructura_for'''
    global resultado_sintactico
    resultado_sintactico = "Análisis exitoso del 'for'"

def p_estructura_for(p):
    '''estructura_for : FOR PARIZQ declaracion_inicial pcoma condicion pcoma actualizacion PARDER bloque'''

def p_declaracion_inicial(p):
    '''declaracion_inicial : tipo identificador igual numero'''
    p[0] = ("Declaración inicial", p[2], p[4])

def p_tipo(p):
    '''tipo : INT'''

def p_condicion(p):
    '''condicion : identificador lessthan numero'''
    p[0] = ("Condición", p[1], p[3])

def p_actualizacion(p):
    '''actualizacion : identificador suma suma'''
    p[0] = ("Actualización", p[1])

def p_bloque(p):
    '''bloque : LLAVEIZQ instruccion LLAVEDER'''
    p[0] = "Bloque de código"

def p_instruccion(p):
    '''instruccion : identificador punto identificador punto identificador PARIZQ cadena suma identificador PARDER pcoma'''
    p[0] = "Instrucción de impresión"

def p_error(p):
    global resultado_sintactico
    if p:
        resultado_sintactico = f"Error de sintaxis en '{p.value}' en la línea {p.lineno}"
    else:
        resultado_sintactico = "Error de sintaxis en la entrada"

# Función para analizar sintácticamente
def analizar_sintactico(data):
    global resultado_sintactico
    parser = yacc.yacc()
    parser.parse(data)
    return resultado_sintactico

# Ruta principal de la aplicación Flask
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        code = request.form.get('code', '')

        # Análisis léxico
        resultado_lexico = analizar_lexico(code)

        # Análisis sintáctico
        resultado_sintactico = analizar_sintactico(code)

        return render_template('inicio.html', tokens=resultado_lexico, input=code, sintaxis=resultado_sintactico)
    
    return render_template('inicio.html', tokens=None)

if __name__ == "__main__":
    app.run(debug=True)