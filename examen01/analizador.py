import ply.lex as lex
from flask import Flask,  request, render_template


app = Flask(__name__)
#reservadas
reserved = {

    #ELEMENTOS DEL EXAMEN
    'public':'PUBLIC',
    'void':'VOID',
    'int':'INT',
    'static':'STATIC',
    'int':'INT'
}


#delimitadores
delimiters={
    '(':'PARENTESIS_ABIERTO',
    ')':'PARENTESIS_CERRADO',
    '{':'CORCHETE_ABIERTO',
    '}':'CORCHETE_CERRADO'
}

#simbolos
symbols={
    '.':'PUNTO',
    '=':'IGUAL',
    ';':'PUNTOYCOMA'
}

#nuevo tokens reservados
t_PUBLIC= r'public'
t_VOID= r'void'
t_INT=r'int'
t_STATIC=r'static'



#delimitadores
t_PARENTESIS_ABIERTO=r'\('
t_PARENTESIS_CERRADO=r'\)'
t_CORCHETE_ABIERTO=r'\{'
t_CORCHETE_CERRADO=r'\}'

#Simbolos
t_PUNTO=r'\.'
t_IGUAL=r'\='
t_PUNTOYCOMA=r'\;'

#otros
t_ignore = ' \t\r'

#no en lista
t_IDENTIFICADOR = r'(?!public|void|int|static)[a-zA-Z]+[a-zA-Z0-9]*'
t_NUMERO= r'[0-9]+'
#t_PCERRADO = r'\)'


tokens =list(reserved.values())+list (delimiters.values())+list (symbols.values())+['NUMERO','IDENTIFICADOR']



def t_newline(t): #función para que lineno nos detecte el salto de linea
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t): 
    print('Caracter no valido',t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

@app.route('/', methods = ['GET','POST'])

def index():
    lexer.lineno = 1
    if request.method == 'POST':
        code = request.form.get('code', '')
        lexer.input(code)

        tokens = []
        while True:
            token = lexer.token()
            if not token:
                break
            token_description = f"Reservada {token.type.capitalize()}" if token.type in reserved.values() else \
                                f"Delimitador {token.type.capitalize()}" if token.type in delimiters.values() else \
                                f"SIMBOLO {token.type.capitalize()}" if token.type in symbols.values() else \
                                f"IDENTIFICADOR" if token.type == "IDENTIFICADOR" else \
                                f"NUMERO"
            tokens.append((token_description, token.value, token.lineno))

        # Crear un diccionario para contar la frecuencia de cada token
        token_frequencies = {}
        for token in tokens:
            token_type = token[0]
            if token_type in token_frequencies:
                token_frequencies[token_type] += 1
            else:
                token_frequencies[token_type] = 1

        return render_template('index.html', tokens=tokens, token_frequencies=token_frequencies)
    return render_template('index.html', tokens=None, token_frequencies=None)
if __name__ == "__main__":
    app.run(debug=True)
