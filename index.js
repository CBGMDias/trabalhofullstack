const express = require('express');
const { Sequelize } = require('sequelize');
const db = require('./models');

const app = express();
const PORT = 3000;

// Middleware para tratar JSON
app.use(express.json());

// Middleware pros arquivos da pasta public
app.use(express.static('public'));

// Rota post pessoas
app.post('/pessoas', async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;
    const novaPessoa = await db.Pessoa.create({ nome, cpf, telefone });
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a pessoa' });
  }
});

// Rota get pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await db.Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
