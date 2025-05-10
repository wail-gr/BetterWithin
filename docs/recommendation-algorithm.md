# BetterWithin Recommendation Algorithm 🧠🕊️

This is the custom AI-powered content recommendation system for the **BetterWithin** app — combining neuroscience, emotional psychology, Islamic wisdom, prophetic medicine, and user behavior to deliver deeply healing, personalized lessons.

## ✨ Purpose

The algorithm intelligently recommends article-like answers (2–3 pages max) when a user searches a topic in the **Lessons section** of the app. It integrates:

- ✅ Modern scientific findings (e.g. dopamine in addiction)
- ✅ Islamic sources (Al-Ghazali, Ibn Qayyim, Prophetic Medicine)
- ✅ Charts, diagrams, and summaries for clarity
- ✅ Emotional tone tagging (calming, reflective, grounding)
- ✅ Real-time feedback learning (likes, saves, time spent)

## 📦 Contents

The recommendation system consists of:

1. Python API endpoints (`/api/recommend.py` and `/api/feedback.py`)
2. TypeScript interface (`/utils/recommendation-api.ts`)
3. React hook for easy integration (`/hooks/use-recommendations.tsx`)
4. UI component (`/components/lesson-recommendations.tsx`)

## 🚀 How to Deploy on Vercel

This project is designed to run as an **API handler** (serverless function) on Vercel using **Python (via FastAPI)**.

### Requirements

To deploy the Python API handlers, you'll need to:

1. Add a `requirements.txt` file in the root directory with:
   \`\`\`
   fastapi
   uvicorn
   \`\`\`

2. Add a `vercel.json` file in the root directory:
   \`\`\`json
   {
     "functions": {
       "api/*.py": {
         "runtime": "python3.9"
       }
     }
   }
   \`\`\`

3. Deploy to Vercel using the Vercel CLI or GitHub integration
\`\`\`

Let's create a vercel.json file for the Python API:
