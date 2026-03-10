# Nakshi AI — AI Jewelry Photography via WhatsApp

> **India's First AI Jewelry Photography Bot** — Turn any jewelry photo into a professional model shot in 60 seconds, right from WhatsApp.

---

## What is Nakshi AI?

Nakshi AI is a WhatsApp-based AI service for Indian jewelry sellers. Send a photo of any jewelry piece to the Nakshi AI WhatsApp bot and receive a photorealistic model shot back in under 60 seconds — no studio, no photographer, no app required.

### Key Features

- **Jewelry on Model** — Send any phone photo and get it back on a professional model in under 60 seconds
- **Gemstone Color Swap** — Show any piece in Ruby, Emerald, Sapphire, and Diamond without making four separate pieces
- **Batch Processing** — Send up to 10 images at once and get all 10 back on models in under a minute
- **WhatsApp-Only** — No app to install, just use WhatsApp

---

## Pricing

| Plan | Price | Images/Month | Highlights |
|------|-------|-------------|------------|
| Starter | ₹699/mo | 40 images | 3 model options, gemstone & metal swap |
| Growth ⭐ | ₹1,799/mo | 150 images | 8 model options, batch of 5, priority queue |
| Pro | ₹3,999/mo | 400 images | Batch of 10, catalog shoot mode, custom prompts |

---

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Backend**: Supabase
- **Package Manager**: npm / bun

---

## Getting Started

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd nakshi-gem-studio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The dev server will start at `http://localhost:8080`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # UI components
│   ├── ui/          # shadcn/ui base components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesGrid.tsx
│   ├── PricingTeaser.tsx
│   └── ...
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── Index.tsx    # Landing page
│   ├── FAQ.tsx
│   ├── Privacy.tsx
│   └── Terms.tsx
└── lib/             # Utility functions
```

---

## Made with 🙏 for Indian Jewelers

© Nakshi AI · AI-Powered Jewelry Photography via WhatsApp
