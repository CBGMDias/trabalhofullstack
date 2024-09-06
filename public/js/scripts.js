// Cadastra a nova pessoa
document.getElementById('pessoaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Coleta os valores
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;

  // Envia os dados para rota /pessoas
  const response = await fetch('/pessoas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, cpf, telefone }),
  });

  // Recebe a resposta do backend
  const pessoa = await response.json();

  // Adiciona a nova pessoa na lista
  addPessoaToList(pessoa);

  // Limpa os campos do formulário
  limparFormulario();

  // Exibe a mensagem de sucesso
  exibirMensagemSucesso('Pessoa cadastrada com sucesso!');
});

// Busca todas as pessoas quando a página carrega
async function fetchPessoas() {
  const response = await fetch('/pessoas');
  const pessoas = await response.json();
  pessoas.forEach(addPessoaToList);
}

// Adiciona uma pessoa na lista
function addPessoaToList(pessoa) {
  const pessoaList = document.getElementById('pessoaList');
  const li = document.createElement('li');
  li.textContent = `${pessoa.nome} - CPF: ${pessoa.cpf} - Telefone: ${pessoa.telefone}`;
  pessoaList.appendChild(li);
}

// Limpa os campos do formulário
function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('cpf').value = '';
  document.getElementById('telefone').value = '';
}

// Exibe uma mensagem de sucesso
function exibirMensagemSucesso(mensagem) {
  const mensagemSucesso = document.getElementById('mensagemSucesso');
  mensagemSucesso.textContent = mensagem;
  mensagemSucesso.style.display = 'block';

  // Esconde a mensagem dps de 3 segundos
  setTimeout(function() {
      mensagemSucesso.style.display = 'none';
  }, 3000);
}

// Carrega as pessoas ao carregar a página
window.onload = fetchPessoas;
