import { useState } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { sanitize } from "../utils/sanitize";
import { validate } from "./useValidation";
import { capitalize } from "../utils/common";

const useFieldValidation = <TFieldValues extends Record<string, any>>() => {
    const [errors, setErrors] = useState<Partial<Record<keyof TFieldValues, string | null>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof TFieldValues, boolean>>>({});
    console.log({ errors })

    const bindField = <TName extends Path<TFieldValues>>(
        field: ControllerRenderProps<TFieldValues, TName>,
        name: TName
    ) => {
        return {
            ...field,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = (e.target.value);
                field.onChange(value);

                const err = validate(name as string, value);
                setErrors((prev: any) => ({ ...prev, [name]: err }));
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                const value = sanitize(e.target.value);
                field.onChange(value);
                console.log({ value });

                setTouched((prev) => ({ ...prev, [name]: true }));
                // 🔹 Add required check if field is empty
                if (!field.value || (typeof field.value === "string" && field.value.trim() === "")) {
                    setErrors((prev) => ({ ...prev, [name]: `${capitalize(name)} is required` }));
                }
                field.onBlur();
            },
        };
    };

    return { bindField, errors, touched };
};

export default useFieldValidation;