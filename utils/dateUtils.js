exports.isValidDate = (dateString) => {
    if (typeof dateString !== 'string' || !dateString.trim()) {
        return false;
    }

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};