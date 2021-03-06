const { formatPrice } = require('./utils');

// Carrinho fica guardado na sessão (req.session)

const Cart = {
    init(oldCart) {
        if (oldCart) {
            this.items = oldCart.items;
            this.total = oldCart.total;
        } else {
            this.items = [];
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this;
    },
    // Adicionar um item ao carrinho
    addOne(product) {
        // Ver se o produto já existe no carrinho
        let inCart = this.getCartItem(product.id);

        // Se o produto não existir
        if (!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart);
        }

        if (inCart.quantity >= product.quantity) {
            return this;
        }

        // Atualiza o item
        inCart.quantity++;
        inCart.price = inCart.product.price * inCart.quantity;
        inCart.formattedPrice = formatPrice(inCart.price);

        // Atualiza o carrinho
        this.total.quantity++;
        this.total.price += inCart.product.price;
        this.total.formattedPrice = formatPrice(this.total.price);

        return this;
    },
    // Remover um item do carrinho
    removeOne(productId) {
        // Selecionar o item do carrinho
        const inCart = this.getCartItem(productId);

        if (!inCart) {
            return this;
        }

        // Atualizar o item
        inCart.quantity--;
        inCart.price = inCart.product.price * inCart.quantity;
        inCart.formattedPrice = formatPrice(inCart.price);

        // Atualiza o carrinho
        this.total.quantity--;
        this.total.price -= inCart.product.price;
        this.total.formattedPrice = formatPrice(this.total.price);

        if (inCart.quantity < 1) {
            this.items = this.items.filter(item => item.product.id != inCart.product.id);
            return this;
        }

        return this;
    },
    // Deletar todo o item
    delete(productId) {
        const inCart = this.getCartItem(productId);

        if (!inCart) {
            return this;
        }

        if (this.items.length > 0) {
            this.total.quantity -= inCart.quantity;
            this.total.price -= (inCart.product.price * inCart.quantity);
            this.total.formattedPrice = formatPrice(this.total.price);
        }

        this.items = this.items.filter(item => inCart.product.id != item.product.id);

        return this;
    },
    getCartItem(productId) {
        return this.items.find(item => item.product.id == productId);
    }
};

module.exports = Cart;