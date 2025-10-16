# QuoteFast AI Dashboard

Een moderne SaaS platform voor offerte en factuur beheer met krachtige AI-integratie. Ontworpen voor het MKB om offertes sneller te maken met behulp van artificial intelligence.

## ✨ Features

- 🔐 **Supabase Authenticatie** - Veilige gebruikersbeheer met moderne auth flows
- 📊 **Intelligente Dashboard** - Real-time analytics en KPI monitoring
- 💰 **Offerte & Factuur Beheer** - Complete workflow van offerte tot betaling
- 🤖 **AI-Powered Tools** - Gemini AI integratie voor slimme content generatie
- ⚡ **Performance Monitoring** - Geavanceerde performance optimalisatie tools
- 📱 **Responsive Design** - Perfect op desktop, tablet en mobile
- 🌙 **Dark/Light Mode** - Automatische thema detectie
- 🚀 **Real-time Updates** - Live data synchronisatie
- 🔍 **SEO Geoptimaliseerd** - Voor betere zoekmachine vindbaarheid

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **AI Integration**: Google Gemini AI 2.5 Pro
- **Styling**: Tailwind CSS, CSS Modules
- **Testing**: Jest, Vitest, React Testing Library
- **Deployment**: Hugging Face Spaces, Netlify Ready
- **Performance**: Lighthouse 90+ Score

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm of yarn
- Supabase account
- GitHub account

### Installation

1. **Clone het project**
```bash
git clone https://github.com/roustammm/quotefast-dashboard.git
cd quotefast-dashboard
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Configureer environment variables**
```bash
cp env.example .env.local
# Vul je Supabase credentials in
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

## ⚙️ Environment Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Integration (Optioneel)
GEMINI_API_KEY=your_gemini_api_key

# Analytics (Optioneel)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🛠 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report

# Linting & Formatting
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix linting issues
npm run format       # Prettier formatting

# Performance
npm run lighthouse   # Performance audit
npm run analyze      # Bundle analyzer
```

## 🤖 AI Features

### Gemini Integration
Het platform gebruikt Google Gemini AI voor:
- **Slimme Offerte Templates** - Automatische content generatie
- **Code Assistentie** - AI-powered development hulp
- **Performance Optimalisatie** - Automated performance suggestions

### AI-Powered Components
- `GeminiCodingAssistant` - Real-time code suggestions
- `PerformanceMonitor` - Automated performance tracking
- `SEOHead` - Dynamic meta tag optimization

## 📊 Performance

- **Lighthouse Score**: 90+ op alle metrics
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Geoptimaliseerd voor snelle loading
- **CDN Ready**: Statische assets optimalisatie

## 🔒 Security

- **Supabase RLS** - Row Level Security enabled
- **Environment Variables** - Secure credential management
- **Input Validation** - Comprehensive form validation
- **CSRF Protection** - Cross-site request forgery prevention

## 🚀 Deployment

### Hugging Face Spaces (Recommended)
```bash
# 1. Push naar GitHub
git push origin main

# 2. Deploy op Hugging Face Spaces
# De applicatie wordt automatisch gedeployed via GitHub integration
```

### Netlify
```bash
# Build settings:
# Build command: npm run build
# Publish directory: .next
```

### Vercel
```bash
# Installeer Vercel CLI en deploy
vercel --prod
```

## 📝 Development Workflow

### Branch Strategy
- `main` - Productie branch
- `develop` - Development branch
- `feature/*` - Nieuwe features
- `fix/*` - Bug fixes

### Commit Convention
```
feat: nieuwe feature toevoegen
fix: bug fix
docs: documentatie updates
style: styling wijzigingen
refactor: code refactoring
test: test toevoegingen
chore: maintenance taken
```

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je wijzigingen (`git commit -m 'feat: amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## 📄 License

MIT License - zie [LICENSE](LICENSE) bestand voor details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Google Gemini AI](https://ai.google.dev) - AI Integration
- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS

## 📞 Support

Voor support en vragen:
- Open een [GitHub Issue](https://github.com/roustammm/quotefast-dashboard/issues)
- Bekijk de [Documentation](./docs/) folder
- Check de [Deployment Guide](./DEPLOYMENT.md)

---

**Made with ❤️ for modern businesses**