const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    let token = req.body.token;
    if (!token) {
        return res.status(401).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = authenticateToken;