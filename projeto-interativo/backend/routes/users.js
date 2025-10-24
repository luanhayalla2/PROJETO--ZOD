const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// Constrói um caminho absoluto para o arquivo de dados
const dataDir = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDir, 'users.json');

// Garante que o arquivo users.json exista
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Helper para ler e escrever JSON
const readUsers = async () => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Could not read or parse users.json. Returning empty array. Error:', error);
    // Se o arquivo estiver vazio ou for inválido, um erro de parse será lançado.
    if (error.name === 'SyntaxError' || error.code === 'ENOENT') {
      return []; // Retorna um array vazio se o arquivo não existir ou estiver malformado
    }
    // Lança outros erros de leitura de arquivo
    throw error;
  }
};
const writeUsers = (data) => fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));

// Middleware para tratamento de erros async
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rota para obter todos os usuários
router.get('/', asyncHandler(async (req, res) => {
  const users = await readUsers();
  res.json(users);
}));

// Criar um novo usuário
router.post('/', asyncHandler(async (req, res) => {
    const users = await readUsers();
    // Validação simples para garantir que apenas os campos esperados sejam salvos
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }
    const novoUsuario = { id: Date.now().toString(), nome, email };
    users.push(novoUsuario);
    await writeUsers(users);
    res.status(201).json(novoUsuario);
}));

// Atualizar um usuário existente
router.put('/:id', asyncHandler(async (req, res) => {
  const users = await readUsers();
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    // Garante que o ID não seja sobrescrito e atualiza apenas os campos permitidos
    const { nome, email } = req.body;
    users[index] = { ...users[index], nome: nome ?? users[index].nome, email: email ?? users[index].email };
    await writeUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
}));

// Deletar um usuário
router.delete('/:id', asyncHandler(async (req, res) => {
  let users = await readUsers();
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    users = users.filter(u => u.id !== id);
    await writeUsers(users);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
}));

module.exports = router;
