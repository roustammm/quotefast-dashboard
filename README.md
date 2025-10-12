# QuoteFast AI Dashboard

Een moderne Next.js dashboard applicatie voor offerte en factuur beheer met AI-integratie.

## Features

- 🔐 Supabase authenticatie
- 📊 Dashboard met analytics
- 💰 Factuur en offerte beheer
- 🤖 AI-integratie voor content generatie
- 📱 Responsive design
- 🌙 Dark/Light mode

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: Tailwind CSS
- **Deployment**: Hugging Face Spaces

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=your_app_url
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Dit project is geconfigureerd voor deployment op Hugging Face Spaces.

## License

MIT License