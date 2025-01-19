exports.isValidDate = (dateString) => {   
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.trim() !== '';
}