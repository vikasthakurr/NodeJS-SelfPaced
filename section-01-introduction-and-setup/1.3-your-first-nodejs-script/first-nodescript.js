// ============================================
// 1.3 — Your First Node.js Script
// ============================================

// To run this file: open terminal and type
// node first-nodescript.js

// --------------------------------------------
// console.log() works the same as in browser JS
// --------------------------------------------
console.log("hello from geeksforgeeks");

// --------------------------------------------
// Global objects available in Node.js (not in browser)
// --------------------------------------------

// __dirname → absolute path of the folder containing this file
console.log("Directory:", __dirname);

// __filename → absolute path of this file itself
console.log("File:", __filename);

// process → info about the current Node.js process
console.log("Node version:", process.version);
console.log("Platform:", process.platform);

// process.argv → command line arguments passed to the script
// Try: node first-nodescript.js hello world
console.log("Arguments:", process.argv);

// --------------------------------------------
// Key differences from browser JS:
// --------------------------------------------
// 1. No window, document, or DOM — this is server-side
// 2. We get process, __dirname, __filename, require, module
// 3. Code runs on V8 engine (same as Chrome) but outside the browser
// 4. We can access the file system, network, OS — things browsers can't do
