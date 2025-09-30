export const sanitize = (value: string) => {
    // Basic sanitization: escape <, >, &, ", '
    return value.replace(/[<>&"'`]/g, (c) => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
    }[c]) ?? '');
};
