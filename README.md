# AegisSentinel Landing Page

A high-converting landing page built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

🌐 Live: [aegissentinel.no](https://aegissentinel.no)

## ✨ Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for smooth animations
- 📱 **Fully Responsive** design
- 🔍 **SEO Optimized** with metadata
- 🌙 **Dark Mode** by default
- ♿ **Accessible** components
- 📊 **Conversion Optimized** layout

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustedBy.tsx
│   │   ├── Problem.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Tokenomics.tsx
│   │   ├── Roadmap.tsx
│   │   └── Waitlist.tsx
│   └── ui/
│       ├── Terminal.tsx
│       ├── SectionHeader.tsx
│       └── CodeBlock.tsx
└── lib/
    └── utils.ts        # Utility functions
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  primary: {
    DEFAULT: '#6366f1',
    hover: '#818cf8',
  },
  // ...
}
```

### Content

All section content is in `/src/components/sections/`. Each section is a self-contained component with its own data.

### Fonts

Fonts are loaded in `app/layout.tsx` using `next/font`:
- **Inter** - Body text
- **JetBrains Mono** - Code blocks

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Other Platforms

```bash
npm run build
npm start
```

The build output is in `.next/` folder.

## 📧 Waitlist Integration

The waitlist form in `/src/components/sections/Waitlist.tsx` simulates an API call. To connect a real backend:

### Option 1: Formspree
```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Option 2: Custom API
Create an API route at `/app/api/waitlist/route.ts`:

```ts
export async function POST(req: Request) {
  const { email } = await req.json()
  // Save to database
  return Response.json({ success: true })
}
```

### Option 3: Supabase
```tsx
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(URL, KEY)
await supabase.from('waitlist').insert({ email })
```

## 📊 Analytics

Add analytics in `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 📄 License

MIT License

---

Built with 🛡️ by the AegisSentinel Team
