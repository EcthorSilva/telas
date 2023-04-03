const modal = document.querySelector('.popup-container');
const tbody = document.querySelector('tbody');
const sCodigoProduto = document.querySelector('#m-codigoProduto');
const sNomeProduto = document.querySelector('#m-nomeProduto');
const sPrecoProduto = document.querySelector('#m-precoProduto');
const sQuantidade = document.querySelector('#m-quantidadeProduto');
const sImagemProduto = document.querySelector('#m-imagemProduto');
const sSituacao = document.querySelector('#m-situacao');
const btnSalvar = document.querySelector('#btnSalvar');

// Variaveis globais
let itens = [];
let id;

// Função para abrir o modal
function openModal(edit = false, index = 0) {
    modal.classList.add('active');
    // Fecha o Modal ao clicar fora dele
    modal.onclick = e => {
        if (e.target.classList.contains('popup-container')) {
            modal.classList.remove('active');
        }
    };

    if (edit) {
        // Preenche os imputs do modal quando estiver editando as informações dos itens
        sCodigoProduto.value = itens[index].Codigo;
        sNomeProduto.value = itens[index]['Nome Produto'];
        sPrecoProduto.value = itens[index].Preço;
        sQuantidade.value = itens[index].Quantidade;
        sSituacao.value = itens[index].situacao
        id = index;
    } else {
        // Limpa os inputs do modal quando adicionar um novo item
        sCodigoProduto.value = '';
        sNomeProduto.value = '';
        sPrecoProduto.value = '';
        sQuantidade.value = '';
        sSituacao.value = ''
    }

}
// Função para editar um item
function editItem(index) {
    openModal(true, index);
}
// Função para excluir um item
function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}
// Função para adicionar um item a tabela
function insertItemProduto(item, index) {
    let tr = document.createElement('tr');

    if (item !== null) {
        tr.innerHTML = `
            <td>${item.Código}</td>
            <td>${item['Nome Produto']}</td>
            <td>${item.Preço}</td>
            <td>${item.Quantidade}</td>
            <td><img src="${item.Imagem}" alt="${item['Nome Produto']}" width="50px" height="50px"</td>
            <td>${item.situacao}</td>
            <td class="acao">
                <button onclick="editItem(${index})"><span class="material-symbols-outlined">edit</span></button>
            </td>
            <td class="acao">
                <button onclick="deleteItem(${index})"><span class="material-symbols-outlined">delete</span></button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

// adiciona um listener ao botão de salvar
btnSalvar.onclick = e => {
    e.preventDefault();
    // verifica se todos os campos obrigatórios foram preenchidos
    if (sCodigoProduto.value == '' || sNomeProduto.value == '' || sPrecoProduto.value == '' || sQuantidade.value == '' || !sImagemProduto.files[0] || sSituacao.value == '') {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const file = sImagemProduto.files[0];
    const reader = new FileReader();

    reader.onload = e => {
        const base64Image = e.target.result;

        const newItem = {
            Código: sCodigoProduto.value,
            'Nome Produto': sNomeProduto.value,
            Preço: sPrecoProduto.value,
            Quantidade: sQuantidade.value,
            Imagem: base64Image,
            situacao: sSituacao.value
        };
        // verifica se o usuario esta editando um item ou criando um novo
        if (id || id === 0) {
            itens[id] = newItem;
            id = null;
        } else {
            itens.push(newItem);
        }

        setItensBD();
        loadItens();
        modal.classList.remove('active');
    };

    reader.readAsDataURL(file);
};

function getItensBD() {
    const itensBD = localStorage.getItem('itens');

    if (itensBD) {
        itens = JSON.parse(itensBD);
    }
}

function setItensBD() {
    localStorage.setItem('itens', JSON.stringify(itens));
}

function loadItens() {
    tbody.innerHTML = '';
    for (let i = 0; i < itens.length; i++) {
        insertItemProduto(itens[i], i);
    }
}

getItensBD();
loadItens();