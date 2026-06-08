# 🧠 Thought Nest (Frontend)

Thought Nest is a simple idea and thought management app where users can save, organize, and revisit their ideas anytime. It is designed to help you capture thoughts quickly so you don’t forget them when building projects or collaborating with others.

This is the **frontend application** built for interacting with the Thought Nest API.

---

## ✨ Features

- 🔐 User authentication (login/register/logout)
- 📝 Create, read, update, and delete thoughts/ideas (CRUD)
- 📋 View list of saved ideas
- 📄 Detailed view for each idea
- ⚡ Fast and responsive UI
- 🔄 API integration with backend service

---

## 🛠️ Tech Stack

- React / Vite _(or your actual setup if different)_
- TypeScript
- React Router / TanStack Router
- React Query (data fetching & caching)
- Axios (API requests)
- Tailwind CSS (styling)
- Lucide Icons

---

## 📁 Project Structure

```bash
src/
│
├── api/            # API calls (auth, ideas, etc.)
├── components/     # Reusable UI components
├── routes/         # App routes (TanStack Router)
├── context/        # Context API for auth
├── lib/            # Axios and token handlers
└── main.tsx        # App entry point
```
