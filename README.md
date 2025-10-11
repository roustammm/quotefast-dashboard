# QuoteFast - Modern SaaS Platform

Een moderne, productie-klare SaaS platform voor offertes, facturen, CRM en workflows. Gebouwd met Next.js 15, TypeScript, Tailwind CSS en geïntegreerd met Stripe, Supabase en OpenAI.

## 🚀 Features

- **Landing Page** - Moderne, responsive landing page met Makerkit-inspired dark glassmorphism design
- **Authenticatie** - Volledige Supabase authenticatie met JWT tokens
- **Dashboard** - Uitgebreid dashboard met verschillende modules
- **Stripe Integratie** - Volledige betalingsverwerking en abonnementen
- **AI Features** - OpenAI integratie voor slimme suggesties
- **Responsive Design** - Werkt perfect op alle apparaten
- **Modern UI** - Gebouwd met Tailwind CSS en Lucide React icons
- **Security** - Implementatie van security headers en CSRF protection
- **Error Handling** - Centralized error handling met specifieke error messages
- **Type Safety** - Volledige TypeScript coverage met expliciete return types

## 🛠️ Technologieën

- **Next.js 15** - React framework met App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Stripe** - Betalingsverwerking en abonnementen
- **Supabase** - Database en authenticatie
- **OpenAI** - AI integratie
- **Heroicons** - Moderne iconen

## 📦 Installatie

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd dashboard-starter
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Configureer environment variabelen**
   ```bash
   cp env.example .env.local
   ```
   
   Vul de volgende variabelen in:
   - `NEXT_PUBLIC_SUPABASE_URL` - Je Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Je Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Je Supabase service role key (voor admin operaties)
   - `STRIPE_SECRET_KEY` - Je Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Je Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET` - Je Stripe webhook secret
   - `OPENAI_API_KEY` - Je OpenAI API key
   - `RESEND_API_KEY` - Je Resend API key (voor emails)
   - `NEXT_PUBLIC_APP_URL` - Je applicatie URL (http://localhost:3000 voor development)

4. **Start de development server**
   ```bash
   npm run dev
   ```

5. **Open je browser**
   Ga naar [http://localhost:3000](http://localhost:3000)

## 🔧 Configuratie

### Supabase Setup

1. Maak een account aan op [Supabase](https://supabase.com/)
2. Maak een nieuw project
3. Ga naar Project Settings > API
4. Kopieer de URL en anon key naar je `.env.local`

### Stripe Setup

1. Maak een account aan op [Stripe](https://stripe.com/)
2. Ga naar Developers > API keys
3. Kopieer je secret en publishable keys naar je `.env.local`
4. Configureer webhooks voor `/api/webhooks/stripe`

### OpenAI Setup

1. Maak een account aan op [OpenAI](https://openai.com/)
2. Ga naar API keys
3. Maak een nieuwe API key aan
4. Voeg deze toe aan je `.env.local`

## 📁 Project Structuur

```
dashboard-starter/
├── app/
│   ├── auth/                 # Authenticatie pagina's
│   ├── dashboard/            # Dashboard modules
│   ├── features/            # Features pagina
│   ├── pricing/             # Pricing pagina
│   ├── api/                 # API routes
│   └── page.tsx             # Landing page
├── components/
│   └── ui/                  # Herbruikbare UI componenten
├── contexts/                # React contexts
├── styles/                  # Global styles
└── public/                  # Statische assets
```

## 🎨 Pagina's

- **Landing Page** (`/`) - Hoofdpagina met hero sectie, features en CTA
- **Features** (`/features`) - Uitgebreide features overzicht
- **Pricing** (`/pricing`) - Prijzen en abonnementen
- **Auth** (`/auth`) - Registratie en login
- **Dashboard** (`/dashboard`) - Hoofddashboard
- **Billing** (`/dashboard/billing`) - Abonnement beheer

## 💳 Stripe Integratie

Het platform bevat volledige Stripe integratie:

- **Checkout Sessions** - Voor nieuwe abonnementen
- **Webhooks** - Voor real-time updates
- **Subscription Management** - Upgrade/downgrade functionaliteit
- **Payment Methods** - Beheer van betaalmethoden

## 🤖 AI Features

OpenAI integratie voor:

- **Slimme Offerte Suggesties** - AI-gebaseerde prijsberekening
- **Automatische Content Generatie** - Voor offertes en facturen
- **Klant Insights** - Analyse van klantgedrag

## 🚀 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Verbind je repository met Vercel
3. Voeg je environment variabelen toe in Vercel
4. Deploy automatisch

### Andere Platforms

Het project kan ook gedeployed worden op:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run start` - Start productie server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🆘 Support

Voor vragen of problemen:

1. Check de [Issues](https://github.com/your-repo/issues) pagina
2. Maak een nieuwe issue aan
3. Contacteer ons via email

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Stripe](https://stripe.com/) - Betalingsverwerking
- [Supabase](https://supabase.com/) - Backend as a Service
- [OpenAI](https://openai.com/) - AI services
- [Heroicons](https://heroicons.com/) - Iconen

---

Gemaakt met ❤️ voor moderne bedrijven