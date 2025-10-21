import React from "react";  
import { FaUserPlus} from "react-icons/fa";
import Formulario from "./assets/componetes/Formulario";

 function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 transition-all duration-500 hover:shadow-3xl hover:scale-105">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <FaUserPlus className="text-white text-xl"/>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Cadastro de Usuário
          </h1>
        </div>
        <Formulario />
      </div>

      <footer className="relative z-10 mt-8 text-white/80 text-sm text-center">
        <p>&copy; 2024 Projeto Interativo. Todos os direitos reservados.</p>
      </footer>
    </div>

  );
}

export default App;