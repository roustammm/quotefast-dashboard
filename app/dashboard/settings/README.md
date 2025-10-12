# Settings Pagina - Implementatie Documentatie

## Overzicht
De volledig vernieuwde settings pagina met werkende functionaliteit, validatie, toast notificaties, en integratie met bestaande services.

## Geïmplementeerde Features

### ✅ 1. Profile Section
- **Echte gebruikersgegevens**: Geïntegreerd met `useAuth()` context
- **Werkende save functionaliteit**: Validatie en update via `authService`
- **Real-time validatie**: Zod schema validatie voor alle velden
- **Error feedback**: Rode borders en error messages bij fouten
- **Success feedback**: Toast notificaties bij succesvolle updates
- **Profielfoto**: Avatar met initialen en edit button

**Validatie Regels:**
- Voornaam/Achternaam: 2-50 karakters, alleen letters
- Email: Valid email format
- Telefoon: Nederlands format (+31612345678 of 0612345678)

### ✅ 2. Security Section
- **Wachtwoord wijzigen**: Met sterkte indicator en show/hide toggle
- **Wachtwoord sterkte**: Visuele feedback (Zwak/Gemiddeld/Sterk)
- **PIN code management**: Update 4-cijferige PIN voor standby mode
- **Standby settings**: Enable/disable en timeout configuratie
- **2FA toggle**: Basis implementatie voor toekomstige 2FA

**Validatie Regels:**
- Wachtwoord: Min 8 chars, 1 uppercase, 1 lowercase, 1 cijfer, 1 speciaal karakter
- PIN: Exact 4 cijfers

### ✅ 3. Notifications Section
- **6 notificatie types**: Email, Push, SMS, Projects, Mentions, System
- **Real-time toggles**: Instant visual feedback
- **Batch save**: Save alle voorkeuren tegelijk
- **Persistent storage**: Opslaan via Supabase
- **Unsaved changes indicator**: Toon save button alleen bij wijzigingen

### ✅ 4. API Keys Section
- **Generate new keys**: Mock generatie van API keys
- **Copy to clipboard**: Een-klik kopiëren met feedback
- **Show/hide keys**: Toggle visibility per key
- **Delete keys**: Met confirmatie dialog
- **Key details**: Created date, last used timestamp
- **Security warning**: Belangrijke beveiligings tips

### ✅ 5. Appearance Section
- **Theme switcher**: Light/Dark/System met visual preview
- **Theme sync**: Geïntegreerd met `ThemeContext`
- **Language selection**: Nederlands, English, Français, Deutsch
- **Timezone selection**: 6 verschillende timezones
- **Live preview**: Zie huidige tijd in geselecteerde timezone
- **Persistent storage**: Opslaan naar Supabase

### ✅ 6. AI Personalization Section
- **Onboarding data**: Toon bedrijfsinfo en voorkeuren
- **Feature toggles**: AI Offerte Generator, Smart Templates, Predictive Analytics
- **Edit mode**: Toggle tussen view en edit mode
- **Workflow preferences**: Automation level, reporting frequency, integraties
- **Save functionality**: Persistent opslag van AI instellingen

### ✅ 7. System Section (NIEUW!)
- **Account statistieken**: Created date, last login, total logins, active sessions
- **Session management**: Toon en logout actieve sessies
- **Data export**: GDPR-compliant export naar JSON
- **Danger zone**: Account verwijdering met confirmatie
- **Security warnings**: Duidelijke waarschuwingen bij gevaarlijke acties

## Technische Implementatie

### Dependencies
```json
{
  "react-hook-form": "^7.x.x",
  "zod": "^3.x.x",
  "react-hot-toast": "^2.x.x",
  "@radix-ui/react-dialog": "^1.x.x"
}
```

### File Structure
```
/app/dashboard/settings/
  page.tsx                          # Hoofd settings pagina
  README.md                         # Deze documentatie
  /components/
    ProfileSection.tsx              # Profiel beheer
    SecuritySection.tsx             # Beveiliging en wachtwoorden
    NotificationsSection.tsx        # Notificatie voorkeuren
    APIKeysSection.tsx              # API key management
    AppearanceSection.tsx           # Thema en taal
    AIPersonalizationSection.tsx    # AI voorkeuren
    SystemSection.tsx               # System info en data
  /hooks/
    useToast.ts                     # Toast notificaties hook
    useSettingsForm.ts              # Centralized form state
  /utils/
    validation.ts                   # Zod schemas en helpers
    constants.ts                    # Settings constanten
```

### Services
```
/lib/
  settings-service.ts               # CRUD operaties voor settings
  auth-service.ts                   # Authenticatie service (bestaand)
  
/types/
  settings.ts                       # TypeScript interfaces
```

