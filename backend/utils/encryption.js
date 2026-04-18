const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.JOURNAL_SECRET || 'default_secret').toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.JOURNAL_SECRET || 'default_secret');
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
