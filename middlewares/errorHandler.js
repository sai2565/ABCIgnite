module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.type == 'VALIDATION_FAILED' ? 400 : (err.status || 500)).json({ error: err.message });
};