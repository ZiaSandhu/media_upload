const authenticateRequest = (req, res, next) => {
    const referer = req.headers['referer'];


    if ( referer && referer.includes(process.env.ALLOWED_URL)) {
        next();
    } else {
        res.status(403).send('Forbidden'); // Reject the request
    }
};

module.exports = authenticateRequest