# Better Within – AI Engines

This repository contains the three core AI engines for the Better Within app:
1. **Recommendation Engine**  
2. **Content Generator**  
3. **Cultural Adaptation Module**

Each engine is a self-contained module with a unified interface, orchestrated by `index.js`.

---

## 📦 Project Structure

\`\`\`
/engines
  /recommendation
    ├── index.js            # exports scoreAndSelect, shouldTrigger, formatMessage
    └── package.json
  /content-generator
    ├── index.js            # exports findEmptyCards, generateLesson, saveContent
    └── package.json
  /cultural-adapter
    ├── index.js            # exports enrich, serveIfRequested
    └── package.json
  index.js                  # Orchestrator wiring all three engines
  README.md                 # This file
\`\`\`

---

## 🚀 Getting Started

1. **Install dependencies**  
   \`\`\`bash
   cd recommendation && npm install
   cd ../content-generator && npm install
   cd ../cultural-adapter && npm install
   \`\`\`
   Or use npm/yarn workspaces for a monorepo setup.

2. **Configure Vercel**  
   - Ensure this repo is connected via GitHub integration  
   - Add any needed Environment Variables under **Project ➔ Settings ➔ Environment Variables**

3. **Deploy**  
   Pushing to `main` will trigger Vercel to build and deploy each engine as a serverless function.
\`\`\`

Now, let's create a TypeScript interface to connect the frontend with these AI engines:
