const crypto = require('crypto')
/**
 * Encrypts a plaintext using AES-256-GCM encryption algorithm.
 *
 * @param {string} plaintext - The text to be encrypted.
 * @param {Buffer} encryptionKey - The encryption key as a Buffer.
 * @param {Buffer} iv - The initialization vector as a Buffer.
 * @returns {Object} An object containing the encrypted data and authentication tag.
 * @throws {Error} Throws an error if the encryption fails.
 */
function encrypt(plaintext, encryptionKey, iv) {
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    let encryptedData = cipher.update(plaintext, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return { encryptedData, tag };
  }
  
  /**
   * Decrypts an encrypted data using AES-256-GCM decryption algorithm.
   *
   * @param {string} encryptedData - The encrypted data as a hexadecimal string.
   * @param {Buffer} encryptionKey - The encryption key as a Buffer.
   * @param {Buffer} iv - The initialization vector as a Buffer.
   * @param {Buffer} tag - The authentication tag as a Buffer.
   * @returns {string} The decrypted plaintext.
   * @throws {Error} Throws an error if the decryption fails due to an invalid tag or key.
   */
  function decrypt(encryptedData, encryptionKey, iv, tag) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey, iv);
    decipher.setAuthTag(tag);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }
  
  module.exports = {
    /**
     * Encrypts a plaintext using AES-256-GCM encryption algorithm.
     *
     * @function
     * @name encrypt
     * @param {string} plaintext - The text to be encrypted.
     * @param {Buffer} encryptionKey - The encryption key as a Buffer.
     * @param {Buffer} iv - The initialization vector as a Buffer.
     * @returns {Object} An object containing the encrypted data and authentication tag.
     * @throws {Error} Throws an error if the encryption fails.
     */
  
    /**
     * Decrypts an encrypted data using AES-256-GCM decryption algorithm.
     *
     * @function
     * @name decrypt
     * @param {string} encryptedData - The encrypted data as a hexadecimal string.
     * @param {Buffer} encryptionKey - The encryption key as a Buffer.
     * @param {Buffer} iv - The initialization vector as a Buffer.
     * @param {Buffer} tag - The authentication tag as a Buffer.
     * @returns {string} The decrypted plaintext.
     * @throws {Error} Throws an error if the decryption fails due to an invalid tag or key.
     */
    encrypt,
    decrypt,
  };
  