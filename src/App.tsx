import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth";
import { AppLayout } from "@/components/layout";
import { ErrorBoundary } from "@/components/ui";
import { AuthProvider, ThemeProvider } from "@/contexts";
import HomePage from "@/pages/HomePage";
import LocalStateExamplePage from "@/pages/LocalStateExamplePage";
import NotFound from "@/pages/NotFound";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import RestrictedAreaPage from "@/pages/RestrictedAreaPage";
import SuppliersPage from "@/pages/SuppliersPage";
import LivrosPage from "@/pages/LivrosPage";
import LivroDetailPage from "@/pages/LivroDetailPage";
import LivroFormPage from "@/pages/LivroFormPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/exemplo-crud" element={<ProductsPage />} />
                  <Route path="/exemplo-detalhe/:id" element={<ProductDetailPage />} />
                  <Route path="/exemplo-lista-simples" element={<SuppliersPage />} />
                  <Route path="/exemplo-estado-local" element={<LocalStateExamplePage />} />
                  {/* Rotas do módulo Livros (adicionais) */}
                  <Route path="/livros" element={<LivrosPage />} />
                  <Route path="/livros/novo" element={<LivroFormPage />} />
                  <Route path="/livros/:id/editar" element={<LivroFormPage />} />
                  <Route path="/livros/:id" element={<LivroDetailPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/area-restrita" element={<RestrictedAreaPage />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/login" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
