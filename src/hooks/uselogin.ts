import { useState } from "react";
import { ApiError, apiFetch } from "../utils/apiFetch";
import { sanitize } from "../utils/sanitize";
import { validateAllFieldsFilled } from "../utils/common";
import { useAuthConfig } from "../components/AuthConfigProvider";

type LoginPayload = { email: string; password: string };

const useLogin = () => {
    const { baseUrl } = useAuthConfig();
    console.log({ baseUrl })
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<ApiError | string | null>(null);

    const onSubmit = async (data: LoginPayload) => {
        setPending(true);
        setError(null);

        // 🔹 Sanitize input
        const sanitizedData = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, sanitize(v as string)])
        ) as LoginPayload;

        // 🔹 Check all fields have value
        const missingFields = validateAllFieldsFilled(sanitizedData);
        if (Object.keys(missingFields).length > 0) {
            setPending(false);
            return
        }

        // 🔹 API call
        try {
            const result = await apiFetch<{ token: string }>(baseUrl + "/api/v1/identity/admin/login", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setPending(false);
            return { success: true, data: result };
        } catch (err) {
            setError(err as ApiError);
            setPending(false);
            return { success: false, error: err };
        }
    };

    return { onSubmit, pending, error };
};

export default useLogin