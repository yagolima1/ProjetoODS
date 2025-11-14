# ♻️ Projeto ODS 12: API e Front-end de Gerenciamento de Resíduos

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📌 Descrição do Projeto

Este é um projeto extensionista **Full Stack** (Back-end e Front-end) desenvolvido para as Aulas 7 e 8 da disciplina de **Web Mobile** do curso de Análise e Desenvolvimento de Sistemas da **Universidade Presbiteriana Mackenzie (EAD)**.

O objetivo é aplicar os conhecimentos da disciplina para criar uma solução prática alinhada a um Objetivo de Desenvolvimento Sustentável (ODS) da ONU.

A aplicação é composta por:
1.  **Back-end (API):** Construído com **NestJS** e **MongoDB**, responsável por toda a lógica de negócio e persistência dos dados.
2.  **Front-end (Site):** Construído com **HTML, CSS e JavaScript**, que consome a API para fornecer uma interface gráfica ao usuário.

A solução permite registrar e consultar dados sobre o descarte de resíduos, alinhando-se diretamente ao **ODS 12: "Consumo e Produção Responsáveis"**.

## 🚀 Tecnologias Utilizadas

* **Back-end:**
    * **[NestJS](https://nestjs.com/):** Framework Node.js para construir a API.
    * **[MongoDB](https://www.mongodb.com/):** Banco de dados NoSQL para armazenar os dados.
    * **[Mongoose](https://mongoosejs.com/):** Biblioteca ODM para modelagem dos dados.
* **Front-end:**
    * **HTML5:** Para a estrutura do site.
    * **CSS3:** Para a estilização.
    * **JavaScript (ES6+):** Para a lógica do cliente e chamadas de API (via `XMLHttpRequest`).
* **Teste de API:**
    * **[Postman](https://www.postman.com/):** Utilizado para testar e validar os endpoints do back-end.

## 📊 Funcionalidades

A aplicação implementa um CRUD completo e um painel de estatísticas, divididos em 4 telas principais no front-end:

### 1. Tela de Cadastro de Ponto de Descarte
* Permite cadastrar um novo ponto de descarte (nome, bairro, tipo, categorias, geolocalização).
* Lista os pontos já cadastrados na mesma tela.
* **API (Back-end):** `POST /pontos` e `GET /pontos`.

### 2. Tela de Registro de Descarte
* Permite registrar um novo descarte (nome do usuário, data, tipo de resíduo).
* Carrega dinamicamente os pontos de descarte cadastrados em um menu suspenso (`<select>`).
* **API (Back-end):** `POST /registros` (e `GET /pontos` para preencher o select).

### 3. Tela de Consulta de Histórico
* Permite ao usuário filtrar o histórico de descartes por usuário, tipo de resíduo ou ponto de descarte.
* Exibe os resultados em uma tabela.
* **API (Back-end):** `GET /registros` (utilizando *query params* para os filtros).

### 4. Tela de Relatório
* Exibe um dashboard público com estatísticas geradas pelo back-end.
* **API (Back-end):** `GET /relatorio`, que retorna dados como:
    * Local de descarte com mais registros.
    * Tipo de resíduo mais frequente.
    * Média de descartes por dia (últimos 30 dias).
    * Total de usuários e pontos cadastrados.
    * Percentual de crescimento mensal.

## ⚙️ Como Executar (Localmente)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/yagolima1/ProjetoODS
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    * Este projeto usa o **MongoDB Atlas**. Você precisará criar um cluster gratuito e obter sua **String de Conexão**.
    * Configure o **Network Access** no MongoDB Atlas para `0.0.0.0/0` (Permitir acesso de qualquer lugar) para que o servidor local possa se conectar.
    * Abra o arquivo `src/app.module.ts`.
    * Substitua a string de conexão no `MongooseModule.forRoot(coloca a sua string aqui)` pela sua.

4.  **Inicie o servidor (Back-end e Front-end):**
    ```bash
    npm run start:dev
    ```

5.  **Acesse a Aplicação:**
    * Abra seu navegador e acesse: `http://localhost:3000`
    * O servidor NestJS servirá o `index.html` e você poderá usar o site completo!

## 🛠️ Referência da API (Testes via Postman)

Caso queira testar o back-end separadamente:

---

#### 1. Cadastrar um novo Ponto de Descarte
`POST /pontos`

**Body (raw/JSON):**
```json
{
  "nomeDoLocal": "Parque Ibirapuera (Portão 10)",
  "bairro": "Vila Mariana",
  "tipoDeLocal": "público",
  "categoriaDosResiduosAceitos": ["orgânico", "plástico", "vidro"],
  "geolocalizacao": {
   "lat": -23.5882,
   "lon": -46.6578
  }
}
````

**Resposta (201 Created):**

```json
{
   "nomeDoLocal": "Parque Ibirapuera (Portão 10)",
   "bairro": "Vila Mariana",
   "tipoDeLocal": "público",
   "categoriaDosResiduosAceitos": [
    "orgânico",
    "plástico",
    "vidro"
  ],
   "geolocalizacao": {
    "lat": -23.5882,
    "lon": -46.6578
  },
  "_id": "673673e4b7c8e9a2b160c1d1",
  "__v": 0
}
```

-----

#### 2\. Registrar um Descarte

`POST /registros`

**Body (raw/JSON):**

```json
{
  "nomeDoUsuario": "Yago Gonçalves",
  "idDoPontoDeDescarte": "673673e4b7c8e9a2b160c1d1",
  "tipoDeResiduo": "plástico",
  "data": "2025-11-13T21:45:00.000Z" 
}
```

**Resposta (201 Created):**

```json
{
  "nomeDoUsuario": "Yago Gonçalves",
  "idDoPontoDeDescarte": "673673e4b7c8e9a2b160c1d1",
  "tipoDeResiduo": "plástico",
  "data": "2025-11-13T21:45:00.000Z",
  "_id": "673673ffb7c8e9a2b160c1d5",
  "__v": 0
}
```

-----

#### 3\. Consultar Histórico (com filtro)

`GET /registros?tipoDeResiduo=plástico`

**Resposta (200 OK):**

```json
[
  {
    "_id": "673673ffb7c8e9a2b160c1d5",
    "nomeDoUsuario": "Yago Gonçalves",
    "idDoPontoDeDescarte": "673673e4b7c8e9a2b160c1d1",
    "tipoDeResiduo": "plástico",
    "data": "2025-11-13T21:45:00.000Z",
    "__v": 0
  }
]
```

-----

#### 4\. Obter Relatório Estatístico

`GET /relatorio`

**Resposta (200 OK):**

```json
{
  "totalPontosDeDescarte": 1,
  "totalUsuariosNoSistema": 1,
  "localComMaiorNumeroDeRegistros": "Parque Ibirapuera (Portão 10)",
  "tipoDeResiduoMaisFrequente": "plástico",
  "mediaDescartesPorDiaUltimos30Dias": 0.03333333333333333,
  "percentualCrescimentoUltimoMes": "Não há dados do mês anterior para comparar"
}
```

## 👨‍💻 Autor

Desenvolvido por **Yago Gonçalves** como atividade acadêmica para a disciplina de Web Mobile (Prof. Alcides Teixeira Barboza Junior), do curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade Presbiteriana Mackenzie.
