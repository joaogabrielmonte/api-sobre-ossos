from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Simula a leitura do DataFrame a partir de um arquivo Excel
df = pd.read_excel('ossos2.0.xlsx')

@app.route('/Ossos')
def obter_ossos():
    Ossos = df.to_dict(orient='records')
    return jsonify(Ossos)

@app.route('/search')
def search():
    try:
        keyword = request.args.get('keyword')

    
        df['Nome'] = df['Nome'].str.lower()

       
        resultado_pesquisa = df[df['Nome'].str.contains(keyword.lower(), case=False, na=False)]

        # Você pode limitar as colunas retornadas se quiser
        resultado_pesquisa = resultado_pesquisa[['Id', 'Nome', 'descricao', 'imagem']]

        # Verifica se há algum resultado
        if resultado_pesquisa.empty:
            return jsonify({"erro": "Nenhum resultado encontrado"}), 404

        resultado_json = resultado_pesquisa.to_dict(orient='records')
        return jsonify(resultado_json)
    except Exception as e:
        # Imprima o erro no console do servidor
        print(f"Erro na pesquisa: {e}")

        # Retorna uma resposta com mensagem de erro mais detalhada
        return jsonify({"erro": f"Erro na pesquisa: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
