import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';

// Function to encrypt data
function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// Function to decrypt data
function decryptData(data) {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
