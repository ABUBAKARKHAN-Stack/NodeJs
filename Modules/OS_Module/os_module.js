// ? What is the OS module?
/**
 * The OS module provides operating system-related utility methods and properties.
 */

// ? How to use the OS module?
/**
 * To use the OS module, import it using the `require()` method.
 */

const os = require("os"); // @ Import the OS module from Node.js.

// ? os.arch() Method
/**
 * The `os.arch()` method returns the operating system CPU architecture.
 */
console.log(os.arch()); // ! Example: Outputs CPU architecture, e.g., `x64`.

// ? os.platform() Method
/**
 * The `os.platform()` method returns the operating system platform.
 */
console.log(os.platform()); // ! Example: Outputs OS platform, e.g., `win32`.

// ? os.type() Method
/**
 * The `os.type()` method returns the operating system name.
 */
console.log(os.type()); // ! Example: Outputs OS name, e.g., `Windows_NT`.

// ? os.cpus() Method
/**
 * The `os.cpus()` method returns an array of objects containing information about each logical CPU core.
 */
// console.log(os.cpus()); // Uncomment to display detailed CPU information.

// ? os.freemem() Method
/**
 * The `os.freemem()` method returns the amount of free system memory in bytes.
 */
console.log("Free Memory:", os.freemem(), "Bytes"); // ! Example: Outputs free memory, e.g., `1032378368 Bytes`.

// ? os.totalmem() Method
/**
 * The `os.totalmem()` method returns the amount of total system memory in bytes.
 */
console.log("Total Memory:", os.totalmem(), "Bytes"); // ! Example: Outputs total memory, e.g., `16885237760 Bytes`.

// ? os.homedir() Method
/**
 * The `os.homedir()` method returns the home directory of the current user.
 */
console.log(os.homedir()); // ! Example: Outputs home directory, e.g., `C:\Users\USER`.

// ? os.hostname() Method
/**
 * The `os.hostname()` method returns the hostname of the operating system.
 */
console.log(os.hostname()); // ! Example: Outputs hostname, e.g., `DESKTOP-V21253Q`.

// ? os.tmpdir() Method
/**
 * The `os.tmpdir()` method returns the operating system's default directory for temporary files.
 */
console.log(os.tmpdir()); // ! Outputs the temporary files directory.

// ? os.machine() Method
/**
 * The `os.machine()` method returns the operating system CPU architecture.
 */
console.log(os.machine()); // ! Example: Outputs CPU architecture.

// ? os.networkInterfaces() Method
/**
 * The `os.networkInterfaces()` method returns the network interfaces of the operating system.
 */
console.log(os.networkInterfaces()); // ! Outputs detailed network interface information.

// ? os.release() Method
/**
 * The `os.release()` method returns the release version of the operating system.
 */
console.log(os.release()); // ! Example: Outputs OS release version.

//! Additional Information:
// ? There are many more methods in the OS module.
// * Refer to the official documentation for more details:
// TODO: Documentation: https://nodejs.org/api/os.html
