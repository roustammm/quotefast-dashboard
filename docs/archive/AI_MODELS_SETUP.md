# AI Models Setup Guide

Dit dashboard ondersteunt verschillende AI modellen voor programmeren. Hier is een complete setup guide.

## Ondersteunde Modellen

### 1. Mistral Magistral-Small-2509
- **Endpoint**: `http://127.0.0.1:1234/v1`
- **Sterke punten**: 
  - Real-time code assistentie
  - Debugging
  - Multi-language support
  - Snelle response tijd
- **Gebruik**: Dagelijkse coding taken, quick fixes

### 2. Qwen2.5-14B-Instruct
- **Endpoint**: `http://127.0.0.1:1234/v1`
- **Sterke punten**:
  - Complexe code analyse
  - Code refactoring
  - Architectuur design
  - Grote codebases begrijpen
- **Gebruik**: Complexe refactoring, architectuur beslissingen

### 3. Google Gemini Pro
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta`
- **Sterke punten**:
  - Multimodale code analyse
  - Code documentatie
  - Security review
  - Architectuur advisering
- **Gebruik**: Code reviews, documentatie, security checks

## Setup Instructies

### Lokale Server Setup (Mistral & Qwen)

1. **Installeer Ollama** (als je dat nog niet hebt):
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

2. **Download de modellen**:
   ```bash
   # Mistral Magistral
   ollama pull mistralai/magistral-small-2509
   
   # Qwen2.5-14B
   ollama pull qwen2.5:14b-instruct
   ```

3. **Start de server**:
   ```bash
   # Start met custom port
   OLLAMA_HOST=127.0.0.1:1234 ollama serve
   ```

4. **Test de verbinding**:
   ```bash
   curl http://127.0.0.1:1234/v1/models
   ```

### Google Gemini Setup

1. **Krijg een API key**:
   - Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Maak een nieuwe API key aan

2. **Configureer in het dashboard**:
   - Ga naar AI Models pagina
   - Klik op "Configure" bij Gemini Pro
   - Voer je API key in
   - Test de verbinding

## Dashboard Features

### Model Management
- **Status monitoring**: Zie welke modellen actief zijn
- **Performance metrics**: Response tijd en laatste gebruik
- **Capability overview**: Welke taken elk model goed kan

### Configuration
- **Endpoint configuratie**: Pas server URLs aan
- **API keys**: Veilig opslaan van credentials
- **Advanced settings**: Temperature, max tokens, timeout
- **Retry logic**: Configureer herhaalpogingen

### Testing
- **Model testing**: Test modellen met custom prompts
- **Connection testing**: Verificeer API verbindingen
- **Response preview**: Zie model output in real-time

## Gebruik Tips

### Voor verschillende taken:

**Quick coding tasks**:
- Gebruik Mistral Magistral-Small-2509
- Lage temperature (0.3-0.5)
- Korte prompts

**Complex refactoring**:
- Gebruik Qwen2.5-14B-Instruct
- Gemiddelde temperature (0.7)
- Gedetailleerde context

**Code review & security**:
- Gebruik Google Gemini Pro
- Hoge temperature (0.8-1.0)
- Inclusief code context

### Best Practices:

1. **Test altijd eerst**: Gebruik de test functionaliteit voordat je een model in productie gebruikt
2. **Monitor performance**: Houd response tijden in de gaten
3. **Configureer timeouts**: Stel realistische timeouts in
4. **Backup configuraties**: Sla je instellingen op
5. **Security**: Bewaar API keys veilig

## Troubleshooting

### Model niet bereikbaar
- Controleer of de server draait
- Verificeer de endpoint URL
- Check firewall instellingen

### Langzame responses
- Verlaag max tokens
- Verhoog timeout
- Controleer server resources

### API key errors
- Verificeer de API key
- Check permissions
- Controleer quota limits

## Support

Voor vragen of problemen:
1. Check de logs in de browser console
2. Test de API endpoints direct
3. Controleer de model status in het dashboard
4. Raadpleeg de model documentatie

---

**Happy coding! 🚀**
