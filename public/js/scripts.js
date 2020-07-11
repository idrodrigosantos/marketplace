const Mask = {
    apply(input, func) {
        setTimeout(function () {
            input.value = Mask[func](input.value);
        }, 1);
    },
    // Validação do campo valor para aceitar apenas números
    formatBRL(value) {
        // Aceita apenas números
        value = value.replace(/\D/g, '');

        // Adiciona R$
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);
    }
};