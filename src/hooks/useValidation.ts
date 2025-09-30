import { capitalize } from "../utils/common";
import { fieldValidators } from "../utils/validators";

// hooks/useValidation.ts
type Validator = {
    regex?: RegExp;
    min?: number;
    max?: number;
    errorMessage?: string;
};

export const validate = (field: string, value: string, override?: Validator): string | null => {
    const v = { ...fieldValidators[field], ...override };
    if (!v) return null;

    if (v.required && !value.trim()) return `${capitalize(field)} is required`;
    if (v.min && value.length < v.min) return `Must be at least ${v.min} characters`;
    if (v.max && value.length > v.max) return `Must be at most ${v.max} characters`;
    if (v.regex && !v.regex.test(value)) return v.errorMessage || `Invalid ${capitalize(field)}`;

    return null;
};
