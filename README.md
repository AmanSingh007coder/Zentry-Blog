# ✍️ Zentry Blog

> **A modern, full-stack blogging platform built for community engagement and content creation.**

Zentry is a robust MERN stack application that goes beyond simple blogging. It features a complete content management system, role-based authentication, interactive community tools, and a sleek, responsive UI. Whether you're a writer looking to share ideas or an admin managing a community, Zentry provides the tools you need.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://zentry-blog.vercel.app](https://zentry-blog.vercel.app)
- **Backend (Render):** [https://zentry-blog-backend.onrender.com](https://zentry-blog-backend.onrender.com)

---

## ✨ Key Features

### Authentication & Security
- **Dual Login System:** Sign up via email/password (JWT secured) or **Google Sign-In** (Firebase Auth).
- **Role-Based Access Control (RBAC):** Distinct permissions for `Users` and `Admins`.
- **Secure Routes:** Protected API endpoints ensuring data integrity.

### Content Creation
- **Rich Text Editor:** Integrated **Tiptap** editor allowing bold, italics, lists, code blocks, and more.
- **Media Management:** Seamless image uploads powered by **Cloudinary**.
- **Drafts & Publishing:** Create content your way.

### Community Engagement
- **Interactive Comments:** Users can discuss posts in real-time.
- **Bookmarks:** "Save for Later" feature to build a personal reading list.
- **User Stats:** Profile dashboard showing total posts, comments written, and comments received.
- **Social Sharing:** Integrated sharing to WhatsApp and LinkedIn.

### Discovery & UX
- **Advanced Search:** Full-text search functionality powered by MongoDB indexes.
- **Category Browsing:** Auto-scrolling marquee categories for easy discovery.
- **Responsive Design:** Mobile-first architecture with a custom "floating" navbar.
- **Newsletter:** Subscription form integrated with **Brevo** (Sendinblue) for email marketing.

### Admin Panel
- **User Management:** View all users and ban/delete accounts.
- **Content Moderation:** View, edit, or delete *any* post on the platform.
- **Cascading Deletes:** Deleting a user automatically cleans up their associated posts.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose), MongoDB Atlas |
| **Auth** | JWT, Firebase Admin SDK |
| **Services** | Cloudinary (Images), Brevo (Email), Render (Backend Hosting), Vercel (Frontend) |

---



