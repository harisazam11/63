const sjcl = require('sjcl');

const plaintext = 'Hello, World!';
const secretKey = 'your';

// Encrypt
const encrypted = sjcl.encrypt(secretKey, plaintext);
console.log('Encrypted:', encrypted);

// Decrypt
const decrypted = sjcl.decrypt(secretKey, encrypted);
console.log('Decrypted:', decrypted);