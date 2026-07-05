import { useState } from "react";
import { useCounter } from "@/hooks/useCounter";

export default function LocalStateExamplePage() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [text, setText] = useState("");

  return (
    <main className="mx-auto max-w-lg space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Estado local (useState)
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Use <strong>useState</strong> para UI que não vem do servidor: contadores, inputs, modais
          abertos, filtros antes do debounce. Dados remotos ficam no React Query.
        </p>
      </header>

      <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Contador</h2>
        <p className="mt-4 text-4xl font-bold text-blue-600">{count}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={decrement}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600"
          >
            −
          </button>
          <button
            type="button"
            onClick={increment}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white"
          >
            +
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Input controlado</h2>
        <label htmlFor="demo-text" className="mt-3 block text-sm text-gray-600 dark:text-gray-400">
          value + onChange — some ao desmontar o componente
        </label>
        <input
          id="demo-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Digite algo..."
        />
        {text && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Você digitou: {text}</p>
        )}
      </section>
    </main>
  );
}
