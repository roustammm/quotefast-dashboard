# QuoteFast AI Dashboard - Hugging Face Spaces

Dit is een Next.js dashboard applicatie geconfigureerd voor deployment op Hugging Face Spaces.

## 🚀 Deployment op Hugging Face Spaces

### Stap 1: Repository aanmaken
1. Ga naar [Hugging Face Spaces](https://huggingface.co/spaces)
2. Klik op "Create new Space"
3. Kies "Gradio" als SDK (voor web apps)
4. Geef je space een naam, bijvoorbeeld: `quotefast-dashboard`

### Stap 2: Code uploaden
1. Clone dit repository
2. Upload alle bestanden naar je Hugging Face Space
3. Of gebruik Git: `git push` naar je HF repository

### Stap 3: Environment Variables instellen
In je Hugging Face Space settings, voeg toe:

```
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
NEXT_PUBLIC_APP_URL=https://your-username-quotefast-dashboard.hf.space
```

### Stap 4: Space configureren
- **SDK**: Gradio
- **Hardware**: CPU Basic (gratis) of CPU Upgrade (voor betere performance)
- **Visibility**: Public of Private

## 📁 Belangrijke bestanden voor HF Spaces

- `app.py` - Python wrapper voor de Next.js app
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies
- `next.config.js` - Next.js configuratie voor production
- `README.md` - Project documentatie

## 🔧 Lokale ontwikkeling

```bash
npm install
npm run dev
```

## 🌐 Live URL

Na deployment: `https://your-username-quotefast-dashboard.hf.space`

## 📝 Notities

- Hugging Face Spaces ondersteunt Node.js applicaties via Python wrappers
- De app wordt automatisch gebouwd en gedeployed
- Environment variables kunnen worden ingesteld in de Space settings
- Gratis tier heeft beperkte resources, upgrade voor betere performance
