import ply.lex as lex
from flask import Flask, render_template, request

app = Flask(__name__)

reserved = {
    'for' : 'FOR',
    'while' : 'WHILE',
    'do':'DO',
    'if':'IF',
    'else':'ELSE'
}

tokens = ['PABIERTO','PCERRADO'] + list(reserved.values())

t_FOR = r'for'
t_WHILE = r'while'
t_DO=r'do'
t_IF=r'if'
t_ELSE=r'else'


t_ignore = ' \t\r'

t_PABIERTO = r'\('
t_PCERRADO = r'\)'

def t_newline(t): #función para que lineno nos detecte el salto de linea
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t): 
    print('Caracter no valido',t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

@app.route('/', methods = ['GET','POST'])

def index():
    lexer.lineno=1 #reinicia el contador de lineno cada vez que ingresamos un nuevo código.
    if request.method == 'POST':
        code = request.form.get('code','')
        lexer.input(code)
 
        result_lexema = [
            (f"Reservada {token.type.capitalize()}" if token.type in reserved.values() 
            else "Parentesis de apertura" if token.type == "PABIERTO" 
            else "Parentesis de cierre", token.value, token.lineno) #se agregó token lineno
            for token in lexer
        ]
        return render_template('index.html', tokens=result_lexema)
    return render_template('index.html', tokens=None)
 
if __name__ == "__main__":
    app.run(debug=True)
