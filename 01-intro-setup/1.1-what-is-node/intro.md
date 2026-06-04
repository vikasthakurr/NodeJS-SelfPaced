# What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's V8 engine that lets you run JavaScript outside the browser — on servers, desktops, and anywhere else.

Before Node.js, JavaScript could only run inside a browser. Node changed that.

---

## Brief History

| Year | Event |
|------|-------|
| 1995 | JavaScript created by Brendan Eich at Netscape (in 10 days) |
| 2008 | Google releases V8 — a blazing fast JS engine for Chrome |
| 2009 | **Ryan Dahl creates Node.js** — takes V8 out of the browser and adds file system, networking, and OS access |
| 2010 | npm (Node Package Manager) is introduced |
| 2015 | Node.js Foundation formed, io.js merges back into Node |
| 2019 | Node.js Foundation merges with JS Foundation → OpenJS Foundation |
| Today | Node.js powers backends at Netflix, PayPal, LinkedIn, Uber, NASA, and millions of apps worldwide |

---

## Why was Node.js created?

Traditional servers (like Apache) used a **thread-per-request** model:
- Each incoming request gets its own thread
- Threads are expensive — memory, CPU context switching
- Under heavy load, the server runs out of threads and slows down

Ryan Dahl wanted something better for **I/O heavy** applications (APIs, real-time apps, file servers) where most time is spent waiting — waiting for database, waiting for file read, waiting for network response.

His solution: **non-blocking, event-driven architecture**.

---

## How Node.js Works

### The V8 Engine

- Written in C++ by Google
- Compiles JavaScript directly to machine code (no interpreter)
- Same engine that makes Chrome fast — now powers your server

### Single-Threaded Event Loop

```
   ┌───────────────────────────┐
   │        Your Code          │
   │   (single JS thread)      │
   └─────────────┬─────────────┘
                 │
                 ▼
   ┌───────────────────────────┐
   │       Event Loop          │
   │  (checks for completed    │
   │   async operations)       │
   └─────────────┬─────────────┘
                 │
                 ▼
   ┌───────────────────────────┐
   │    libuv Thread Pool      │
   │  (handles heavy I/O:      │
   │   file system, DNS,       │
   │   compression, etc.)      │
   └───────────────────────────┘
```

**How it flows:**
1. A request comes in
2. Node handles it on the main thread
3. If it needs I/O (read file, query DB), it delegates to the background (libuv)
4. Node doesn't wait — it moves on to the next request
5. When the I/O finishes, a callback fires and Node processes the result

This is why Node can handle **thousands of concurrent connections** with a single thread.

---

## Node.js vs Browser JavaScript

| Feature | Browser JS | Node.js |
|---------|-----------|---------|
| DOM access | Yes (document, window) | No |
| File system | No | Yes (fs module) |
| Network/servers | Limited (fetch, XHR) | Full (http, net, dgram) |
| OS access | No | Yes (os, child_process) |
| Module system | ES Modules | CommonJS + ES Modules |
| Package manager | None built-in | npm / yarn / pnpm |
| Use case | UI in browser | Servers, CLI tools, scripts |

---

## When to use Node.js

Node.js is great for:
- REST APIs and GraphQL servers
- Real-time apps (chat, live notifications, gaming)
- Microservices
- CLI tools
- Streaming applications
- Server-side rendering (Next.js, Nuxt)

Node.js is NOT ideal for:
- CPU-heavy computation (video encoding, machine learning, image processing)
- These block the single thread — use Python, Go, or Rust instead
- (Or use Worker Threads in Node for CPU tasks)

---

## Key Concepts to Remember

1. **Runtime, not a language** — Node.js runs JavaScript, it's not a new language
2. **Non-blocking I/O** — doesn't wait for slow operations, uses callbacks/promises
3. **Event-driven** — everything revolves around events and the event loop
4. **Single-threaded** — one main thread, but delegates heavy work to background threads via libuv
5. **npm ecosystem** — largest package registry in the world (2M+ packages)

---

## One-liner summary

> Node.js = V8 engine + libuv + a set of built-in modules that let JavaScript talk to the operating system.
