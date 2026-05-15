export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly path: string,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export const apiFetch = (path: string, options?: RequestInit) =>
  fetch(`${API_BASE}${path}`, { credentials: "include", ...options });

export async function apiFetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await apiFetch(path, options);

  if (!response.ok) {
    throw new ApiRequestError(`API request failed: ${response.status}`, response.status, path);
  }

  return response.json() as Promise<T>;
}
