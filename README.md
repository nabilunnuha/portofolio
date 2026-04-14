# Nabilunnuha — Developer Portfolio

> Personal portfolio website showcasing my journey as a Self-taught Full Stack Developer — built with modern frontend tooling and deployed on Vercel.

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)

---

## 📌 About

This is my personal portfolio website — a place to share who I am, what I build, and the technologies I work with. I'm a **Self-taught Full Stack Developer** since 2021, specializing in **Python** and **TypeScript**. The site covers my background, skills, and projects across the full stack.

- 🔗 **Live site:** [nabilunnuha.vercel.app](https://nabilunnuha.vercel.app)
- 💼 **LinkedIn:** [linkedin.com/in/nabilunnuha](https://linkedin.com/in/nabilunnuha)
- 🐙 **GitHub:** [github.com/nabilunnuha](https://github.com/nabilunnuha)
- 📧 **Email:** nabilunnuha@gmail.com

---

## 🛠️ Tech Stack

| Layer             | Technology             |
| ----------------- | ---------------------- |
| **Framework**     | React 18 + Vite        |
| **Language**      | TypeScript             |
| **UI Library**    | Mantine UI             |
| **Routing**       | TanStack Router        |
| **Data Fetching** | TanStack Query + Axios |
| **Animations**    | Framer Motion          |
| **Icons**         | Tabler Icons React     |
| **Deployment**    | Vercel                 |

---

## ✨ Features

- ⚡ Fast page loads with Vite bundling
- 🎨 Clean UI powered by Mantine component library
- 🔀 Client-side routing with TanStack Router (no 404 on refresh)
- 📡 Data fetching with TanStack Query + Axios
- 🎞️ Smooth page & component animations with Framer Motion
- 📱 Fully responsive layout
- 🌙 Light / Dark mode support

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nabilunnuha/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📁 Project Structure

```
src/
│   index.css
│   main.tsx
│   routeTree.ts
│
├───api
│       axiosInstance.ts
│       portfolio.ts
│
├───components
│       AnimatedPage.tsx
│       GaleryModal.tsx
│       GlassCard.tsx
│       NotFound.tsx
│       SectionHeader.tsx
│       TechBadge.tsx
│       TypewriterText.tsx
│
├───hooks
│       useDocumentTitle.ts
│       usePortfolio.ts
│
└───routes
        about.tsx
        blog.tsx
        contact.tsx
        index.tsx
        projects.tsx
        __root.tsx
```

---

## 🌐 Deployment (Vercel)

This project is deployed on **Vercel**. A `vercel.json` config is included to ensure client-side routing works correctly — direct URL access like `/about` or `/projects` won't return 404.

```json
{
	"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Every push to `main` triggers an automatic re-deploy on Vercel.

---

## 🧰 Skills Showcased

```
Python          TypeScript      JavaScript
React           Vite            FastAPI
REST API        Automation      Web Scraping
File Processing Desktop Apps    VPS & Self-Hosting
Microservices
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/nabilunnuha">nabilunnuha</a></p>
