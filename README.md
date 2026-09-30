# NOVA AI

NOVA AI is a premium, modern AI chatbot application powered by the Google Gemini API. It features a beautiful, responsive dark/light theme, robust conversation memory, local chat history, and professional UI/UX design.

## Features

- 🧠 **Google Gemini AI Integration** (gemini-1.5-flash)
- 💾 **Local Conversation History** (localStorage)
- 🎨 **Premium UI/UX** with glassmorphism and subtle animations
- 🌗 **Dark / Light / System Theme**
- 📱 **Fully Responsive** (Sidebar drawer on mobile)
- 📝 **Markdown & Code highlighting**
- 📋 **Copy Code & Copy Messages**
- ♻️ **Regenerate Responses**

## Screenshots

*(Placeholder for screenshots)*

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express.js, CORS, dotenv
- **AI:** `@google/generative-ai`

## Project Structure

- `/client` - Frontend React application (Vite)
- `/server` - Backend Node/Express API

## Installation

1. Open the folder in VS Code
2. Run `npm install` in the root folder (this will install concurrently)
3. Navigate to `server` and run `npm install`
4. Navigate to `client` and run `npm install`
*(Note: If you encounter issues, simply run `npm install` in all three directories: root, server, and client).*

## Environment Variables

1. Go to the `server/` directory.
2. Open the `.env` file (or copy `.env.example` to `.env`).
3. Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

## How to Run

From the root directory, run:

```bash
npm run dev
```

This will concurrently start:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

Open http://localhost:5173 in your browser to start chatting with NOVA AI.

## Available API Endpoints

- `POST /api/chat` - Send a message to Gemini. Expects `{ "message": "...", "conversation": [...] }`

## Troubleshooting

- **Missing API Key:** Ensure your `server/.env` file exists and has a valid `GEMINI_API_KEY`.
- **CORS Error:** Ensure the backend is running on port 5000 and the frontend is on port 5173.

## Future Improvements

- User authentication (e.g., Firebase)
- Cloud database for chat history (e.g., MongoDB)
- Attachments and Voice Input (UI placeholders present)

## Portfolio Usage

This project was built to demonstrate full-stack AI application development with a focus on modern React patterns, Node API structure, and responsive design.
