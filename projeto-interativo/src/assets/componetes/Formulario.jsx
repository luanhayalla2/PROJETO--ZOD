import React, { useState, useEffect, useCallback } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';


// Importe o novo componente (ajuste o caminho se necessário)
import InputField from './InputField';
// Hook customizado para encapsular a lógica do formulário
const useFormulario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null); // Guarda o usuário que está sendo editado
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [isSubmetido, setIsSubmetido] = useState(false);

  const validarEmail = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);

  const fetchUsuarios = useCallback(() => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
        console.log('Usuários carregados:', data);
      })
      .catch(error => {
        console.log('Erro ao buscar usuários:', error);
      });
  }, []);

  // Buscar usuario ao carregar o componente
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const limparFormulario = () => {
    setNome('');
    setEmail('');
    setErros({});
    setSucesso(false);
    setIsSubmetido(false);
    setEditando(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUsuarios(); // Atualiza a lista após excluir
          console.log('Usuário excluído com sucesso');
        } else {
          console.error('Erro ao excluir usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição de exclusão:', error);
      }
    }
  };

  const handleEditClick = (usuario) => {
    setEditando(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setSucesso(false);
    setErros({});
    setIsSubmetido(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validar = useCallback(() => {
    const novosErros = {};
    if (nome.length < 3) {
      novosErros.nome = 'Nome deve ter ao menos 3 caracteres.';
    }
    if (!validarEmail(email)) {
      novosErros.email = 'Email inválido.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }, [nome, email, validarEmail]);

  // Validação em tempo real após a primeira tentativa de submissão
  useEffect(() => {
    if (isSubmetido) {
      validar();
    }
  }, [isSubmetido, validar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmetido(true);
    setSucesso(false);

    if (validar()) {
      try {
        const url = editando
          ? `http://localhost:3001/users/${editando.id}`
          : 'http://localhost:3001/users';
        const method = editando ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email }),
        });

        if (response.ok) {
          setSucesso(true);
          limparFormulario();
          fetchUsuarios(); // Atualiza a lista
          setTimeout(() => setSucesso(false), 3000); // Limpa a mensagem de sucesso
        } else {
          console.error('Erro ao enviar dados:', response.statusText);
          setSucesso(false);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setSucesso(false);
      }
    } else {
      setSucesso(false);
    }
  };

  return {
    nome, setNome, email, setEmail, erros, sucesso, handleSubmit, isSubmetido,
    isValid: Object.keys(erros).length === 0 && nome.length >= 3 && validarEmail(email),
    usuarios, editando, handleDelete, handleEditClick, limparFormulario
  };
};



function Formulario() {
  const {
    nome, setNome, email, setEmail, erros, sucesso, handleSubmit, isSubmetido, isValid,
    usuarios, editando, handleDelete, handleEditClick, limparFormulario
  } = useFormulario();

  const hasNomeErro = isSubmetido && erros.nome;
  const hasEmailErro = isSubmetido && erros.email;

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
      >
        <InputField
          id="nome"
          label="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          icon={FaUser}
          hasError={hasNomeErro}
          isSubmetido={isSubmetido}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={FaEnvelope}
          hasError={hasEmailErro}
          isSubmetido={isSubmetido}
        />

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!isValid && isSubmetido}
            className="flex-1 bg-button-gradient text-white font-bold py-3 rounded-lg shadow-dark-medium hover:shadow-glow-indigo transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 animate-fade-in"
          >
            {editando ? 'Atualizar' : 'Cadastrar'}
          </button>
          {editando && (
            <button
              type="button"
              onClick={limparFormulario}
              className="px-4 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-dark-medium hover:bg-gray-500 transition-all duration-300"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {isSubmetido && (erros.nome || erros.email) && (
          <p className="text-red-400 text-sm text-center font-semibold pt-2">
            {erros.nome || erros.email}
          </p>
        )}

        {sucesso && (
          <p className="text-green-400 text-sm text-center font-semibold pt-2">
            {editando ? 'Usuário atualizado com sucesso!' : 'Cadastro realizado com sucesso!'}
          </p>
        )}
      </form>

      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Usuários Cadastrados</h2>
        {usuarios.length === 0 ? (
          <p className="text-gray-400">Nenhum usuário cadastrado.</p>
        ) : (
          <ul className="space-y-2">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="bg-dark-800/50 p-4 rounded-lg shadow-dark-light flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{usuario.nome}</p>
                  <p className="text-gray-400">{usuario.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(usuario)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-2"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Formulario;