### Contexts
- `AuthContext`: User data en auth functies
- `ThemeContext`: Theme management
- `StandbyContext`: Standby/lock screen
- `AIPersonalizationContext`: AI voorkeuren

## Features in Detail

### Toast Notifications
Gebruikt `react-hot-toast` voor consistent feedback:
- **Success**: Groene toast met ✓ icon
- **Error**: Rode toast met ✕ icon
- **Loading**: Blauwe toast met spinner
- **Info**: Blauwe toast met ℹ️ icon

### Form Validation
Gebruikt Zod voor type-safe validatie:
```typescript
const profileSchema = z.object({
  firstName: z.string().min(2).max(50),
  email: z.string().email(),
  // ... meer velden
});
```

### Keyboard Shortcuts
- **Ctrl/Cmd + S**: Opslaan (op alle tabs)
- **Tab**: Navigeer door formulier velden
- **Esc**: Sluit modals

### Accessibility
- ARIA labels op alle interactieve elementen
- Keyboard navigatie door alle secties
- Screen reader vriendelijke error messages
- Focus management bij modals
- Semantic HTML structuur

### Responsive Design
- Mobile-first approach
- Stacked layout op kleine schermen
- Horizontal scrollbare tabs
- Touch-friendly buttons (min 44x44px)

## Gebruik

### Basic Import
```typescript
import SettingsPage from '@/app/dashboard/settings/page';
```

### Toast Notifications Gebruiken
```typescript
import { useToast } from './hooks/useToast';

const MyComponent = () => {
  const toast = useToast();
  
  toast.success('Opgeslagen!');
  toast.error('Er ging iets mis');
  toast.loading('Bezig met laden...');
};
```

### Settings Form Hook Gebruiken
```typescript
import { useSettingsForm } from './hooks/useSettingsForm';

const MyComponent = () => {
  const {
    notificationSettings,
    saveNotificationSettings,
    saving,
  } = useSettingsForm();
  
  // Use settings...
};
```

## Database Schema

De settings worden opgeslagen in een `user_settings` tabel:

```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  notification_settings JSONB DEFAULT '{}'::jsonb,
  appearance_settings JSONB DEFAULT '{}'::jsonb,
  ai_personalization_settings JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Toekomstige Verbeteringen

### Geplande Features
- [ ] 2FA implementatie (QR code, backup codes)
- [ ] Profielfoto upload naar Supabase Storage
- [ ] Import settings vanuit JSON
- [ ] Settings geschiedenis/audit log
- [ ] Bulk operations voor notificaties
- [ ] Advanced session management (force logout all)
- [ ] Email verification flow
- [ ] Password reset flow in settings
- [ ] Custom keyboard shortcuts configuratie

### Performance Optimizations
- [ ] Debounce voor real-time validatie
- [ ] Lazy loading van heavy componenten
- [ ] Optimistic UI updates
- [ ] Request caching

### UX Improvements
- [ ] Search functie voor settings
- [ ] Settings categorieën collapse/expand
- [ ] Undo functionaliteit
- [ ] Settings tour voor nieuwe gebruikers
- [ ] Contextual help tooltips

## Testing

### Unit Tests (Toekomstig)
```typescript
describe('ProfileSection', () => {
  it('validates email format', () => {
    // Test implementation
  });
  
  it('saves profile data', async () => {
    // Test implementation
  });
});
```

### E2E Tests (Toekomstig)
```typescript
describe('Settings Flow', () => {
  it('completes full settings update flow', () => {
    // Test implementation
  });
});
```

## Troubleshooting

### Veelvoorkomende Problemen

**Toast notifications werken niet:**
- Zorg dat `<Toaster />` component is toegevoegd aan de page
- Check of `react-hot-toast` correct geïnstalleerd is

**Settings worden niet opgeslagen:**
- Check Supabase connectie
- Verificeer user authentication
- Check browser console voor errors

**Validatie errors:**
- Controleer Zod schema's in `validation.ts`
- Check of alle required velden zijn ingevuld

## Support

Voor vragen of problemen:
1. Check deze documentatie
2. Check de code comments in de source files
3. Open een issue in de repository

## Changelog

### v1.0.0 (Huidig)
- ✅ Complete refactor van settings pagina
- ✅ Alle 7 secties geïmplementeerd
- ✅ Form validatie met Zod
- ✅ Toast notificaties
- ✅ Keyboard shortcuts
- ✅ Responsive design
- ✅ Accessibility verbeteringen
- ✅ Supabase integratie

---

**Laatst bijgewerkt:** 11 oktober 2025  
**Versie:** 1.0.0  
**Status:** ✅ Productie-klaar

