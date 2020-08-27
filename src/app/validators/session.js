const User = require('../models/User');

// Para descriptografar a senha
const { compare } = require('bcryptjs');

async function login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Se não tiver usuário
    if (!user) {
        return res.render('session/login', {
            user: req.body,
            error: 'Usuário não cadastrado.'
        });
    }

    // Para descriptografar a senha
    const passed = await compare(password, user.password);

    if (!passed) {
        return res.render('session/login', {
            user: req.body,
            error: 'Senha incorreta.'
        });
    }

    req.user = user;

    next();
}

async function forgot(req, res, next) {
    const { email } = req.body;

    try {
        let user = await User.findOne({ where: { email } });

        // Se não tiver usuário
        if (!user) {
            return res.render('session/forgot-password', {
                user: req.body,
                error: 'E-mail não cadastrado.'
            });
        }

        req.user = user;

        next();
    } catch (err) {
        console.error(err);
    }
}

async function reset(req, res, next) {
    // Procura usuário
    const { email, password, passwordRepeat, token } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Usuário não cadastrado.'
        });
    }

    // Verifica se a senha corresponde
    if (password != passwordRepeat) {
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Senhas não correspondem.'
        });
    }

    // Verifica se o token corresponde
    if (token != user.reset_token) {
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Token inválido. Solicite uma nova recuperação de senha.'
        });
    }

    // Verifica se o token não expirou
    let now = new Date();
    now = now.setHours(now.getHours());

    if (now > user.reset_token_expires) {
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Token expirado. Por favor, solicite uma nova recuperação de senha.'
        });
    }

    req.user = user;
    next();
}

module.exports = {
    login,
    forgot,
    reset
};