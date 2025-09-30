// utils/apiFetch.ts
export type ApiError = {
    type: "network" | "timeout" | "http" | "parse";
    status?: number;
    message: string;
    details?: any;
};

export const apiFetch = async <T>(
    url: string,
    options?: RequestInit,
    timeoutMs: number = 8000 // default 8s timeout
): Promise<T> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
        });

        clearTimeout(id);

        if (!res.ok) {
            let details: any;
            try {
                details = await res.json();
            } catch {
                details = await res.text();
            }

            throw <ApiError>{
                type: "http",
                status: res.status,
                message: details?.message || `HTTP error ${res.status}`,
                details,
            };
        }

        try {
            return (await res.json()) as T;
        } catch (e) {
            throw <ApiError>{
                type: "parse",
                message: "Failed to parse JSON response",
                details: e,
            };
        }
    } catch (e: any) {
        clearTimeout(id);

        if (e.name === "AbortError") {
            throw <ApiError>{ type: "timeout", message: `Request timed out after ${timeoutMs}ms` };
        }

        if (e.type === "http" || e.type === "parse") {
            throw e;
        }

        throw <ApiError>{
            type: "network",
            message: e.message || "Network error",
            details: e,
        };
    }
};
