# 🧮 Counter Test Assignment

Welcome to the **Counter Test Assignment**! This project demonstrates a clean architecture with **TypeScript**, **Node.js**, and **React**, following **SOLID principles** and **OOP concepts**. It is designed to be **transport-agnostic**, supporting HTTP, WebSocket, and CLI interfaces seamlessly.  

---

## 🎯 Project Requirements

### **General**
- All code is written in **TypeScript**.
- Follows **SOLID principles**, **OOP concepts**, and **design patterns**.
- Minimal usage of external libraries.

### **Backend**
- Node.js backend application.
- Supports **multiple transport layers**:
  - **HTTP** and **Command-Line** using built-in Node.js modules.
  - **WebSocket** using the **WS library**.
- Designed to be **easily extendable** for new transport types.
- Handles operations: **increment**, **decrement**, **current value**.

### **Frontend**
- Single Page Application (**SPA**) using **React**.
- Supports switching between **HTTP** and **WebSocket** communication.
- Clean UI with **real-time updates** from backend.
- Built with **TypeScript** for type safety.

---

## ⚡ Features

- 🔄 **Transport-agnostic**: easily switch between HTTP, WebSocket, or CLI.
- 🖥️ **SPA frontend** with responsive and interactive counter.
- 📦 **Backend API** following clean OOP and SOLID design.
- 💾 **Persistent state** in memory or via session (depending on transport).
- 🧩 **Modular architecture**, easy to extend.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, TypeScript, WS library (WebSocket)
- **Frontend**: React, TypeScript, CSS Modules
- **Build tools**: Vite, npm
---

## 🚀 Getting Started

### **Backend**
```bash
cd backend
npm install
npm run dev:ws
npm run dev:http
npm run dev:cli
```

### **Frontend**
```bash
cd frontend
npm install
npm run dev
```
