// ============================================
// 1.4 — Understanding package.json
// ============================================

// package.json is the ID CARD of your Node.js application.
// Just like an ID card tells who you are, package.json tells
// what your app is, what it needs, and how to run it.

// To create one: npm init (interactive) or npm init -y (defaults)

// ============================================
// package.json — Field by Field Breakdown
// ============================================

// {
//   "name": "my-app"           → Name of your project (lowercase, no spaces)
//   "version": "1.0.0"         → Semantic versioning: major.minor.patch
//   "description": "..."       → Short summary of what the app does
//   "main": "index.js"         → Entry point — the file that runs first
//   "type": "module"           → "module" = ES modules (import/export)
//                                 "commonjs" = require/module.exports (default)
//
//   "scripts": {               → Custom commands you can run with `npm run <name>`
//     "start": "node index.js"       → npm start (no 'run' needed for start/test)
//     "dev": "nodemon index.js"      → npm run dev
//     "test": "jest"                 → npm test
//   }
//
//   "dependencies": {          → Packages your app NEEDS to run in production
//     "express": "^5.2.1"           → installed with: npm install express
//   }
//
//   "devDependencies": {       → Packages needed ONLY during development
//     "nodemon": "^3.1.14"          → installed with: npm install nodemon --save-dev
//   }
//
//   "keywords": []             → Tags for npm search (if you publish the package)
//   "author": "vikas thakur"   → Who made this
//   "license": "ISC"           → License type (ISC, MIT, etc.)
//   "repository": {}           → Link to your GitHub repo
//   "homepage": ""             → Project website or docs URL
//   "bugs": {}                 → Where to report issues
// }

// ============================================
// dependencies vs devDependencies
// ============================================

// dependencies     → Your app breaks without these (express, mongoose, etc.)
// devDependencies  → Only for development (nodemon, jest, eslint, etc.)
//                    NOT included when someone installs your package

// Install commands:
// npm install express          → goes to dependencies
// npm install nodemon -D       → goes to devDependencies (-D is shorthand for --save-dev)

// ============================================
// Version Numbers — What do ^, ~, * mean?
// ============================================

// "express": "^5.2.1"
//   ^  → allows minor + patch updates (5.2.1, 5.3.0, 5.9.9 — but NOT 6.0.0)
//   ~  → allows only patch updates (5.2.1, 5.2.2, 5.2.9 — but NOT 5.3.0)
//   *  → any version (dangerous — avoid in production)
//   no prefix → exact version only

// ============================================
// package-lock.json — What is it?
// ============================================

// package-lock.json is the EXACT snapshot of your dependency tree.
//
// Why it exists:
// - package.json says "I need express ^5.2.1" (a range)
// - package-lock.json says "I installed express 5.2.1 exactly, and here are
//   ALL its sub-dependencies with their exact versions"
//
// Key points:
// 1. Auto-generated — never edit it manually
// 2. Commit it to git — ensures everyone on the team gets the same versions
// 3. npm install reads lock file first → guarantees reproducible installs
// 4. npm update → updates packages within allowed range and rewrites lock file
//
// Think of it this way:
//   package.json      = "I want these ingredients"
//   package-lock.json = "Here's the exact brand, batch, and quantity I used"

// ============================================
// node_modules/ — Where packages live
// ============================================

// When you run npm install, packages download into node_modules/
// NEVER commit node_modules to git — add it to .gitignore
// Anyone can recreate it by running: npm install

// ============================================
// Useful npm commands
// ============================================

// npm init -y              → Create package.json with defaults
// npm install              → Install all dependencies from package.json
// npm install <pkg>        → Add a package to dependencies
// npm install <pkg> -D     → Add a package to devDependencies
// npm uninstall <pkg>      → Remove a package
// npm update               → Update packages within version range
// npm list                 → See installed packages
// npm run <script>         → Run a custom script

// ============================================

console.log("Hello World!");
console.log("Run 'npm init -y' in any folder to create your own package.json");
