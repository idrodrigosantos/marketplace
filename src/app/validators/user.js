const User = require('../models/User');

// Para descriptografar a senha
const { compare } = require('bcryptjs');

// Verifica se todos os campos estão preenchidos
function checkAllFields(body) {
    const keys = Object.keys(body);

    for (key of keys) {
        if (body[key] == '') {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos.'
            };
        }
    }
}

async function show(req, res, next) {
    const { userId: id } = req.session;

    const user = await User.findOne({ where: { id } });

    // Se não tiver usuário
    if (!user) {
        return res.render('user/register', {
            error: 'Usuário não encontrado.'
        });
    }

    req.user = user;

    next();
}

async function post(req, res, next) {
    // Verifica se todos os campos estão preenchidos
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) {
        return req.render('user/register', fillAllFields);
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

async function update(req, res, next) {
    // Verifica se todos os campos estão preenchidos
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) {
        return req.render('user/index', fillAllFields);
    }

    const { id, password } = req.body;

    if (!password) {
        return res.render('user/index', {
            user: req.body,
            error: 'Coloque sua senha para atualizar seu cadastro.'
        });
    }

    const user = await User.findOne({ where: { id } });

    // Para descriptografar a senha
    const passed = await compare(password, user.password);

    if (!passed) {
        return res.render('user/index', {
            user: req.body,
            error: 'Senha incorreta.'
        });
    }

    req.user = user;

    next();
}

module.exports = {
    post,
    show,
    update
};