import React from "react";
import { FaUserPlus} from "react-icons/fa";
import ErrorBoundary from "./assets/componetes/ErrorBoundary";
import Formulario from "./assets/componetes/Formulario";

 function App() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-dark-gradient">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-800 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-800 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>

        <div className="relative z-10 flex flex-col items-center gap-8 bg-form-gradient backdrop-blur-xl shadow-dark-heavy rounded-2xl p-8 w-full max-w-md border border-dark-600 transition-all duration-500 hover:shadow-glow-purple hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-button-gradient rounded-lg shadow-dark-light">
              <FaUserPlus className="text-white text-xl"/>
            </div>
            <h1 className="text-2xl font-bold text-white animate-fade-in">
              Cadastro de Usuário
            </h1>
          </div>
          <Formulario />

          <footer className="text-dark-300 text-sm text-center animate-slide-up">
            <p>&copy; 2024 Projeto Interativo. Todos os direitos reservados.</p>
          </footer>
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;