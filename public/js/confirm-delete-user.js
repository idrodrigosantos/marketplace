// Confirmação para deletar
const formDelete = document.querySelector('#form-delete');
formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm('Tem certeza que deseja excluir sua conta? Essa operação não poderá ser desfeita.');
    if (!confirmation) {
        // Se não tiver confirmação, cancela a ação
        event.preventDefault();
    }
});