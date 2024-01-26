const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.SECRET_KEY_CRY.padEnd(32), 'utf-8');
const iv = crypto.randomBytes(16);

  module.exports = function encryptResponse(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
  }


