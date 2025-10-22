import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatório de erros
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-purple-800">
          <div className="relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado</h2>
              <p className="text-gray-600 mb-4">
                Desculpe, ocorreu um erro inesperado. Por favor, recarregue a página e tente novamente.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
              >
                Recarregar Página
              </button>
              {import.meta.env.DEV && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500">Detalhes do erro (desenvolvimento)</summary>
                  <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
