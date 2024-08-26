const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;

        return res.json({
            message: firstError,
            success: false
        });
    }

    next();
}

module.exports = handleValidationErrors;