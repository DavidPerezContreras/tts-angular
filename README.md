# 🗣️ Read Aloud

**Read Aloud** is a browser-based text-to-speech (TTS) application built with Angular in an Nx monorepo. It uses the [kokoro-js](https://www.npmjs.com/package/kokoro-js) library to run the Kokoro-82M TTS model entirely client-side via WebAssembly or WebGPU. The app is hosted on GitHub Pages for fast and free deployment.

---

## 🚀 Features

- ⚡ Built with Angular using standalone components
- 🧠 Powered by Kokoro TTS via `kokoro-js` and Transformers.js
- 🖥️ Runs 100% locally in the browser — no server required
- 🎙️ Select from multiple high-quality voices
- 🧪 WebGPU acceleration with fallback to WASM
- 📦 Hosted on GitHub Pages

---

## 🛠️ Tech Stack

- [Nx](https://nx.dev/) Monorepo
- [Angular](https://angular.io/)
- [kokoro-js](https://www.npmjs.com/package/kokoro-js)
- [GitHub Pages](https://pages.github.com/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/voiceapp.git
cd voiceapp
npm install
