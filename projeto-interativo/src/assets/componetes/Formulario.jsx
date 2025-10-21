import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Hook customizado para encapsular a lógica do formulário
const useFormulario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [isSubmetido, setIsSubmetido] = useState(false);

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validar = () => {
    const novosErros = {};
    if (nome.length < 3) {
      novosErros.nome = 'Nome deve ter ao menos 3 caracteres.';
    }
    if (!validarEmail(email)) {
      novosErros.email = 'Email inválido.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Validação em tempo real após a primeira tentativa de submissão
  useEffect(() => {
    if (isSubmetido) {
      validar();
    }
  }, [nome, email, isSubmetido]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmetido(true);
    if (validar()) {
      setSucesso(true);
      // Aqui você enviaria os dados para um servidor
      console.log('Dados enviados:', { nome, email });
    } else {
      setSucesso(false);
    }
  };

  return { nome, setNome, email, setEmail, erros, sucesso, handleSubmit, isSubmetido, isValid: Object.keys(erros).length === 0 && nome.length >= 3 && validarEmail(email) };
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  error: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.3 }
  }
};

function Formulario() {
  const { nome, setNome, email, setEmail, erros, sucesso, handleSubmit, isSubmetido, isValid } = useFormulario();

  const hasNomeErro = isSubmetido && erros.nome;
  const hasEmailErro = isSubmetido && erros.email;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate={!sucesso && isSubmetido && !isValid ? "error" : "visible"}
    >
      {/* Campo Nome */}
      <div className="relative group">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300" />
        <input
          type="text"
          id="nome"
          aria-invalid={hasNomeErro}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={`peer block w-full pl-12 pr-10 py-4 bg-gray-800/50 border rounded-xl shadow-lg text-white transition-all duration-300 backdrop-blur-sm
            ${hasNomeErro ? 'border-red-500 shadow-red-500/20' : 'border-gray-600'}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-500/30
            placeholder-transparent hover:bg-gray-700/50`}
          placeholder="Nome"
        />
        <label
          htmlFor="nome"
          className="absolute left-12 -top-2.5 text-sm text-gray-400 transition-all duration-300
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400"
        >
          Nome
        </label>
        {isSubmetido && (hasNomeErro ? <FaExclamationCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 animate-pulse" /> : <FaCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 animate-bounce" />)}
      </div>

      {/* Campo Email */}
      <div className="relative group">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300" />
        <input
          type="email"
          id="email"
          aria-invalid={hasEmailErro}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`peer block w-full pl-12 pr-10 py-4 bg-gray-800/50 border rounded-xl shadow-lg text-white transition-all duration-300 backdrop-blur-sm
            ${hasEmailErro ? 'border-red-500 shadow-red-500/20' : 'border-gray-600'}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-500/30
            placeholder-transparent hover:bg-gray-700/50`}
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="absolute left-12 -top-2.5 text-sm text-gray-400 transition-all duration-300
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400"
        >
          Email
        </label>
        {isSubmetido && (hasEmailErro ? <FaExclamationCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 animate-pulse" /> : <FaCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 animate-bounce" />)}
      </div>

      <button
        type="submit"
        disabled={!isValid && isSubmetido}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        Enviar
      </button>

      {isSubmetido && (erros.nome || erros.email) && (
        <motion.p
          className="text-red-600 text-sm text-center font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {erros.nome || erros.email}
        </motion.p>
      )}

      {sucesso && (
        <motion.p
          className="text-green-600 text-sm text-center font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Cadastro realizado com sucesso!
        </motion.p>
      )}
    </motion.form>
  );
}

export default Formulario;