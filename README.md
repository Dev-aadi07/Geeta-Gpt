# 🕉️ KrishnAI — Ask the Gita

> A peaceful spiritual AI assistant that guides users with contextual wisdom from the **Bhagavad Gita**, powered by OpenAI and beautifully crafted in React + Tailwind CSS.

[🌐 Visit Live](https://geeta-gpt-pi.vercel.app)

---

## ✨ Features

- 🔮 Ask any life, emotional, or spiritual question — receive a matching Gita shloka
- 📖 Over 700 curated shlokas stored in optimized JSON format
- 🧠 GPT-3.5 turbo powered responses with fallback to exact verse if no match found
- 🎨 Beautiful UI with relaxing fonts, animations, and spiritual themes
- 🌤️ Random shloka popup on app load
- ⚡ Fast & lightweight (Vite + Tailwind)
- 🌐 SEO + social sharing optimized

---

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **AI Backend:** OpenAI API (GPT-3.5 Turbo)
- **Data Source:** Bhagavad Gita (18 JSON files, each per chapter)
- **Hosting:** Vercel

---

## 📦 Local Setup

```bash
git clone https://github.com/<your-username>/krishnai.git
cd krishnai
npm install

Project Structure
public
├── data/
│   └── chapter1.json ... chapter18.json
src/
├── components/
│   ├── KrishnAI.jsx       # Main chatbot logic
│   ├── Background.jsx     # Visual spiritual background
│   └── Intro.jsx          # Splash screen with random shloka
├── utils/
│   └── openAI.js          # GPT-3.5 Turbo integration logic
├── App.jsx
└── main.jsx

🌟 Credits
  🙏 Bhagavad Gita
  💡 OpenAI
  🛠️ Built by Adarsh Kumar Jha

❤️ Support
  If this helped you find peace or clarity, consider ⭐ starring the repo
  or sharing it with someone who may need a moment of spiritual guidance.
