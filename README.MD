## sustem-file-api

# tecnologias
nodeTS
typeORM
Express
jest 

# OBJETIVO 
O objetivo desse projeto é desenvolver uma aplicação utilizando que consiga ler um arquivo xls, retornar os dados na request e passar ele para a base de dados(selecionei mysql).


# Estrutura da api 

````

project-root
├── .vscode
├── coverage
├── node_modules
├── src
│ ├── controllers
│ ├── entities
│ ├── helpers
│ ├── migrations
│ ├── repositories
│ ├── routes
│ ├── services
│ ├── tests
│ ├── dataSource.ts
│ ├── index.ts
│ ├── startDatabase.ts
│ └── uploads
├── .env
├── .gitignore
├── example.env
├── jest.config.js
├── nodemon.json
├── ormconfig.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
````
# Primeiros passos para rodar 
npm 
 ``` npm install ```

# Iniciando em DEV 
 ``` npm start```

# ENV

``` As envs do projeto estão são nomeadas por .env e estão em example.env```


# BUILD
Para rodar o build é necessário rodar o seguinte comando:
``` npm run build ```

# Executando o build
``` npm run build:start ```


# Executando as migrations

``` npm run migrate```