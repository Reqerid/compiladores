#analizador léxico que además escribe el número de linea. GABRIEL HASSAN BRUNO SANCHEZ 6M COMPILADORES
import re

# 1. Definicion de tokens
token_patterns = [
    ('NUMERO', r'\d+'),                      # Número entero
    ('IDENTIFICADOR', r'[A-Za-z]\w*'),       # Identificador
    ('SUMA', r'\+'),                         # Operador de suma
    ('RESTA', r'-'),                         # Operador de resta
    ('MULTIPLICACION', r'\*'),               # Operador de multiplicación
    ('DIVISION', r'/'),                      # Operador de división
    ('PARENTESIS_IZQ', r'\('),               # Paréntesis izquierdo
    ('PARENTESIS_DER', r'\)'),               # Paréntesis derecho
    ('ESPACIO', r'\s+'),                     # Espacios
    ('SIMBOLO', r'.'),                       # Otros caracteres
]

token_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_patterns)
get_token = re.compile(token_regex).match

def tokenize(code):
    line_number = 1
    line_start = 0
    position = 0
    tokens = []

    while position < len(code):
        match = get_token(code, position)
        if not match:
            raise RuntimeError(f'Error de Análisis en posición {position}')

        for name, value in match.groupdict().items():
            if value:
                if name != 'ESPACIO':
                    # Agregar la línea de código al token
                    line = code[line_start:code.find('\n', line_start)]
                    tokens.append((name, value, line, line_number))
                break
        position = match.end()

        # Actualizar el número de línea y el inicio de la línea
        if '\n' in code[position-1:position+1]:
            line_number += 1
            line_start = position

    return tokens

code = '''x = 2 + 4 * 
(2 - 8)'''
tokens = tokenize(code)
for token in tokens:
    print(f"Token: {token[0]}, Valor: {token[1]}, Línea: {token[2]}, Número de línea: {token[3]}")



