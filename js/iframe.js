const buscarProdutoButton = document.querySelector('#tools button:nth-child(1)');
const cadastrarProdutoButton = document.querySelector('#tools button:nth-child(2)');
const buscarUsuarioButton = document.querySelector('#settings button:nth-child(1)');
const cadastrarUsuarioButton = document.querySelector('#settings button:nth-child(2)');

const iframe = document.querySelector('iframe');

const urls = {
  'buscarProduto': 'index.html',
  'cadastrarProduto': 'cadastroProduto.html',
  'buscarUsuario': 'index.html',
  'cadastrarUsuario': 'cadastroFuncionario.html'
};

function changeIframe(url) {
  iframe.src = url;
}

buscarProdutoButton.addEventListener('click', () => {
  changeIframe(urls.buscarProduto);
});

cadastrarProdutoButton.addEventListener('click', () => {
  changeIframe(urls.cadastrarProduto);
});

buscarUsuarioButton.addEventListener('click', () => {
  changeIframe(urls.buscarUsuario);
});

cadastrarUsuarioButton.addEventListener('click', () => {
  changeIframe(urls.cadastrarUsuario);
});