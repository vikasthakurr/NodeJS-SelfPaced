# Installing Node.js & npm

## Option 1: Direct Install (Recommended for beginners)

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the installer — it includes both Node.js and npm
4. Follow the setup wizard (keep defaults)

## Option 2: Using nvm (Recommended for developers)

nvm (Node Version Manager) lets you install and switch between multiple Node.js versions easily.

### Windows

1. Download nvm-windows from [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
2. Run the installer
3. Open a new terminal and run:

```bash
nvm install lts
nvm use lts
```

### macOS / Linux

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal, then:
nvm install --lts
nvm use --lts
```

## Verify Installation

Open your terminal and run:

```bash
node --version
npm --version
```

You should see version numbers like `v20.x.x` and `10.x.x`.

## npm vs npx

| Command | What it does |
|---------|--------------|
| `npm` | Installs and manages packages |
| `npx` | Runs a package without installing it globally |

```bash
# npm — install a package
npm install express

# npx — run a package directly (useful for one-time tools)
npx create-react-app my-app
```

## Quick Tips

- Always use the **LTS** version for stability
- If you're working on multiple projects, use **nvm** so you can switch versions per project
- npm comes bundled with Node.js — no separate install needed
- Run `npm -v` anytime to confirm npm is working
