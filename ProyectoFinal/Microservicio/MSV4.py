import ply.lex as lex
import ply.yacc as yacc
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Definir los tokens para el análisis léxico
tokens = (
    'SELECT', 'INSERT', 'INTO', 'DELETE', 'UPDATE', 'CREATE', 'TABLE', 'DROP', 'ALTER',
    'TRUNCATE', 'SHOW', 'TABLES', 'DESCRIBE', 'FROM', 'WHERE', 'SET', 'VALUES',
    'ID', 'NUMBER', 'STRING', 'COMMA', 'LPAREN', 'RPAREN', 'SEMICOLON', 'STAR',
    'EQUALS', 'ADD', 'MODIFY', 'COLUMN', 'INT', 'VARCHAR', 'AUTO_INCREMENT', 'PRIMARY', 'KEY',
    'USE', 'DATABASE'
)

t_SELECT = r'SELECT'
t_INSERT = r'INSERT'
t_INTO = r'INTO'
t_DELETE = r'DELETE'
t_UPDATE = r'UPDATE'
t_CREATE = r'CREATE'
t_TABLE = r'TABLE'
t_DROP = r'DROP'
t_ALTER = r'ALTER'
t_TRUNCATE = r'TRUNCATE'
t_SHOW = r'SHOW'
t_TABLES = r'TABLES'
t_DESCRIBE = r'DESCRIBE'
t_FROM = r'FROM'
t_WHERE = r'WHERE'
t_SET = r'SET'
t_VALUES = r'VALUES'
t_COMMA = r','
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_SEMICOLON = r';'
t_STAR = r'\*'
t_EQUALS = r'='
t_ADD = r'ADD'
t_MODIFY = r'MODIFY'
t_COLUMN = r'COLUMN'
t_INT = r'INT'
t_VARCHAR = r'VARCHAR'
t_AUTO_INCREMENT = r'AUTO_INCREMENT'
t_PRIMARY = r'PRIMARY'
t_KEY = r'KEY'
t_USE = r'USE'
t_DATABASE = r'DATABASE'

