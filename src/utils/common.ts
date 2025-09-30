const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const validateAllFieldsFilled = <T extends Record<string, any>>(data: T) => {
    const missingFields: Partial<Record<keyof T, string>> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
            missingFields[key as keyof T] = `${capitalize(key)} is required`;
        }
    });

    return missingFields; // empty object = all fields filled
};

export {
    capitalize, validateAllFieldsFilled
}
