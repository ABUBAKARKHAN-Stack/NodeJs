// ? What is the Crypto module?
/**
 * The Crypto module is a built-in module in Node.js. It provides cryptographic functionality,
 * including a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
 */

const crypto = require("crypto"); // @ Import the crypto module from Node.js.

// ? Random Bytes
/**
 * The `crypto.randomBytes()` method generates cryptographically strong pseudo-random data.
 * - The size argument is the number of bytes to generate.
 */
const randomBytes = crypto.randomBytes(8); // @ Generates 8 bytes = 64 bits of random data.
console.log(randomBytes.toString("hex")); // ! Converts the random bytes to a hexadecimal string.

// ? Hashing
/**
 * The `crypto.createHash()` method creates and returns a hash object with the specified algorithm.
 * - Algorithms are identified using crypto.constants or OpenSSL's message digest names.
 */
let password = "1234567890";
const hash = crypto.createHash("sha256") // @ Creates a hash object using the `sha256` algorithm.
    .update(password) // @ Updates the hash object with the input string.
    .digest("hex"); // @ Returns the digest of the hash in hexadecimal format.

console.log(hash); // ! Example Output: A random hashed string (e.g., `e807f1fcf82d132f9bb018ca6738a19f`).

// ? Explanation of the Hashing Process
/**
 * 1. `crypto.createHash("sha256")`: Creates a hash object using the `sha256` algorithm.
 * 2. `.update("1234567890")`: Updates the hash object with the string `1234567890`.
 * 3. `.digest("hex")`: Returns the digest (final hash) in hexadecimal format.
 * 
 * The process generates a hashed output from the input string, which is irreversible.
 */

// ? Verifying a Password
/**
 * To verify a password, we hash the input password and compare it with the stored hash.
 */
let inputPassword = "1234567890";
const inputHash = crypto.createHash("sha256") // @ Create a hash object for verification.
    .update(inputPassword) // @ Update the hash object with the input password.
    .digest("hex"); // @ Get the digest of the hash in hexadecimal format.

const isPasswordCorrect = inputHash === hash; // @ Compare the input hash with the stored hash.
console.log(isPasswordCorrect); // ! Output: `true` if passwords match, `false` otherwise.

//! Notes:
// ? Alternative Methods for Hashing Passwords
/**
 * Instead of using the Crypto module directly for password hashing and verification, 
 * we can use specialized libraries such as:
 * - bcrypt
 * - argon2
 * These libraries provide stronger security and are more suited for password storage.
 */

//! Additional Information:
// TODO: If you want to learn more about the Crypto module, refer to the official documentation:
// TODO: Documentation: https://nodejs.org/api/crypto.html
