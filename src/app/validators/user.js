const User = require('../models/User');

async function post(req, res, next) {
    // Verifica se todos os campos estão preenchidos
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == '') {
            return res.render('user/register', {
                user: req.body,
                error: 'Por favor, preencha todos os campos.'
            });
        }
    }

    // Verifica se o usuário existe (email e cpf_cnpj)
    let { email, cpf_cnpj, password, passwordRepeat } = req.body;

    // Transforma o cpf_cnpj de string para int
    cpf_cnpj = cpf_cnpj.replace(/\D/g, '');

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    });

    if (user) {
        return res.render('user/register', {
            user: req.body,
            error: 'Usuário existente.'
        });
    }

    // Verifica se a senha corresponde
    if (password != passwordRepeat) {
        return res.render('user/register', {
            user: req.body,
            error: 'Senhas não correspondem.'
        });
    }

    next();
}

module.exports = {
    post
}