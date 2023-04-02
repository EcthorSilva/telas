// Seleciona o ID formulário e o campo de email
const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const alertas = document.getElementById('alertas');

// Adiciona um evento ao formulário para quando for enviado
form.addEventListener('submit', function(event) {
    // Verifica se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão Regular
    if (!emailRegex.test(emailInput.value)) {
        // Se o email não for válido ele impede o envio do formulário e exibe uma mensagem
        event.preventDefault();
        // Mostra a mensagem de erro
        alertas.style.display = 'flex';
    }
});
// Tira a mensagem de erro caso clique no campo email
emailInput.addEventListener('click', function() {
    alertas.style.display = 'none';
});