function buscarInformacoesOsso() {
    var keyword = document.getElementById('keyword').value;

    console.log(`Pesquisando por: ${keyword}`);

    // Desabilita o botão durante a pesquisa
    document.querySelector('.button').disabled = true;

    // Limpa o conteúdo anterior
    document.getElementById('resultado').innerHTML = '';

    fetch('http://localhost:5000/search?keyword=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação da API: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);

            var resultadoDiv = document.getElementById('resultado');

            if (data.error) {
                console.error(`Erro ao buscar informações do osso: ${data.error}`);
                resultadoDiv.innerHTML = `Erro ao buscar informações do osso: ${data.error}`;
            } else {
                if (data.length === 0) {
                    resultadoDiv.innerHTML = "Nenhum resultado encontrado.";
                } else {
                    // Exibe os resultados
                    data.forEach(item => {
                        // Cria elementos para exibir os dados da API
                        var elemento = document.createElement('div');
                        elemento.innerHTML = `
                            <p> ${item.Id}</p>
                            <p> ${item.Nome}</p>
                            <p> ${item.descricao}</p>
                            <img src="${item.imagem}" alt="Imagem do osso">
                            <hr>
                        `;

                        // Adiciona o elemento à div de resultados
                        resultadoDiv.appendChild(elemento);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Erro ao buscar informações do osso:', error);
            document.getElementById('resultado').innerHTML = `Erro ao buscar informações do osso: ${error.message}`;
        })
        .finally(() => {
            // Reabilita o botão após a conclusão da pesquisa
            document.querySelector('.button').disabled = false;
        });
}
