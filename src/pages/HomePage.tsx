import { HubCard } from "@/components/layout";
import { RestrictedLoginPanel } from "@/pages/RestrictedAreaPage";

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          DFL Frontend Starter
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Template React configurado com exemplos funcionais de padrões de mercado. Explore cada
          rota para entender como organizar código em projetos reais.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <HubCard
          title="CRUD de Produtos"
          badge="Paginação"
          to="/exemplo-crud"
          description="CRUD completo com filtros, paginação, dialog ao editar, datas, enums e React Query."
        />
        <HubCard
          title="Lista de Fornecedores"
          badge="Lista simples"
          to="/exemplo-lista-simples"
          description="Leitura sem paginação — ideal para Todo, galeria e listas pequenas."
        />
        <HubCard
          title="Estado local (useState)"
          to="/exemplo-estado-local"
          description="Contraste entre UI state e server state do React Query."
        />
        <HubCard
          title="Área restrita"
          badge="Auth stub"
          to="/area-restrita"
          description="Padrão Context + useAuth + ProtectedRoute preparado para autenticação real."
        />
      </section>

      <RestrictedLoginPanel />
    </main>
  );
}
