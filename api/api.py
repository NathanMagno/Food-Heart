from flask import Flask, jsonify, request
from flask_cors import CORS
import oracledb

 
app = Flask(__name__)
CORS(app, origins=["http://localhost:8081"])
 
 
def get_connection():
    try:
        connection = oracledb.connect('oracleuser@oracle.fiap.com.br:1521/orcl')
        print("Conexão estabelecida com sucesso!")
        return connection
    except oracledb.DatabaseError as e:
        error, = e.args
        print("Erro ao conectar ao banco de dados:", error.message)
        raise e
 
@app.route('/registrar', methods=['POST'])
def registrar_trajeto():
    data = request.json
    id_cliente = data.get('id_cliente')
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    cep = data.get('cep')
 
    try:
        if not nome or not email or not senha or not cep:
            return jsonify({"error": "Campos 'nome', 'email', 'senha' e 'cep' são obrigatórios."}), 400
 
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM USUARIO_FOOD_HEART WHERE id = :id_cliente", id_cliente=id_cliente)
        pessoa = cursor.fetchone()
 
        if not nome:
            return jsonify({"error": "Pessoa não encontrada."}), 404
 
        cursor.execute("""
            INSERT INTO trajetos (id_cliente, nome, email, senha, cep)
            VALUES (:id_cliente, :nome, :email, :senha, :cep)
        """, [id_cliente, nome, email, senha, cep])
 
       
        connection.commit()
        cursor.close()
        connection.close()
 
        response = {
            "mensagem": "Usuario registrado com sucesso",
            "id_cliente": id_cliente,
            "nome": nome,
            "email": email,
            "senha": senha,
            "cep": cep
        }
        return jsonify(response), 201
 
    except Exception as e:
        return jsonify({"error": "Erro ao registrar usuario: " + str(e)}), 500
 
@app.route('/infos/<string:email>', methods=['GET'])
def info_usuario(email):
    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id_cliente, nome, email, senha, cep FROM USUARIO_FOOD_HEART WHERE email = :email", email=email)
        tabela = cursor.fetchone()
        
        if tabela:
            usuario = {
                "id_cliente": tabela[0] if len(tabela) > 0 else None,
                "nome": tabela[1] if len(tabela) > 1 else None,
                "email": tabela[2] if len(tabela) > 2 else None,
                "senha": tabela[3] if len(tabela) > 3 else None,
                "cep": tabela[4] if len(tabela) > 4 else None  
            }
            cursor.close()
            connection.close()
            return jsonify(usuario), 200
        else:
            cursor.close()
            connection.close()
            return jsonify({"error": "Usuário não encontrado."}), 404
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": "Erro ao obter informações do usuário: " + str(e)}), 500

 
@app.route('/auth', methods=['POST'])
def auth_usuario():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')
 
    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT senha FROM USUARIO_FOOD_HEART WHERE email = :email", email=email)
        resultado = cursor.fetchone()
        cursor.close()
        connection.close()
 
        if resultado and resultado[0] == senha:
            return jsonify({"success": True}), 200
        else:
            return jsonify({"success": False}), 401
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
   

   
@app.route('/pessoas/cadastro', methods=['POST'])
def cadastrar_pessoa():
    try:
        connection = get_connection()
        cursor = connection.cursor()
        data = request.json

        nome = data.get("nome")
        email = data.get("email")
        senha = data.get("senha")
        cep = data.get("cep")

        if not (nome and email and senha and cep):
            return jsonify({"error": "Todos os campos são obrigatórios"}), 400

        cursor.execute("SELECT NVL(MAX(id_cliente), 0) + 1 FROM USUARIO_FOOD_HEART")
        novo_id = cursor.fetchone()[0]

        sql = """INSERT INTO USUARIO_FOOD_HEART (id_cliente, nome, email, senha, cep)
                 VALUES (:1, :2, :3, :4, :5)"""

        cursor.execute(sql, (novo_id, nome, email, senha, cep))
        connection.commit()

        return jsonify({
            "message": "Pessoa cadastrada com sucesso",
            "id_cliente": novo_id
        }), 201

    except oracledb.IntegrityError as e:
        error, = e.args
        if "ORA-00001" in error.message and "UQ_EMAIL" in error.message:
            return jsonify({"message": "Já existe um usuário com esse e-mail."}), 400
        return jsonify({"message": "Erro de integridade no banco de dados."}), 400

    except oracledb.DatabaseError as e:
        error, = e.args
        return jsonify({"message": f"Erro ao cadastrar pessoa: {error.message}"}), 500

    finally:
        try:
            cursor.close()
            connection.close()
        except:
            pass


 
@app.route('/pessoas/<int:id_cliente>/alterarSenha', methods=['PUT'])
def alterar_senha(id_cliente):
    try:
        connection = get_connection()
        cursor = connection.cursor()
        
        data = request.json
        senha_atual = data.get("senhaAtual")
        nova_senha = data.get("novaSenha")
 
        if not nova_senha or len(nova_senha) < 8:
            return jsonify({"error": "A nova senha deve ter no mínimo 8 caracteres."}), 400
       
        sql_select = "SELECT senha FROM USUARIO_FOOD_HEART WHERE id_cliente = :id_cliente"
        cursor.execute(sql_select, {"id_cliente": id_cliente})
        result = cursor.fetchone()
 
        if not result:
            return jsonify({"error": "Usuário não encontrado."}), 404
 
        senha_banco = result[0].strip()
 
        if senha_banco != senha_atual.strip():
            return jsonify({"error": "Senha atual incorreta."}), 401
 
        sql_update = "UPDATE USUARIO_FOOD_HEART SET senha = :nova_senha WHERE id_cliente = :id_cliente"
        cursor.execute(sql_update, {"nova_senha": nova_senha, "id_cliente": id_cliente})
        connection.commit()
        cursor.close()
        connection.close()
 
        return jsonify({"message": "Senha alterada com sucesso."}), 200
 
    except oracledb.DatabaseError as e:
        error, = e.args
        return jsonify({"error": f"Erro no banco de dados: {error.message}"}), 500

   
@app.route('/pessoas/<int:id_cliente>', methods=['DELETE'])
def excluir_conta(id_cliente):
    try:
        connection = get_connection()
        cursor = connection.cursor()
 
        sql_excluir_pessoa = "DELETE FROM USUARIO_FOOD_HEART WHERE id_cliente = :1"
 
        connection.autocommit = False
 
 
        # Excluir a conta da pessoa
        cursor.execute(sql_excluir_pessoa, (id_cliente,))
        pessoa_excluida = cursor.rowcount
 
        if pessoa_excluida > 0:
            connection.commit()
            print(f"Conta excluída com sucesso para o ID da pessoa: {id_cliente}")
            return jsonify({"message": "Conta excluída com sucesso."}), 200
        else:
            connection.rollback()
            print(f"Usuário com ID {id_cliente} não encontrado.")
            return jsonify({"error": "Usuário não encontrado."}), 404
    except oracledb.DatabaseError as e:
        error, = e.args
        connection.rollback()
        print(f"Erro ao excluir a conta do ID {id_cliente}: {error.message}")
        return jsonify({"error": f"Erro no banco de dados: {error.message}"}), 500

 
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


 
if __name__ == "__main__":
     app.run(host="0.0.0.0", port=5000, debug=True)

 