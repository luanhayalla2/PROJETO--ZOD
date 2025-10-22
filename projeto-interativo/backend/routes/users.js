const express = require('express')
const fs = require('fs')
const router = express.Router()
const filePath = './data/users.json'

// Garante que o arquivo users.json exista
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Helper para ler e escrever JSON
const readUsers = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Could not read or parse users.json. Returning empty array. Error:', error);
    return []; // Retorna um array vazio se o arquivo estiver vazio ou corrompido
  }
};
const writeUsers = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Rota para obter todos os usuários
router.get('/', (req, res) => {
  const users = readUsers()
  res.json(users)
});

// Criar um nova usúrio
router.post('/', (req, res) => {
    const users = readUsers()
    const novoUsuario = {id: Date.now().toString(), ...req.body}
    users.push(novoUsuario)  
    writeUsers(users)
    res.status(201).json(novoUsuario)
    });

// Atualizar um usúrio existente
router.put('/:id', (req, res) => {
  const users = readUsers();
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Deletar um usuário
router.delete('/:id', (req, res) => {
  const users = readUsers();
  const { id } = req.params;
  const newUsers = users.filter(u => u.id !== id);

  if (users.length > newUsers.length) {
    writeUsers(newUsers);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

    module.exports = router;
  

    




    
