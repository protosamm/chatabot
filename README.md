# chatAbot

Live Demo:- https://chatabot-tau.vercel.app/

This repository contains a full-stack chatbot application built with a Node.js/Express backend and a React/Vite frontend. The API handles authentication, chat management, and integration with generative AI services (e.g., Google Generative AI). The frontend provides a dynamic chat interface using modern React features.

## 🚀 Technologies

- **Backend**: Node.js, Express, MongoDB (via Mongoose), JWT for auth, bcryptjs, CORS, dotenv
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios, React Markdown, Toastify
- **AI integration**: `@google/generative-ai` (or similar)

## 📁 Project Structure

```
backend/                 # Node/Express API
  config/               # DB and other configs
  controllers/          # Route handlers
  middlewares/          # Auth middleware
  models/               # Mongoose schemas
  routers/              # Express routers
  utils/                # Helper utilities (e.g. Gemini utils)
  server.js             # App entry point
  package.json

frontend/                # React/Vite client
  public/
  src/
    assets/
    components/         # UI components
    config/             # Markdown components, etc.
    contexts/           # React contexts (Auth)
    pages/              # Page layouts (Chat, Login, Register)
    routes/             # Public/Private route wrappers
    services/           # Axios API wrapper
  package.json
  vite.config.js
```

## 🧩 Environment Variables

Backend `.env` (not committed):

```
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<secret for JWT tokens>
PORT=5000          # optional, defaults to 5000
```

Frontend `.env` (or set in Vercel):

```
VITE_API_URL=http://localhost:5000/api      # change to deployed API URL
```

## 🔧 Local Development

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run start        # uses nodemon for live reload
   ```
   The server listens on `http://localhost:5000` by default.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev          # start Vite dev server
   ```
   Open `http://localhost:5173` (or the address shown) in your browser.

Both servers must be running to use the app locally. Login/register, then start chatting.

## ⚙️ Deployment

### Backend (Render)

1. Push your repo to GitHub.
2. On [Render](https://render.com), create a new **Web Service** pointing to the `backend` folder.
3. Set build command to `npm install` and start command to `npm start`.
4. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) in the Render dashboard.
5. Render will build and start your API; note the generated URL (e.g. `https://your-backend.onrender.com`).

### Frontend (Vercel)

1. On [Vercel](https://vercel.com), import the same repository and select the `frontend` directory.
2. Choose the **Vite** framework preset; set build command `npm run build` and output directory `dist`.
3. Add the environment variable `VITE_API_URL` pointing to your Render backend URL (e.g. `https://your-backend.onrender.com/api`).
4. Deploy the project. Vercel assigns a `.vercel.app` domain which you can customize.

> **CORS**: The API uses `cors()` by default, but you may restrict origins with the frontend URL if desired.

## 📦 Scripts

**Backend** (in `backend/package.json`):

- `npm run start` – start server with Node (production)
- `npm run test` – placeholder

**Frontend** (in `frontend/package.json`):

- `npm run dev` – run development server
- `npm run build` – production build
- `npm run preview` – locally preview production build
- `npm run lint` – run ESLint

## 🛠️ Notes & Tips

- Keep secrets out of version control. Use `.env` and deployment platform variables.
- Change the API base URL in `src/services/api.js` to support different environments; it already reads from `import.meta.env.VITE_API_URL`.
- Ensure that your MongoDB instance accepts connections from Render (IP whitelist or VPC).

## 📄 License

This project is open source; feel free to adapt it as needed.

---

Happy coding! 😊
