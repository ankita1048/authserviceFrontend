type Validator = {
    regex?: RegExp;
    min?: number;
    max?: number;
    errorMessage?: string;
    required?: boolean;
};

export const fieldValidators: Record<string, Validator> = {
    email: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email"
    },
    password: {
        required: true,
        min: 6,
        max: 20,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};\:,.\/?\\|])[A-Za-z\d!@#$%^&*()_+=\[\]{};\:,.\/?\\|-]{8,64}$/,
        errorMessage: `Password must be at least 8 characters and contain: 1 uppercase, 1 lowercase, 1 number, and 1 special character`
    },
    otp: {
        required: true,
        regex: /^[0-9]{4,6}$/,
        errorMessage: "Invalid OTP format"
    },
};
