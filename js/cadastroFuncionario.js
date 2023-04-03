const modal = document.querySelector('.popup-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCargo = document.querySelector('#m-cargo');
const sEmail = document.querySelector('#m-email');
const sSituacao = document.querySelector('#m-situacao');

const btnSalvar = document.querySelector('#btnSalvar');

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('popup-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCargo.value = itens[index].cargo
    sEmail.value = itens[index].email
    sSituacao.value = itens[index].situacao
    id = index
  } else {
    sNome.value = ''
    sCargo.value = ''
    sEmail.value = ''
    sSituacao.value = ''
  }

}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${index}</td>
    <td>${item.nome}</td>
    <td>${item.cargo}</td>
    <td>${item.email}</td>
    <td>${item.situacao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><span class="material-symbols-outlined">edit</span></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><span class="material-symbols-outlined">delete</span></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCargo.value == '' || sEmail.value == '' || sSituacao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cargo = sCargo.value
    itens[id].email = sEmail.value
    itens[id].situacao = sSituacao.value
  } else {
    itens.push({'nome': sNome.value, 'cargo': sCargo.value, 'email': sEmail.value, 'situacao': sSituacao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()