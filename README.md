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
No PostgreSQL execute o arquivo `marketplace.sql` em `database/` para criar o banco de dados e as tabelas.

Acesse o arquivo `db.js` em `src/config/` e configure o usuário e senha de conexão com o PostgreSQL.
```js
module.exports = new Pool({
    // user: 'Usuário PostgreSQL',
    // password: 'Senha PostgreSQL',    
    host: 'localhost',
    port: 5432,
    database: 'marketplace'
});
```

## Envio de e-mails
Para testar o envio de e-mails é necessário ter uma conta no [Mailtrap](https://mailtrap.io/).

Acesse o arquivo `mailer.js` em `src/lib/` e configure o usuário e senha de conexão com o Mailtrap.
```js
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        // user: "Usuário Mailtrap.io",
        // pass: "Senha Mailtrap.io",
    }
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
* Nunjucks
* Express.js

## Dependências
* [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* [Connect PG Simple](https://github.com/voxpelli/node-connect-pg-simple)
* [Express](https://github.com/expressjs/express)
* [express-session](https://github.com/expressjs/session)
* [method-override](https://github.com/expressjs/method-override)
* [Multer](https://github.com/expressjs/multer)
* [Nodemailer](https://github.com/nodemailer/nodemailer)
* [Nunjucks](https://github.com/mozilla/nunjucks)
* [node-postgres](https://github.com/brianc/node-postgres)

## Dependências de desenvolvimento
* [Browsersync](https://github.com/BrowserSync/browser-sync)
* [Nodemon](https://github.com/remy/nodemon)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)
