const modal = document.querySelector('.popup-container');
const tbody = document.querySelector('tbody');
const sCodigoProduto = document.querySelector('#m-codigoProduto');
const sNomeProduto = document.querySelector('#m-nomeProduto');
const sPrecoProduto = document.querySelector('#m-precoProduto');
const sQuantidade = document.querySelector('#m-quantidadeProduto');

const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id;

function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.classList.contains('popup-container')) {
            modal.classList.remove('active');
        }
    };

    if (edit) {
        sCodigoProduto.value = itens[index].Código;
        sNomeProduto.value = itens[index]['Nome Produto'];
        sPrecoProduto.value = itens[index].Preço;
        sQuantidade.value = itens[index].Quantidade;
        id = index;
    } else {
        sCodigoProduto.value = '';
        sNomeProduto.value = '';
        sPrecoProduto.value = '';
        sQuantidade.value = '';
    }

}

function editItem(index) {
    openModal(true, index);
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItemProduto(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.Código}</td>
        <td>${item['Nome Produto']}</td>
        <td>${item.Preço}</td>
        <td>${item.Quantidade}</td>
      
        <td class="acao">
            <button onclick="editItem(${index})"><span class="material-symbols-outlined">edit</span></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><span class="material-symbols-outlined">delete</span></button>
        </td>
        `;
    tbody.appendChild(tr);
}

btnSalvar.onclick = e => {

    if (sCodigoProduto.value == '' || sNomeProduto.value == '' || sPrecoProduto.value == '' || sQuantidade.value == '') {
        return;
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].Código = sCodigoProduto.value;
        itens[id]['Nome Produto'] = sNomeProduto.value;
        itens[id].Preço = sPrecoProduto.value;
        itens[id].Quantidade = sQuantidade.value;

    } else {
        itens.push({ 'Código': sCodigoProduto.value, 'Nome Produto': sNomeProduto.value, 'Preço': sPrecoProduto.value, 'Quantidade': sQuantidade.value });
    }

    setItensBD();

    modal.classList.remove('active');
    loadItens();
    id = undefined;
};

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItemProduto(item, index);
    });

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();