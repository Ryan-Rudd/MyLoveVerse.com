const { encrypt } = require('../security/encyptor');

function encryptRequestBody(req, res, next) {
    try {
        if (typeof req.body === 'object') {
            req.body = JSON.stringify(req.body);
        }
        const encryptedData = encrypt(req.body, process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
        req.body = encryptedData;
        next();
    } catch (err) {
        console.error('Error encrypting request data:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = encryptRequestBody;
