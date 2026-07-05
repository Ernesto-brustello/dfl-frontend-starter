/**
 * Cliente HTTP central — usado pelos services quando integrar API real.
 * Hoje os services leem de test-utils; amanhã trocam para api.get/post/etc.
 */

const baseUrl = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new ApiError(message || "Erro na requisição", response.status);
  }
  return response.json() as Promise<T>;
}

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`);
    return parseResponse<T>(response);
  },
  post: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
  },
  patch: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
  },
  delete: async (path: string): Promise<void> => {
    const response = await fetch(`${baseUrl}${path}`, { method: "DELETE" });
    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      throw new ApiError(message || "Erro na requisição", response.status);
    }
  },
};
