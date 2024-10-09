import ply.lex as lex
import ply.yacc as yacc
from flask import Flask, render_template, request

app = Flask(__name__)

# Definición de tokens
tokens = (
    'USING', 'NAMESPACE', 'CLASS', 'STATIC', 'VOID', 'MAIN', 
    'PARIZQ', 'PARDER', 'LLAVEIZQ', 'LLAVEDER', 'PUNTO', 
    'COMILLA', 'CADENA', 'IDENTIFICADOR', 'WRITE_LINE'
)

# Definir tokens simples
t_PARIZQ = r'\('
t_PARDER = r'\)'
t_LLAVEIZQ = r'\{'
t_LLAVEDER = r'\}'
t_PUNTO = r'\.'

# Definir comillas para cadenas
t_COMILLA = r'\"'

# Definir palabras reservadas
def t_USING(t):
    r'\busing\b'
    return t

def t_NAMESPACE(t):
    r'\bnamespace\b'
    return t

def t_CLASS(t):
    r'\bclass\b'
    return t

def t_STATIC(t):
    r'\bstatic\b'
    return t

def t_VOID(t):
    r'\bvoid\b'
    return t

def t_MAIN(t):
    r'\bMain\b'
    return t

def t_WRITE_LINE(t):
    r'WriteLine'
    return t

# Definir identificadores
t_IDENTIFICADOR = r'[a-zA-Z_][a-zA-Z_0-9]*'

# Definir cadenas
t_CADENA = r'\".*?\"'

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
    '''inicio : using_directiva namespace'''
    p[0] = ("Inicio", p[1], p[2])

def p_using_directiva(p):
    '''using_directiva : USING IDENTIFICADOR PUNTO IDENTIFICADOR PUNTO'''
    p[0] = ("Using", p[2], p[4])

def p_namespace(p):
    '''namespace : NAMESPACE IDENTIFICADOR LLAVEIZQ bloque LLAVEDER'''
    p[0] = ("Namespace", p[2])

def p_bloque(p):
    '''bloque : declaracion_clase'''
    p[0] = ("Bloque", p[1])

def p_declaracion_clase(p):
    '''declaracion_clase : CLASS IDENTIFICADOR LLAVEIZQ bloque_main LLAVEDER'''
    p[0] = ("Clase", p[2])

def p_bloque_main(p):
    '''bloque_main : declaracion_main'''
    p[0] = ("Bloque Main", p[1])

def p_declaracion_main(p):
    '''declaracion_main : STATIC VOID MAIN PARIZQ IDENTIFICADOR PARDER bloque_instruccion'''
    p[0] = ("Main", p[6])

def p_bloque_instruccion(p):
    '''bloque_instruccion : LLAVEIZQ instruccion LLAVEDER'''
    p[0] = ("Bloque Instrucción", p[2])

def p_instruccion(p):
    '''instruccion : IDENTIFICADOR PUNTO WRITE_LINE PARIZQ CADENA PARDER PUNTO'''
    p[0] = ("Instrucción", p[5])

def p_error(p):
    global resultado_sintactico
    if p:
        resultado_sintactico = f"Error de sintaxis en '{p.value}' en la línea {p.lineno}"
    else:
        resultado_sintactico = "Error de sintaxis en la entrada"


# Configuración de PLY
yacc.yacc(start='inicio')


# Función para analizar sintácticamente
# Función para analizar sintácticamente
def analizar_sintactico(data):
    global resultado_sintactico
    lexer = lex.lex()
    parser = yacc.yacc()
    lexer.input(data)
    resultado_sintactico = ""
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