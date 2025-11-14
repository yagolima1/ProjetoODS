const URL_BASE = "http://localhost:3000";

// Pega a div principal onde vamos carregar as telas
const app = document.getElementById('app');

/**
 * Função para chamar a API
 * @param {string} url - A URL da API
 * @param {string} method - O método HTTP (GET, POST, PATCH, DELETE)
 * @param {function} callback - A função a ser chamada quando a API responder
 * @param {object} [data] - Body da requisição em JSON
 */
function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, `${URL_BASE}${url}`, true); // Concatena a URL base com a rota

    // Se o método for POST, PATCH ou PUT, ele precisa enviar o cabeçalho JSON
    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    }

    xhr.onload = function () {
        // Trata a resposta chamando o callback
        callback(xhr.status, xhr.response);
    };

    // Envia a requisição
    if (data) {
        // Envia os dados (data) como JSON
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

// Tela 1: Cadastro de Ponto de Descarte
const telaCadastroPonto = `
<section id="tela-cadastro-ponto" class="tela">
    <h2>1. Cadastrar Novo Ponto de Descarte</h2>
    <form id="form-cadastro-ponto" onsubmit="cadastrarPonto(event)">
        <div class="form-grupo">
            <label for="ponto-nome">Nome do Local:</label>
            <input type="text" id="ponto-nome" required>
        </div>
        <div class="form-grupo">
            <label for="ponto-bairro">Bairro:</label>
            <input type="text" id="ponto-bairro" required>
        </div>
        <div class="form-grupo">
            <label for="ponto-tipo">Tipo de Local:</label>
            <select id="ponto-tipo" required>
                <option value="">Selecione...</option>
                <option value="público">Público</option>
                <option value="privado">Privado</option>
            </select>
        </div>
        <div class="form-grupo">
            <label>Categorias de Resíduos Aceitos:</label>
            <div class="form-grupo-checkbox">
                <input type="checkbox" id="cat-plastico" value="plástico"> <label for="cat-plastico">Plástico</label>
                <input type="checkbox" id="cat-vidro" value="vidro"> <label for="cat-vidro">Vidro</label>
                <input type="checkbox" id="cat-papel" value="papel"> <label for="cat-papel">Papel</label>
                <input type="checkbox" id="cat-organico" value="orgânico"> <label for="cat-organico">Orgânico</label>
                <input type="checkbox" id="cat-eletronico" value="eletrônico"> <label for="cat-eletronico">Eletrônico</label>
            </div>
        </div>
        <div class="form-grupo">
            <label>Geolocalização:</label>
            <input type="number" id="ponto-lat" placeholder="Latitude" step="any" required>
            <input type="number" id="ponto-lon" placeholder="Longitude" step="any" required>
        </div>
        <button type="submit" class="btn-submit">Cadastrar Ponto</button>
    </form>

    <h2>Pontos já Cadastrados</h2>
    <div id="lista-pontos-cadastrados">
        </div>
</section>
`;

// Tela 2: Registro de Descarte
const telaCadastroDescarte = `
<section id="tela-cadastro-descarte" class="tela">
    <h2>2. Registrar um Novo Descarte</h2>
    <form id="form-cadastro-descarte" onsubmit="cadastrarDescarte(event)">
        <div class="form-grupo">
            <label for="descarte-usuario">Nome do Usuário:</label>
            <input type="text" id="descarte-usuario" required>
        </div>
        <div class="form-grupo">
            <label for="descarte-ponto">Selecione o Ponto de Descarte:</label>
            <select id="descarte-ponto" required>
                <option value="">Carregando pontos...</option>
            </select>
        </div>
        <div class="form-grupo">
            <label for="descarte-tipo-residuo">Tipo de Resíduo:</label>
            <input type="text" id="descarte-tipo-residuo" placeholder="Ex: plástico, vidro, etc." required>
        </div>
        <div class="form-grupo">
            <label for="descarte-data">Data do Descarte:</label>
            <input type="date" id="descarte-data" required>
        </div>
        <button type="submit" class="btn-submit">Registrar Descarte</button>
    </form>
</section>
`;

// Tela 3: Consulta de Histórico
const telaHistorico = `
<section id="tela-historico" class="tela">
    <h2>3. Consultar Histórico de Descartes</h2>
    <form id="form-filtro-historico" onsubmit="buscarHistorico(event)">
        <div class="form-grupo">
            <label for="filtro-usuario">Nome do Usuário:</label>
            <input type="text" id="filtro-usuario">
        </div>
        <div class="form-grupo">
            <label for="filtro-tipo-residuo">Tipo de Resíduo:</label>
            <input type="text" id="filtro-tipo-residuo">
        </div>
        <div class="form-grupo">
            <label for="filtro-ponto">Ponto de Descarte:</label>
            <select id="filtro-ponto">
                <option value="">Todos</option>
            </select>
        </div>
        <button type="submit" class="btn-submit">Buscar Histórico</button>
    </form>
    
    <div id="resultado-historico">
        </div>
</section>
`;

// Tela 4: Relatório
const telaRelatorio = `
<section id="tela-relatorio" class="tela">
    <h2>4. Relatório e Estatísticas</h2>
    <div id="dados-relatorio">
        <p>Carregando dados...</p>
        </div>
</section>
`;

/**
 * Carrega o HTML de uma tela específica dentro da <div id="app">
 * @param {string} idTela - O ID da tela a ser mostrada
 */
function mostrarTela(idTela) {
    switch (idTela) {

        case 'cadastro-ponto':
            app.innerHTML = telaCadastroPonto;
            buscarEExibirPontos();
            break;

        case 'cadastro-descarte':
            app.innerHTML = telaCadastroDescarte;
            preencherSelectPontos('descarte-ponto');
            break;

        case 'historico':
            app.innerHTML = telaHistorico;
            preencherSelectPontos('filtro-ponto');
            break;

        case 'relatorio':
            app.innerHTML = telaRelatorio;
            carregarRelatorio();
            break;
    }
}

window.onload = function() {
    mostrarTela('cadastro-ponto');
};

function cadastrarPonto(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // 1. Coletar categorias de resíduos (checkboxes)
    const categorias = [];
    if (document.getElementById('cat-plastico').checked) categorias.push('plástico');
    if (document.getElementById('cat-vidro').checked) categorias.push('vidro');
    if (document.getElementById('cat-papel').checked) categorias.push('papel');
    if (document.getElementById('cat-organico').checked) categorias.push('orgânico');
    if (document.getElementById('cat-eletronico').checked) categorias.push('eletrônico');

    // 2. Montar o objeto JSON com os dados do formulário [cite: 202-203]
    const pontoData = {
        nomeDoLocal: document.getElementById('ponto-nome').value,
        bairro: document.getElementById('ponto-bairro').value,
        tipoDeLocal: document.getElementById('ponto-tipo').value,
        geolocalizacao: {
            lat: parseFloat(document.getElementById('ponto-lat').value),
            lon: parseFloat(document.getElementById('ponto-lon').value),
        },
        categoriaDosResiduosAceitos: categorias,
    };

    // 3. Chamar a API usando o método POST
    callAPI('/pontos', 'POST', function(status, response) {
        if (status === 201 || status === 200) { // 201 = Created
            alert('Ponto de descarte cadastrado com sucesso!');
            document.getElementById('form-cadastro-ponto').reset(); // Limpa o formulário
            buscarEExibirPontos(); // Atualiza a lista de pontos
        } else {
            alert(`Erro ao cadastrar: ${response.message || 'Tente novamente.'}`);
        }
    }, pontoData);
}

function buscarEExibirPontos() {
    const listaDiv = document.getElementById('lista-pontos-cadastrados');
    if (!listaDiv) return;

    listaDiv.innerHTML = '<p>Carregando pontos...</p>';

    callAPI('/pontos', 'GET', function(status, response) {
        if (status === 200) {
            listaDiv.innerHTML = '';
            if (response.length === 0) {
                listaDiv.innerHTML = '<p>Nenhum ponto de descarte cadastrado.</p>';
                return;
            }

            // Cria um card para cada ponto
            response.forEach(ponto => {
                const card = `
                    <article class="card-ponto">
                        <h3>${ponto.nomeDoLocal}</h3>
                        <p><strong>Bairro:</strong> ${ponto.bairro}</p>
                        <p><strong>Tipo:</strong> ${ponto.tipoDeLocal}</p>
                        <p><strong>Aceita:</strong> ${ponto.categoriaDosResiduosAceitos.join(', ')}</p>
                    </article>
                `;
                listaDiv.innerHTML += card;
            });
        } else {
            listaDiv.innerHTML = '<p>Erro ao carregar os pontos.</p>';
        }
    });
}

/* ==================================================================
 * TELA 2: CADASTRO DE DESCARTE
 * Funções: preencherSelectPontos() e cadastrarDescarte()
 * ================================================================== */

/**
 * Busca os pontos de descarte e preenche um <select> (dropdown).
 * Esta função é chamada ao abrir a tela de "Registrar Descarte" e "Histórico".
 * @param {string} selectId - O ID do <select> a ser preenchido.
 */
function preencherSelectPontos(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return; // Se o select não existir na tela, não faz nada

    // Chama a API para buscar os pontos
    callAPI('/pontos', 'GET', function(status, response) {
        if (status === 200) {
            // Limpa o "Carregando..."
            select.innerHTML = '';
            
            // Adiciona a opção "Selecione..." ou "Todos"
            const defaultOption = document.createElement('option');
            if (selectId === 'filtro-ponto') {
                defaultOption.value = "";
                defaultOption.textContent = "Todos os Pontos";
            } else {
                defaultOption.value = "";
                defaultOption.textContent = "Selecione um ponto...";
            }
            select.appendChild(defaultOption);

            // Adiciona cada ponto como uma <option>
            response.forEach(ponto => {
                const option = document.createElement('option');
                option.value = ponto._id; // O valor será o ID do MongoDB
                option.textContent = `${ponto.nomeDoLocal} (${ponto.bairro})`; // O texto será o Nome
                select.appendChild(option);
            });
        } else {
            select.innerHTML = '<option value="">Erro ao carregar pontos</option>';
        }
    });
}

function cadastrarDescarte(event) {
    event.preventDefault();

    const descarteData = {
        nomeDoUsuario: document.getElementById('descarte-usuario').value,
        idDoPontoDeDescarte: document.getElementById('descarte-ponto').value,
        tipoDeResiduo: document.getElementById('descarte-tipo-residuo').value,
        data: document.getElementById('descarte-data').value,
    };

    callAPI('/registros', 'POST', function(status, response) {
        if (status === 201 || status === 200) {
            alert('Descarte registrado com sucesso!');
            document.getElementById('form-cadastro-descarte').reset(); // Limpa o formulário
        } else {
            alert(`Erro ao registrar: ${response.message || 'Tente novamente.'}`);
        }
    }, descarteData);
}

function buscarHistorico(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('filtro-usuario').value;
    const tipo = document.getElementById('filtro-tipo-residuo').value;
    const pontoId = document.getElementById('filtro-ponto').value;

    let url = '/registros?';
    if (usuario) url += `nomeDoUsuario=${usuario}&`;
    if (tipo) url += `tipoDeResiduo=${tipo}&`;
    if (pontoId) url += `idDoPontoDeDescarte=${pontoId}&`;

    const divResultado = document.getElementById('resultado-historico');
    divResultado.innerHTML = '<p>Buscando histórico...</p>';

    callAPI(url, 'GET', function(status, response) {
        if (status === 200) {
            divResultado.innerHTML = '';
            if (response.length === 0) {
                divResultado.innerHTML = '<p>Nenhum registro encontrado para estes filtros.</p>';
                return;
            }

            let tabela = `
                <table class="tabela-historico">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Tipo de Resíduo</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            response.forEach(registro => {
                tabela += `
                    <tr>
                        <td>${registro.nomeDoUsuario}</td>
                        <td>${registro.tipoDeResiduo}</td>
                        <td>${new Date(registro.data).toLocaleDateString()}</td>
                    </tr>
                `;
            });

            tabela += `</tbody></table>`;
            divResultado.innerHTML = tabela;

        } else {
            divResultado.innerHTML = '<p>Erro ao buscar o histórico.</p>';
        }
    });
}

function carregarRelatorio() {
    const divRelatorio = document.getElementById('dados-relatorio');
    if (!divRelatorio) return;

    divRelatorio.innerHTML = '<p>Carregando dados do relatório...</p>';

    callAPI('/relatorio', 'GET', function(status, response) {
        if (status === 200) {
            divRelatorio.innerHTML = `
                <ul class="lista-relatorio">
                    <li><strong>Total de Pontos Cadastrados:</strong> ${response.totalPontosDeDescarte}</li>
                    <li><strong>Total de Usuários no Sistema:</strong> ${response.totalUsuariosNoSistema}</li>
                    <li><strong>Local com Mais Registros:</strong> ${response.localComMaiorNumeroDeRegistros}</li>
                    <li><strong>Resíduo Mais Frequente:</strong> ${response.tipoDeResiduoMaisFrequente}</li>
                    <li><strong>Média Diária (Últimos 30 dias):</strong> ${response.mediaDescartesPorDiaUltimos30Dias.toFixed(2)}</li>
                    <li><strong>Crescimento Mensal:</strong> ${response.percentualCrescimentoUltimoMes}</li>
                </ul>
            `;
        } else {
            divRelatorio.innerHTML = '<p>Erro ao carregar o relatório.</p>';
        }
    });
}