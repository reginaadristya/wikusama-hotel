const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkkey';

auth = (req, res, next) => {
    let header = req.headers.authorization;
    let token = header && header.split(' ')[1];

    let jwtHeader = {
        algorithm: "HS256"
    };

    if (token == null) return res.sendStatus(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, jwtHeader, (err, usr) => {
        if (err) return res.sendStatus(401).json({ message: "Invalid Token" });

        req.user = usr;
        next();
    });
};

module.exports = auth;