# Projeto Interativo - Sistema de Cadastro de Usuários

Uma aplicação web interativa e visualmente atraente para cadastro, edição e exclusão de usuários, construída com React, Vite, Tailwind CSS e Node.js/Express.

## ✨ Funcionalidades

O projeto utiliza um formulário interativo para capturar dados de usuários e exibir informações de forma dinâmica, com foco em uma experiência de usuário fluida e agradável.

- **Cadastro de Usuários:** Formulário para adicionar novos usuários com validação em tempo real.
- **Edição de Usuários:** Permite editar informações de usuários existentes.
- **Exclusão de Usuários:** Remove usuários com confirmação.
- **Listagem de Usuários:** Exibe todos os usuários cadastrados com opções de editar e excluir.
- **Interface Moderna:** Estilizada com Tailwind CSS para um design limpo e responsivo.
- **Animações Fluidas:** Utiliza a biblioteca `framer-motion` para adicionar animações e transições suaves.
- **Componentização com React:** Estrutura baseada em componentes reutilizáveis.
- **Desenvolvimento Rápido:** Configurado com Vite para um desenvolvimento ágil com Hot Module Replacement (HMR).
- **Backend API:** Servidor Node.js/Express com endpoints REST para CRUD de usuários.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca para construção de interfaces
- **Vite** - Ferramenta de build e desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **React Icons** - Ícones para React

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **CORS** - Middleware para permitir requisições cross-origin
- **File System** - Para persistência de dados em JSON

## ⚙️ Como Executar o Projeto

> **Nota:** Certifique-se de que o [Node.js](https://nodejs.org/) (que inclui o npm) está instalado em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd projeto-interativo
    ```

2.  **Instale as dependências:**
    Este comando instalará as dependências tanto do frontend quanto do backend.
    ```bash
    npm install
    ```

3.  **Inicie o Frontend (Interface Visual):**
    Em um terminal, execute:
    ```bash
    npm run dev
    ```

4.  **Inicie o Backend (Servidor):**
    Abra um **novo terminal na raiz do projeto** (`projeto-interativo`) e execute:
    ```bash
    npm run dev:backend
    ```

Após seguir esses passos, a aplicação frontend estará disponível em `http://localhost:5173` e o servidor backend estará rodando na porta `3001`.

## 📁 Estrutura do Projeto

```
projeto-interativo/
├── backend/
│   ├── data/
│   │   └── users.json          # Arquivo de dados dos usuários
│   ├── routes/
│   │   └── users.js            # Rotas da API para usuários
│   ├── server.js               # Servidor Express
│   └── package.json
├── src/
│   ├── assets/
│   │   └── componetes/
│   │       ├── ErrorBoundary.jsx  # Componente para tratamento de erros
│   │       ├── Formulario.jsx     # Componente principal do formulário
│   │       └── InputField.jsx     # Componente de campo de entrada
│   ├── App.jsx                   # Componente principal da aplicação
│   ├── index.css                 # Estilos globais
│   └── main.jsx                  # Ponto de entrada da aplicação
├── package.json
├── tailwind.config.js           # Configuração do Tailwind CSS
├── vite.config.js               # Configuração do Vite
└── README.md
```

## 🔧 API Endpoints

O backend fornece os seguintes endpoints REST:

- `GET /users` - Lista todos os usuários
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário existente
- `DELETE /users/:id` - Remove um usuário

### Exemplo de Uso da API

```javascript
// Criar um novo usuário
fetch('http://localhost:3001/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ nome: 'João Silva', email: 'joao@example.com' }),
});

// Listar todos os usuários
fetch('http://localhost:3001/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🎨 Personalização

O projeto utiliza Tailwind CSS com configurações customizadas no arquivo `tailwind.config.js`. Você pode personalizar cores, fontes, animações e outros aspectos visuais editando este arquivo.

## 📝 Scripts Disponíveis

A partir da raiz do projeto (`projeto-interativo`), você pode usar os seguintes scripts:

- `npm run dev`: Inicia o servidor de desenvolvimento do frontend.
- `npm run build`: Gera a build de produção do frontend.
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run dev:backend`: Inicia o servidor de desenvolvimento do backend.
- `npm run lint`: Executa o linter para verificar e corrigir o código.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
