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
    }
};