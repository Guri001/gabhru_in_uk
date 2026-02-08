# Gabhru in UK - Landing Page

A modern, high-conversion landing page for Gabhru in UK, built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 📱 Mobile-first responsive design
- 🎨 Premium UI with glassmorphism and smooth animations
- ⚡ Fast performance (Next.js App Router)
- 📝 Contact form with Zod validation
- 🔍 SEO optimized

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

## Project Structure

- `/app`: Pages and layouts (App Router)
- `/components/sections`: Landing page sections (Hero, About, etc.)
- `/components/ui`: Reusable UI components (Button, Card, Input)
- `/lib`: Utility functions
- `/public`: Static assets

## Customization

- **Colors & Fonts:** Edit `tailwind.config.ts` and `app/layout.tsx`.
- **Content:** Update text in individual section components (e.g., `components/sections/Hero.tsx`).