def t_ID(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    t.type = reserved.get(t.value.upper(), 'ID')
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

def t_STRING(t):
    r"'[^']*'"
    t.value = t.value[1:-1]
    return t

t_ignore = ' \t\n'

def t_error(t):
    print(f"Carácter ilegal '{t.value[0]}'")
    t.lexer.skip(1)

reserved = {token: token for token in tokens if token.isupper() and token != 'ID'}

lexer = lex.lex()

# Analizador sintáctico
def p_statement(p):
    '''statement : select_statement
                 | insert_statement
                 | delete_statement
                 | update_statement
                 | create_table_statement
                 | create_database_statement
                 | drop_table_statement
                 | drop_database_statement
                 | alter_table_statement
                 | truncate_statement
                 | show_tables_statement
                 | describe_statement
                 | use_statement'''  
    p[0] = f"Sentencia válida: {p[1]}"

def p_select_statement(p):
    '''select_statement : SELECT column_list FROM ID where_clause SEMICOLON
                        | SELECT STAR FROM ID where_clause SEMICOLON'''
    p[0] = f"SELECT statement: {' '.join(str(x) for x in p[1:])}"

def p_insert_statement(p):
    '''insert_statement : INSERT INTO ID LPAREN column_list RPAREN VALUES LPAREN value_list RPAREN SEMICOLON
                        | INSERT INTO ID VALUES LPAREN value_list RPAREN SEMICOLON'''
    p[0] = f"INSERT statement: {' '.join(str(x) for x in p[1:])}"

def p_delete_statement(p):
    '''delete_statement : DELETE FROM ID where_clause SEMICOLON'''
    p[0] = f"DELETE statement: {' '.join(str(x) for x in p[1:])}"

def p_update_statement(p):
    '''update_statement : UPDATE ID SET update_list where_clause SEMICOLON'''
    p[0] = f"UPDATE statement: {' '.join(str(x) for x in p[1:])}"

def p_create_database_statement(p):
    '''create_database_statement : CREATE DATABASE ID SEMICOLON'''
    p[0] = f"CREATE DATABASE statement: {' '.join(str(x) for x in p[1:])}"

def p_create_table_statement(p):
    '''create_table_statement : CREATE TABLE ID LPAREN column_definitions RPAREN SEMICOLON'''
    p[0] = f"CREATE TABLE statement: {' '.join(str(x) for x in p[1:])}"

def p_drop_table_statement(p):
    '''drop_table_statement : DROP TABLE ID SEMICOLON'''
    p[0] = f"DROP TABLE statement: {' '.join(str(x) for x in p[1:])}"

def p_drop_database_statement(p):
    '''drop_database_statement : DROP DATABASE ID SEMICOLON'''
    p[0] = f"DROP DATABASE statement: {' '.join(str(x) for x in p[1:])}"

def p_alter_table_statement(p):
    '''alter_table_statement : ALTER TABLE ID ADD COLUMN column_definition SEMICOLON
                             | ALTER TABLE ID MODIFY COLUMN column_definition SEMICOLON'''
    p[0] = f"ALTER TABLE statement: {' '.join(str(x) for x in p[1:])}"

def p_truncate_statement(p):
    '''truncate_statement : TRUNCATE TABLE ID SEMICOLON'''
    p[0] = f"TRUNCATE statement: {' '.join(str(x) for x in p[1:])}"

def p_show_tables_statement(p):
    '''show_tables_statement : SHOW TABLES SEMICOLON'''
    p[0] = f"SHOW TABLES statement: {' '.join(str(x) for x in p[1:])}"

def p_describe_statement(p):
    '''describe_statement : DESCRIBE ID SEMICOLON'''
    p[0] = f"DESCRIBE statement: {' '.join(str(x) for x in p[1:])}"

def p_use_statement(p):
    '''use_statement : USE ID SEMICOLON'''
    p[0] = f"USE statement: {' '.join(str(x) for x in p[1:])}"

def p_column_list(p):
    '''column_list : ID
                   | column_list COMMA ID'''
    p[0] = [p[1]] if len(p) == 2 else p[1] + [p[3]]

def p_value_list(p):
    '''value_list : value
                  | value_list COMMA value'''
    p[0] = [p[1]] if len(p) == 2 else p[1] + [p[3]]

def p_value(p):
    '''value : NUMBER
             | STRING
             | ID'''
    p[0] = p[1]

def p_where_clause(p):
    '''where_clause : WHERE condition
                    | '''
    p[0] = p[1] if len(p) > 1 else ''

def p_condition(p):
    '''condition : ID EQUALS value'''
    p[0] = f"{p[1]} {p[2]} {p[3]}"

def p_update_list(p):
    '''update_list : ID EQUALS value
                   | update_list COMMA ID EQUALS value'''
    p[0] = f"{p[1]} = {p[3]}" if len(p) == 4 else f"{p[1]}, {p[3]} = {p[5]}"

def p_column_definitions(p):
    '''column_definitions : column_definition
                          | column_definitions COMMA column_definition'''
    p[0] = p[1] if len(p) == 2 else f"{p[1]}, {p[3]}"

def p_column_definition(p):
    '''column_definition : ID data_type
                         | ID data_type column_constraints
                         | ID VARCHAR LPAREN NUMBER RPAREN
                         | ID VARCHAR LPAREN NUMBER RPAREN column_constraints'''
    if len(p) == 3:
        p[0] = f"{p[1]} {p[2]}"
    elif len(p) == 4:
        p[0] = f"{p[1]} {p[2]} {p[3]}"
    elif len(p) == 6:
        p[0] = f"{p[1]} {p[2]}({p[4]})"
    else:
        p[0] = f"{p[1]} {p[2]}({p[4]}) {p[6]}"

def p_data_type(p):
    '''data_type : INT
                 | VARCHAR'''
    p[0] = p[1]

def p_column_constraints(p):
    '''column_constraints : column_constraint
                          | column_constraints column_constraint'''
    p[0] = p[1] if len(p) == 2 else f"{p[1]} {p[2]}"

def p_column_constraint(p):
    '''column_constraint : AUTO_INCREMENT
                         | PRIMARY KEY'''
    p[0] = ' '.join(p[1:])

def p_error(p):
    if p:
        error_message = f"Error de sintaxis en '{p.value}' en la posición {p.lexpos} (línea {p.lineno})"
        print(error_message)
        raise SyntaxError(error_message)
    else:
        print("Error de sintaxis en EOF")
        raise SyntaxError("Error de sintaxis en EOF")

parser = yacc.yacc()

# Función para realizar el análisis léxico
def lex_analysis(sql):
    lexer.input(sql)
    tokens = []
    while True:
        tok = lexer.token()
        if not tok:
            break
        tokens.append(tok)
    return tokens

# Función para analizar el SQL y devolver los resultados
def parse_sql(sql):
    # Análisis léxico
    tokens = lex_analysis(sql)
    
    try:
        # Análisis sintáctico
        result = parser.parse(sql)
    except SyntaxError as e:
        result = None
        error_message = str(e)
    
    # Devolver los resultados
    return {
        'result': result,
        'tokens': [{'value': tok.value, 'type': tok.type, 'lineno': tok.lineno, 'lexpos': tok.lexpos} for tok in tokens],
        'error': error_message if result is None else None
    }

# Ruta de Flask para procesar consultas SQL
@app.route('/analyze_sql', methods=['POST'])
def analyze_sql():
    data = request.get_json()
    
    if not data or 'sql' not in data:
        return jsonify({'error': 'No se proporcionó consulta SQL'}), 400

    sql = data['sql']
    result = parse_sql(sql)
    
    if result['result'] is None:
        return jsonify({'error': result['error'], 'tokens': result['tokens']}), 400

    return jsonify({'result': result['result'], 'tokens': result['tokens']}), 200

# Iniciar la aplicación Flask
if __name__ == "__main__":
    app.run(debug=True)
