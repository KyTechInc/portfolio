# Kyle McCracken - Portfolio

A modern, responsive portfolio website built with [Next.js 15](https://nextjs.org), [React 19](https://react.dev), and [TypeScript](https://www.typescriptlang.org), [Shadcn UI](https://ui.shadcn.com), [ReUI](https://reui.io/) and more!

## ✨ Features

- **🚀 Next.js 15** with App Router and Server Components
- **🎨 Modern UI** with Tailwind CSS, Shadcn/ReUI and custom animations
- **📱 Fully Responsive** design optimized for all devices
- **🔍 SEO Optimized** with comprehensive metadata, Open Graph, and structured data
- **📝 MDX Blog** with dynamic content and syntax highlighting
- **🎯 Interactive Elements** including animated dock, terminal UI, and more
- **🎨 Dark/Light Theme** with system preference detection
- **⚡ Performance Optimized** with proper code splitting and caching
- **🔒 Type Safe** with full TypeScript support
- **📊 Analytics Ready** with proper tracking setup

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Bun (recommended) or npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables (see Configuration section below)

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## ⚙️ Configuration

Create a `.env.local` file in the root directory with the following variables:

### Required Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
AUTHOR_NAME=Your Name
AUTHOR_EMAIL=your-email@example.com
TWITTER_HANDLE=@yourusername

# External Services

# Logo.dev
NEXT_PUBLIC_LOGO_DEV_TOKEN=your-logo-dev-token

```

## 📊 SEO & Performance

This portfolio includes comprehensive SEO optimization:

### ✅ SEO Features Implemented

- **📄 Dynamic Metadata** for all pages with proper Open Graph tags
- **🖼️ Open Graph Images** with fallbacks and proper sizing
- **📱 Twitter Cards** with large image previews
- **🔍 Structured Data** (JSON-LD) for Person, WebSite, and Article schemas
- **🤖 Sitemap Generation** with proper priorities and change frequencies
- **🚫 Robots.txt** with appropriate directives
- **📈 Viewport Configuration** for mobile optimization
- **🎯 Canonical URLs** to prevent duplicate content issues
- **🔒 Security Headers** and proper meta directives

### 🔧 SEO Utilities

The `/lib/metadata.ts` file provides:

- **generateMetadata()** - Flexible metadata generation with Open Graph support
- **generateArticleMetadata()** - Specialized function for blog posts
- **generateStructuredData()** - Creates JSON-LD structured data
- **SITE_CONFIG** - Centralized site configuration

## 📁 Project Structure

```
kyle-mccracken/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog section
│   │   ├── [slug]/        # Dynamic blog posts
│   │   └── page.tsx       # Blog listing
│   ├── tech/              # Technology stack
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── hero.tsx          # Homepage hero section
│   ├── about-hero.tsx    # About page hero
│   ├── current.tsx       # Project showcase
│   └── ...               # Other components
├── lib/                   # Utility functions
│   ├── metadata.ts       # SEO and metadata utilities
│   ├── articles.ts       # Blog content management
│   └── utils.ts          # General utilities
├── content/              # MDX blog content
└── public/               # Static assets
```

## 🎨 Customization

### Adding New Pages

1. Create a new route in the `app/` directory
2. Add metadata using the `generateMetadata()` utility
3. Include structured data if applicable
4. Update the sitemap and navigation

### Blog Posts

1. Create a new folder in `content/` with a `page.mdx` file
2. Define the article metadata in the MDX file
3. The system will automatically generate SEO metadata

### Styling

- Uses Tailwind CSS with custom design system
- Dark/light theme support
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Custom animations and transitions

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Analysis**: Tree-shaken and optimized bundles
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting

## 🔧 Development

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run type-check   # Run TypeScript type checking
```

### Code Quality

- **ESLint** with Next.js and TypeScript rules
- **Prettier** for code formatting
- **TypeScript** strict mode enabled
- **Biome** for fast linting and formatting

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue on GitHub or contact me through the website.

---

**Built with ❤️ using Next.js 15, React 19, and TypeScript**
