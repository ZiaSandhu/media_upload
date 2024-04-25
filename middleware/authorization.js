const authenticateRequest = (req, res, next) => {
    const referer = req.headers['referer'];


    if (( referer && referer.includes(process.env.ALLOWED_URL))) {
        next();
    } else {
        return res.status(403).send('Forbidden'); // Reject the request
    }
};ww

module.exports = authenticateRequest