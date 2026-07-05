import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary capturou:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Ops, algo quebrou na interface</h1>
          <p className="text-gray-600">
            Um componente encontrou um erro inesperado. Recarregue a página ou volte ao início.
          </p>
          <Link to="/" className="text-blue-600 underline hover:text-blue-800">
            Voltar ao início
          </Link>
        </main>
      );
    }
    return this.props.children;
  }
}
