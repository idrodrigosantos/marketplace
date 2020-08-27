module.exports = {
    date(timestamp) {
        const date = new Date(timestamp);

        // Ano
        const year = date.getFullYear();

        // .slice(-2) pega os dois últimos dígitos de traz para frente
        // Quando for mês 02 pega o 02
        // Quando for mês 010 pega o 10

        // Mês - Mês começa em 0 e vai até 11, por isso o "+ 1"
        const month = `0${date.getMonth() + 1}`.slice(-2);
        // Dia
        const day = `0${date.getDate()}`.slice(-2);

        // Hora
        const hour = date.getHours();
        // Minutos
        const minutes = date.getMinutes();

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100);
    },
    formatCpfCnpj(value) {
        // Limpa o campo
        value = value.replace(/\D/g, '');

        if (value.length > 14) {
            // Se digitar mais de 14 número, tira a última posição
            value = value.slice(0, -1);
        }

        // Checa se é CNPJ - 11.222.333/0001-11
        if (value.length > 11) {
            // 11222333444455
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            // 11.222333444455
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 11.222.333444455
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            // 11.222.333/444455
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            // 11.222.333/4444-55
        } else {
            // Checa se é CPF - 111.222.333-44
            // 11122233344
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 111.22233344
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 111.222.33344
            value = value.replace(/(\d{3})(\d)/, '$1-$2');
            // 111.222.333-44
        }

        return value;
    },
    formatCep(value) {
        // Limpa o campo
        value = value.replace(/\D/g, '');

        if (value.length > 8) {
            // Se digitar mais de 8 número, tira a última posição
            value = value.slice(0, -1);
        }

        // 11111222
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        // 11111-222

        return value;
    }
};