# Marketplace
Sistema de marketplace.

## Softwares necessários

* Editor de código-fonte
* Node.js
* PostgreSQL
* Git

## Instalação

```bash
# Clone o repositório
$ git clone https://github.com/imsantosrodrigo/marketplace.git

# Acesse o diretório
$ cd marketplace

# Instale as dependências
$ npm install
```

## Criação do banco de dados
No PostgreSQL execute o arquivo `marketplace.sql` em `database/marketplace.sql` para criar o banco de dados e tabelas.

Acesse o arquivo `db.js` em `src/config/db.js` e configure o usuário e senha de conexão com o PostgreSQL.

```js
module.exports = new Pool({
    // user: 'Usuário PostgreSQL',
    // password: 'Senha PostgreSQL',    
    host: 'localhost',
    port: 5432,
    database: 'marketplace'
});
```

## Executando o sistema

```bash
# Inicie o servidor
$ npm start
```

## Tecnologias

* HTML
* CSS
* JavaScript
* Node.js
* PostgreSQL

## Dependências

* [Express](https://github.com/expressjs/express)
* [method-override](https://github.com/expressjs/method-override)
* [Multer](https://github.com/expressjs/multer)
* [Nunjucks](https://github.com/mozilla/nunjucks)
* [node-postgres](https://github.com/brianc/node-postgres)

## Dependências de desenvolvimento

* [Browsersync](https://github.com/BrowserSync/browser-sync)
* [Nodemon](https://github.com/remy/nodemon)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)
