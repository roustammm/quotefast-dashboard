# QuoteFast Dashboard - Hugging Face Spaces

## 🚀 Deployment op Hugging Face Spaces

### Stap 1: Space Aanmaken
1. Ga naar [huggingface.co/spaces](https://huggingface.co/spaces)
2. Klik "Create new Space"
3. Vul in:
   - **Space name**: `quotefast-dashboard`
   - **License**: MIT
   - **SDK**: Docker
   - **Hardware**: CPU Basic (gratis)

### Stap 2: Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Stap 3: Environment Variables
In Space Settings → Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
NEXT_PUBLIC_APP_URL=https://huggingface.co/spaces/your-username/quotefast-dashboard
NODE_ENV=production
```

### Stap 4: Deploy
1. Upload je code naar de Space
2. Wacht 5-10 minuten voor build
3. Je dashboard is live!

## 🎯 Resultaat
Je krijgt een URL zoals:
`https://huggingface.co/spaces/your-username/quotefast-dashboard`