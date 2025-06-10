# 📒 NoteVibes

A digital note-taking app built with React and Tailwind CSS, featuring authentication, theme & language contexts, and blazing-fast performance using Vite.

## 🚀 Features

* 🔐 Authentication (Login & Register)
* 📝 Add & view notes
* 🧱 Reusable UI components (Button, Input, Toast, etc.)
* 🌗 Dark/Light mode toggle
* 🌐 Multi-language support
* 🔒 Protected routes
* 💾 Data persisted in API & localStorage

## 🛠️ Tech Stack

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* React Context API

## 🧩 Project Structure

```
├── src
│   ├── components
│   │   ├── auth/          # Login & Register forms
│   │   ├── common/        # Reusable UI components
│   │   ├── layout/        # Header & Navigation
│   │   └── notes/         # NoteCard, NoteForm, NotesList
│   ├── contexts/          # Auth, Theme, Language contexts
│   ├── hooks/             # Custom hooks (e.g. useInput, useLocalStorage)
│   ├── pages/             # Page views (AddNotePage, etc)
│   └── App.jsx
```

## ⚙️ Getting Started

1. Clone the repository

```bash
git clone https://github.com/ranggamyd/notevibe.git
```

2. Navigate to the project folder

```bash
cd notevibe
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

## 🤓 Extra Notes

* State & context are cleanly separated for scalability.
* Toasts and dialogs are plug-and-play — no fuss.
* Adding new features? Just drop in a page or a component.

---

Made with 💻 by the most note-obsessed dev ever ✨

---

> Wanna build dark mode, multi-language, and slick UI? Check the code first before talking 😉
