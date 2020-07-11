// Confirmação para deletar
const formDelete = document.querySelector('#form-delete');
formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm('Deseja Deletar?');
    if (!confirmation) {
        // Se não tiver confirmação, cancela a ação
        event.preventDefault();
    }
});