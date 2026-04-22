import { type Result, ok, fail } from "./result";

const API_URL = import.meta.env.VITE_API_URL;

type RequestConfig = RequestInit & {
    params?: string;
};

async function request<T>(endpoint: string, config: RequestConfig = {}): Promise<Result<T>> {
    const { params, ...init } = config;

    let url = `${API_URL}${endpoint}`;
    if (params) {
        url += `?${params}`;
    }

    try {
        const response = await fetch(url, {
            ...init,
            headers: { "Content-Type": "application/json", ...init.headers },
        });

        if (!response.ok) {
            const message = await response.text();
            return fail({ message, statusCode: response.status });
        }

        if (response.status === 204) return ok(undefined as T);

        const data = (await response.json()) as T;
        return ok(data);
    } catch (e) {
        // Error de red, timeout, etc.
        return fail({ message: (e as Error).message, statusCode: 0 });
    }
}

export const apiClient = {
    get: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, { ...config, method: "GET" }),

    post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
        request<T>(endpoint, {
            ...config,
            method: "POST",
            body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
        request<T>(endpoint, {
            ...config,
            method: "PUT",
            body: JSON.stringify(body),
        }),

    patch: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
        request<T>(endpoint, {
            ...config,
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    delete: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, { ...config, method: "DELETE" }),
};
