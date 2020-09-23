// Importa o pacote
const Cart = require('../../lib/cart');

// Importa o service
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    async index(req, res) {
        try {
            let { cart } = req.session;

            // Gerenciador de carrinho
            cart = Cart.init(cart);

            return res.render('cart/index', { cart });
        } catch (error) {
            console.error(error);
        }
    },
    async addOne(req, res) {
        // Selecionar o id do produto
        const { id } = req.params;

        // Selecionar o produto
        const product = await LoadProductService.load('product', { where: { id } });

        // Selecionar o carrinho da sessão
        let { cart } = req.session;

        // Adicionar o produto ao carrinho (gerenciador de carrinho)
        cart = Cart.init(cart).addOne(product);

        // Atualizar o carrinho da sessão
        req.session.cart = cart;

        // Redirecionar o usuário para a tela do carrinho
        return res.redirect('/cart');
    },
    removeOne(req, res) {
        // Selecionar o id do produto
        const { id } = req.params;

        // Selecionar o carrinho da sessão
        let { cart } = req.session;

        // Se não tive carrinho, retornar
        if (!cart) {
            return res.redirect('/cart');
        }

        // Iniciar o carrinho (gerenciador de carrinho) e remover
        cart = Cart.init(cart).removeOne(id);

        // Atualizar o carrinho da sessão, removendo 1 item
        req.session.cart = cart;

        // Redirecionamento para a página cart
        return res.redirect('/cart');
    },
    delete(req, res) {
        const { id } = req.params;
        let { cart } = req.session;

        if (!cart) {
            return;
        }

        req.session.cart = Cart.init(cart).delete(id);

        return res.redirect('/cart');
    }
};