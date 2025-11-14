# ♻️ Projeto ODS 12: API de Gerenciamento de Resíduos

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## 📌 Descrição do Projeto

Este é um projeto extensionista desenvolvido para a disciplina de **Web Mobile** do curso de Análise e Desenvolvimento de Sistemas da **Universidade Presbiteriana Mackenzie (EAD)**.

O objetivo é aplicar os conhecimentos de back-end (NestJS) e banco de dados (MongoDB) para criar uma solução prática alinhada a um Objetivo de Desenvolvimento Sustentável (ODS) da ONU.

A API desenvolvida permite registrar e consultar dados sobre o descarte de resíduos, alinhando-se diretamente ao **ODS 12: "Consumo e Produção Responsáveis"**, contribuindo para a conscientização ambiental e o uso responsável dos espaços públicos.

## 🚀 Tecnologias Utilizadas

* **[NestJS](https://nestjs.com/):** Um framework Node.js progressivo para construir aplicações de servidor eficientes e escaláveis.
* **[MongoDB](https://www.mongodb.com/):** Um banco de dados NoSQL orientado a documentos, utilizado para armazenar os dados.
* **[Mongoose](https://mongoosejs.com/):** Uma biblioteca de modelagem de dados (ODM) para o MongoDB e Node.js.
* **[TypeScript](https://www.typescriptlang.org/):** Um superset do JavaScript que adiciona tipagem estática.
* **[Postman](https://www.postman.com/):** Utilizado para testar os endpoints da API.

## 📊 Funcionalidades (Endpoints da API)

A API foi estruturada em três módulos principais para gerenciar o sistema de descarte:

### 1. Módulo de Pontos (`/pontos`)
Gerencia o cadastro dos locais de descarte.
* `POST /pontos`: Cadastra um novo ponto de descarte com nome, bairro, tipo (público/privado), categorias de resíduos e geolocalização.
* `GET /pontos`: Lista todos os pontos de descarte cadastrados.

### 2. Módulo de Registros (`/registros`)
Gerencia os descartes realizados pelos usuários.
* `POST /registros`: Registra um novo descarte contendo nome do usuário, ID do ponto, tipo de resíduo e data.
* `GET /registros`: Consulta o histórico de descartes, permitindo filtros por ponto de descarte, tipo de resíduo, data ou nome do usuário.

### 3. Módulo de Relatório (`/relatorio`)
Gera um dashboard público com estatísticas sobre o uso do sistema.
* `GET /relatorio`: Retorna um JSON resumido com dados como:
    * Local de descarte com mais registros.
    * Tipo de resíduo mais descartado.
    * Média de descartes por dia (últimos 30 dias).
    * Número total de usuários no sistema.
    * Total de pontos de descarte cadastrados.
    * Percentual de crescimento comparado ao mês anterior.

## ⚙️ Como Executar (Localmente)

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    cd SEU-REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    * Este projeto usa o MongoDB Atlas. Você precisará criar um cluster gratuito e obter sua **String de Conexão**.
    * Abra o arquivo `src/app.module.ts`.
    * Substitua a string de conexão no `MongooseModule.forRoot('SUA_STRING_DE_CONEXAO_AQUI')` pela sua.

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

5.  A API estará rodando em `http://localhost:3000`.

## 📖 Exemplos de Uso (API Reference)

Use o Postman ou ferramenta similar para interagir com a API:

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
(Use o `_id` do ponto que você acabou de criar)

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
