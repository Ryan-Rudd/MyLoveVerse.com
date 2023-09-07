const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);

    let encryptedData = cipher.update(text, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
    const tag = cipher.getAuthTag().toString('hex');

    return encryptedData + ':' + tag; // Return both encrypted data and tag as a single string
}

function decrypt(encryptedText) {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
        throw new Error('Invalid input format');
    }

    const [encryptedData, tagHex] = parts;

    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey, iv);

    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
}

module.exports = { encrypt, decrypt };
