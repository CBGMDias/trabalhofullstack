document.getElementById('pessoaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
  
    const response = await fetch('/pessoas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, cpf, telefone }),
    });
  
    const pessoa = await response.json();
    addPessoaToList(pessoa);
  });
  
  async function fetchPessoas() {
    const response = await fetch('/pessoas');
    const pessoas = await response.json();
    pessoas.forEach(addPessoaToList);
  }
  
  function addPessoaToList(pessoa) {
    const pessoaList = document.getElementById('pessoaList');
    const li = document.createElement('li');
    li.textContent = `${pessoa.nome} - CPF: ${pessoa.cpf} - Telefone: ${pessoa.telefone}`;
    pessoaList.appendChild(li);
  }
  
  // Carregar as pessoas quando a página for carregada
  window.onload = fetchPessoas;
  