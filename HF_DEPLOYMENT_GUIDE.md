# 🚀 Hugging Face Spaces Deployment Guide

## Je Space URL
**https://YANDIEVPRORUSTRAM-quotefast-dashboard.hf.space**

## Stap-voor-stap Deployment

### 1. Space Aanmaken
1. Ga naar: https://huggingface.co/spaces
2. Klik "Create new Space"
3. Vul in:
   - **Space name**: `quotefast-dashboard`
   - **SDK**: `Gradio`
   - **Hardware**: `CPU Basic` (gratis) of `CPU Upgrade` (betere performance)
   - **Visibility**: `Public`

### 2. Code Uploaden
**Optie A: Via Git (Aanbevolen)**
```bash
# Clone je nieuwe Space
git clone https://huggingface.co/spaces/YANDIEVPRORUSTRAM/quotefast-dashboard
cd quotefast-dashboard

# Voeg je GitHub repo toe als remote
git remote add github https://github.com/Rustammiq/quotefast-dashboard-private.git
git pull github feature/implement-invoice-functionality

# Push naar Hugging Face
git push origin main
```

**Optie B: Via Web Interface**
1. Upload alle bestanden via de web interface
2. Zorg dat alle bestanden in de root directory staan

### 3. Environment Variables Instellen
In je Space settings (Settings → Variables), voeg toe:

```
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
NEXT_PUBLIC_APP_URL=https://YANDIEVPRORUSTRAM-quotefast-dashboard.hf.space
```

### 4. Belangrijke Bestanden
Zorg dat deze bestanden in je Space staan:
- ✅ `app.py` - Python wrapper
- ✅ `requirements.txt` - Python dependencies
- ✅ `package.json` - Node.js dependencies
- ✅ `next.config.js` - Next.js configuratie
- ✅ Alle source code bestanden

### 5. Build Process
Hugging Face Spaces zal automatisch:
1. Python dependencies installeren
2. Node.js dependencies installeren (`npm install`)
3. Next.js app bouwen (`npm run build`)
4. App starten (`npm start`)

### 6. Troubleshooting
**Als de build faalt:**
- Controleer of alle bestanden correct zijn geüpload
- Controleer environment variables
- Kijk naar de build logs in je Space

**Als de app niet laadt:**
- Wacht 5-10 minuten voor de eerste build
- Controleer of de URL correct is
- Upgrade naar CPU Upgrade voor betere performance

## 🎯 Je Live Dashboard
Na succesvolle deployment: **https://YANDIEVPRORUSTRAM-quotefast-dashboard.hf.space**

## 📞 Support
Als je problemen hebt, check:
1. Build logs in je Space
2. Environment variables
3. Bestandsstructuur
4. Network connectivity
