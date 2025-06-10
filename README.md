# 📒 React Notes App

Ini project catatan digital yang dibangun pakai React + Tailwind CSS, lengkap dengan fitur autentikasi dan multi-context (tema & bahasa). Dibuat pake Vite biar ngebut!

## 🚀 Fitur Unggulan

* 🔐 Autentikasi (Login & Register)
* 📝 Tambah & lihat catatan
* 🧱 Komponen UI reusable (Button, Input, Toast, dsb)
* 🌗 Tema gelap/terang
* 🌐 Dukungan multi bahasa
* 🔒 Protected route
* 💾 Simpan data di localStorage

## 🛠️ Stack Teknologi

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* React Context API

## 🧩 Struktur Folder

```
├── src
│   ├── components
│   │   ├── auth/          # Login & Register form
│   │   ├── common/        # Reusable UI components
│   │   ├── layout/        # Header & Navigation
│   │   └── notes/         # NoteCard, NoteForm, NotesList
│   ├── contexts/          # Auth, Theme, Language
│   ├── hooks/             # Custom hooks (e.g. useInput, useLocalStorage)
│   ├── pages/             # Page views (AddNotePage, etc)
│   └── App.jsx
```

## ⚙️ Cara Jalanin Project

1. Clone repo ini

```bash
git clone <link-repo-anda>
```

2. Masuk ke folder project

```bash
cd nama-folder
```

3. Install dependencies

```bash
npm install
```

4. Jalanin project

```bash
npm run dev
```

## 🤓 Catatan Tambahan

* State & context udah dipisah rapi, tinggal gas buat scaling.
* Toast & dialog tinggal panggil komponen, no ribet-ribet.
* Buat nambah fitur tinggal tambahin page dan komponen aja.

---

Made with 💻 by orang paling rajin nulis catatan ✨

---

> Mau bikin dark mode, multi bahasa, dan UI kece? Sini liat kodenya dulu, baru komentar 😎
