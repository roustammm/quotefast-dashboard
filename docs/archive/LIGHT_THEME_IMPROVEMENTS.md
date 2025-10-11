# Light Theme Visibility Verbeteringen

## Probleem Analyse
De light theme van het dashboard had significant visibility issues, met name:
- Borders waren nauwelijks zichtbaar (`border-gray-300` was te licht)
- Componenten mengden te veel met de achtergrond
- Gebrek aan depth en contrast tussen elementen

## Gemaakte Verbeteringen

### 1. Sidebar Component (`app/dashboard/components/Sidebar.tsx`)
**Voorheen:**
- `bg-white/80 border-gray-300`
- `bg-gray-200/50 hover:bg-gray-300/70` voor nav items

**Na verbetering:**
- `bg-white/90 border-gray-400 shadow-lg` voor betere border zichtbaarheid
- `bg-gray-100/80 hover:bg-gray-200/90 shadow-sm border border-gray-300/50` voor nav items
- Toegevoegde shadow voor depth en betere component scheiding

### 2. DashboardCard Component (`app/dashboard/components/DashboardCard.tsx`)
**Voorheen:**
- `bg-white border-gray-300 hover:bg-gray-50`

**Na verbetering:**
- `bg-gray-50/90 border-gray-400 hover:bg-gray-100/90 shadow-md border-opacity-60`
- Donkerdere border voor betere zichtbaarheid
- Subtiele shadow voor depth
- Semi-transparante achtergrond voor betere blending

### 3. TopNav Component (`app/dashboard/components/TopNav.tsx`)
**Voorheen:**
- `border-gray-300 bg-white` voor de container
- `bg-white border-gray-300` voor de search input

**Na verbetering:**
- `border-gray-400 bg-gray-50/90 shadow-md border-opacity-60` voor container
- `bg-gray-100/80 border-gray-400 placeholder-gray-600 text-gray-900 border-opacity-60` voor search
- Consistente styling met andere componenten

### 4. ThemeToggle Component (`app/dashboard/components/ThemeToggle.tsx`)
**Voorheen:**
- `bg-gray-100 hover:bg-gray-200 border-gray-200`

**Na verbetering:**
- `bg-gray-100/80 hover:bg-gray-200/90 border-gray-400 shadow-sm border-opacity-60`
- Consistente border kleur en shadow met andere componenten

### 5. Layout Achtergrond (`app/dashboard/layout.tsx`)
**Voorheen:**
- `bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50`

**Na verbetering:**
- `bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50`
- Subtielere gradient die beter contrasteert met componenten

## Visuele Verbeteringen

### Border Versterking:
- **Van:** `border-gray-300` (te licht, weinig contrast)
- **Naar:** `border-gray-400` met `border-opacity-60` (betere zichtbaarheid)

### Shadow Toevoeging:
- **Sidebar:** `shadow-lg` voor prominente separatie
- **Cards & TopNav:** `shadow-md` voor subtiele depth
- **Interactive elements:** `shadow-sm` voor hover states

### Achtergrond Contrasts:
- Componenten hebben nu semi-transparante achtergronden (`/90` opacity)
- Betere kleur overgangen tussen layout en componenten
- Consistente grayscale palette voor professionele uitstraling

## Testing
De verbeteringen zijn getest door:
1. Starten van de ontwikkelaarsserver (`npm run dev`)
2. Visuele inspectie van de light theme
3. Verifiëren dat alle componenten goede border zichtbaarheid hebben
4. Controleren van hover states en interacties

## Resultaat
De light theme heeft nu:
- ✅ Duidelijk zichtbare borders en kaders
- ✅ Betere component separatie en depth
- ✅ Verbeterde leesbaarheid en usability
- ✅ Consistente styling across alle componenten
- ✅ Professionele en moderne uitstraling

## Toekomstige Aanbevelingen
- Overweeg om een systematisch design system op te zetten voor consistent kleurgebruik
- Implementeer CSS custom properties voor eenvoudiger thema management
- Voeg meer contrast ratio checks toe voor accessibility compliance