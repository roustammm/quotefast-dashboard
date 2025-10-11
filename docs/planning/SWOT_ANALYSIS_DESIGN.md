# SWOT Analyse Design Document

## Overview
Dit document beschrijft het ontwerp van een SWOT-analyse component voor het QuoteFast dashboard, met focus op visuele stijl, handmatige data-invoer en AI-verbeteringen.

## Visuele Stijl en 3D Effecten

### Glassmorphic Design
- **Achtergrond**: Semi-transparante lagen met backdrop-blur effecten
- **Kleurenschema**: Gradient van paars naar blauw met witte/grijze accenten
- **3D Effecten**: 
  - Diepte via box-shadow en lagen
  - Hover effecten met scale transities
  - Lichtreflecties op kader randen

### SWOT Matrix Layout
```
┌─────────────────────────────┬─────────────────────────────┐
│        💪 STRENGTHS         │        ⚠️ WEAKNESSES         │
│        (Sterkten)           │        (Zwakten)            │
│                             │                             │
│  ┌─────────────────────┐    │  ┌─────────────────────┐    │
│  │ • Positief          │    │  │ • Negatief          │    │
│  │ • Intern            │    │  │ • Intern            │    │
│  │ • Wat doet goed?    │    │  │ • Wat kan beter?    │    │
│  └─────────────────────┘    │  └─────────────────────┘    │
│                             │                             │
│  [+] Nieuw item toevoegen   │  [+] Nieuw item toevoegen   │
└─────────────────────────────┼─────────────────────────────┤
│       🎯 OPPORTUNITIES       │        🚨 THREATS            │
│       (Kansen)              │       (Bedreigingen)        │
│                             │                             │
│  ┌─────────────────────┐    │  ┌─────────────────────┐    │
│  │ • Positief          │    │  │ • Negatief          │    │
│  │ • Extern            │    │  │ • Extern            │    │
│  │ • Wat kansen?       │    │  │ • Wat risico's?     │    │
│  └─────────────────────┘    │  └─────────────────────┘    │
│                             │                             │
│  [+] Nieuw item toevoegen   │  [+] Nieuw item toevoegen   │
└─────────────────────────────┴─────────────────────────────┘
```

### Visuele Hiërarchie en 3D Effecten

#### 1. Diepte Lagen
```
┌─────────────────────────────────────────────────────────┐
│  Top Layer: Floating Elements (AI Suggestions, Tools)   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Middle Layer: Interactive SWOT Items              │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  Base Layer: Glassmorphic Matrix Container     │ │ │
│  │  │  ┌─────────────────────────────────────────────┐ │ │ │
│  │  │  │  Background: Gradient with Blur Effects     │ │ │ │
│  │  │  └─────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 2. Kleur en Licht Reflecties
```
Strengths  (Groen tinten):
┌─────────────────────────────────┐
│ 🟢 #10b981 (hooglicht)         │
│ 🟢 #059669 (basis)             │
│ 🟢 #047857 (schaduw)           │
│ Lichtreflectie: rgba(16, 185, 129, 0.3) │
└─────────────────────────────────┘

Weaknesses (Rood tinten):
┌─────────────────────────────────┐
│ 🔴 #ef4444 (hooglicht)         │
│ 🔴 #dc2626 (basis)             │
│ 🔴 #b91c1c (schaduw)           │
│ Lichtreflectie: rgba(239, 68, 68, 0.3) │
└─────────────────────────────────┘

Opportunities (Blauw tinten):
┌─────────────────────────────────┐
│ 🔵 #3b82f6 (hooglicht)         │
│ 🔵 #2563eb (basis)             │
│ 🔵 #1d4ed8 (schaduw)           │
│ Lichtreflectie: rgba(59, 130, 246, 0.3) │
└─────────────────────────────────┘

Threats (Oranje tinten):
┌─────────────────────────────────┐
│ 🟠 #f59e0b (hooglicht)         │
│ 🟠 #d97706 (basis)             │
│ 🟠 #b45309 (schaduw)           │
│ Lichtreflectie: rgba(245, 158, 11, 0.3) │
└─────────────────────────────────┘
```

#### 3. Animation States
```
Idle State:
┌─────────────────────────────────┐
│ • Subtiele pulse animatie       │
│ • Licht reflectie effect        │
│ • Zachte schaduw               │
└─────────────────────────────────┘

Hover State:
┌─────────────────────────────────┐
│ • Scale: 1.05                  │
│ • Shadow intensity: +50%       │
│ • Reflectie: +30%              │
│ • Border glow: active          │
└─────────────────────────────────┘

Active/Drag State:
┌─────────────────────────────────┐
│ • Scale: 1.08                  │
│ • Rotation: 2deg               │
│ • Shadow: large                │
│ • Blur: background             │
└─────────────────────────────────┘
```

## Component Structuur

### 1. SWOT Matrix Component
```typescript
interface SWOTItem {
  id: string;
  text: string;
  category: 'strength' | 'weakness' | 'opportunity' | 'threat';
  priority: 'low' | 'medium' | 'high';
  aiGenerated?: boolean;
}

interface SWOTData {
  companyName: string;
  analysisDate: string;
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}
```

### 2. Interactive Features
- **Drag & Drop**: Verplaats items tussen categorieën
- **Inline Editing**: Direct bewerken van SWOT items
- **AI Suggestions**: AI-gegenereerde verbeteringen
- **Priority Tagging**: Visuele prioriteitsaanduiding
- **Export Functionaliteit**: PDF/JSON export

### 3. AI Integration
- **Smart Suggestions**: AI-gegenereerde SWOT punten
- **Content Improvement**: AI-geoptimaliseerde beschrijvingen
- **Industry Insights**: Sector-specifieke aanbevelingen
- **Competitive Analysis**: Concurrentvergelijking (optioneel)

## Technische Implementatie

### Frontend Components
1. **SWOTMatrix.tsx**: Hoofdcomponent met 4 kwadranten
2. **SWOTItem.tsx**: Individuele SWOT item component
3. **SWOTEditor.tsx**: Bewerk interface voor items
4. **AIAssistant.tsx**: AI suggestie panel
5. **SWOTExport.tsx**: Export functionaliteit

### Gedetailleerde Styling Classes

#### 1. Hoofd Container
```css
.swot-container {
  /* Multi-layer glassmorphic effect */
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%, 
    rgba(30, 41, 59, 0.9) 25%, 
    rgba(51, 65, 85, 0.85) 50%,
    rgba(30, 41, 59, 0.9) 75%,
    rgba(15, 23, 42, 0.95) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.3),
    0 16px 32px rgba(31, 38, 135, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.swot-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent
  );
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.3; transform: translateX(-100%); }
  50% { opacity: 0.8; transform: translateX(100%); }
}
```

#### 2. Matrix Grid
```css
.swot-matrix {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  padding: 32px;
  min-height: 700px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.swot-matrix::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 80%;
  background: linear-gradient(180deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.swot-matrix::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
}
```

#### 3. Kwadranten met 3D Effecten
```css
.swot-quadrant {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.swot-quadrant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.swot-quadrant:hover {
  transform: translateY(-4px) translateZ(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 12px 24px rgba(31, 38, 135, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.swot-quadrant:hover::before {
  opacity: 1;
}

/* Category specifieke styling */
.swot-quadrant.strengths {
  border-top: 3px solid #10b981;
  box-shadow: 
    0 8px 32px rgba(16, 185, 129, 0.1),
    inset 0 1px 0 rgba(16, 185, 129, 0.1);
}

.swot-quadrant.weaknesses {
  border-top: 3px solid #ef4444;
  box-shadow: 
    0 8px 32px rgba(239, 68, 68, 0.1),
    inset 0 1px 0 rgba(239, 68, 68, 0.1);
}

.swot-quadrant.opportunities {
  border-top: 3px solid #3b82f6;
  box-shadow: 
    0 8px 32px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(59, 130, 246, 0.1);
}

.swot-quadrant.threats {
  border-top: 3px solid #f59e0b;
  box-shadow: 
    0 8px 32px rgba(245, 158, 11, 0.1),
    inset 0 1px 0 rgba(245, 158, 11, 0.1);
}
```

#### 4. Interactive SWOT Items
```css
.swot-item {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.12) 0%, 
    rgba(255, 255, 255, 0.06) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: move;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

.swot-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    transparent 50%, 
    rgba(0, 0, 0, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.swot-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  transition: left 0.6s ease;
}

.swot-item:hover {
  transform: translateY(-3px) translateZ(10px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(31, 38, 135, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.swot-item:hover::before {
  opacity: 1;
}

.swot-item:hover::after {
  left: 100%;
}

.swot-item.dragging {
  transform: translateY(-6px) translateZ(30px) scale(1.05) rotate(2deg);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.25),
    0 15px 30px rgba(31, 38, 135, 0.2);
  opacity: 0.9;
  z-index: 1000;
}

.swot-item.ai-generated {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.15) 0%, 
    rgba(59, 130, 246, 0.08) 100%
  );
  border-color: rgba(139, 92, 246, 0.3);
}

.swot-item.ai-generated::before {
  content: '✨';
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 14px;
  z-index: 10;
}

/* Priority indicators */
.swot-item.priority-high::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #ef4444, #dc2626);
  border-radius: 4px 0 0 4px;
}

.swot-item.priority-medium::before {
  background: linear-gradient(180deg, #f59e0b, #d97706);
}

.swot-item.priority-low::before {
  background: linear-gradient(180deg, #10b981, #059669);
}
```

#### 5. AI Suggestie Panel
```css
.ai-suggestions-panel {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.1) 0%, 
    rgba(59, 130, 246, 0.05) 100%
  );
  backdrop-filter: blur(15px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  padding: 20px;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  max-height: 600px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 
    0 25px 50px rgba(139, 92, 246, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.1);
}

.ai-suggestion-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-suggestion-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(-4px);
}
```

### Styling Classes
```css
.swot-matrix {
  /* 3D container met glassmorphism */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.swot-quadrant {
  /* Afzonderlijke kwadranten met subtiele 3D effecten */
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.swot-item {
  /* Interactieve items met hover effecten */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.swot-item:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

## Data Flow

### 1. User Input Flow
```
Gebruiker invoer → Validatie → Opslaan in state → AI suggesties → Update UI
```

### 2. AI Enhancement Flow
`` bestaande data → OpenAI API → Verbeterde suggesties → User approval → Update
```

### 3. State Management
```typescript
const [swotData, setSwotData] = useState<SWOTData>(initialData);
const [isEditing, setIsEditing] = useState(false);
const [aiSuggestions, setAiSuggestions] = useState<SWOTItem[]>([]);
const [loading, setLoading] = useState(false);
```

## Integration Points

### 1. Dashboard Navigation
- Toevoegen aan sidebar navigatie
- Route: `/dashboard/swot-analyse`

### 2. API Endpoints
```typescript
// SWOT data beheer
GET    /api/swot/:id
POST   /api/swot
PUT    /api/swot/:id
DELETE /api/swot/:id

// AI assistentie
POST   /api/swot/ai-suggestions
POST   /api/swot/ai-improve

// Export
GET    /api/swot/:id/export/pdf
GET    /api/swot/:id/export/json
```

### 3. Database Schema
```sql
CREATE TABLE swot_analyses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  company_name TEXT,
  analysis_date TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE swot_items (
  id UUID PRIMARY KEY,
  analysis_id UUID REFERENCES swot_analyses(id),
  category TEXT, -- 'strength', 'weakness', 'opportunity', 'threat'
  text TEXT,
  priority TEXT, -- 'low', 'medium', 'high'
  ai_generated BOOLEAN DEFAULT false,
  order_index INTEGER
);
```

## Performance Considerations

### 1. Optimizations
- Lazy loading van AI suggesties
- Debounced API calls tijdens typen
- Virtualized lists voor grote SWOT analyses
- Local storage caching

### 2. Accessibility
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus management

## Future Enhancements

### 1. Advanced Features
- Collaborative editing
- Template library
- Historical comparisons
- Industry benchmarks

### 2. Integration Options
- CRM data synchronisatie
- Market research APIs
- Competitor analysis tools
- Financial data integration

## Testing Strategy

### 1. Unit Tests
- Component rendering
- State management
- API integration
- AI response handling

### 2. Integration Tests
- End-to-end workflows
- Data persistence
- Export functionality
- Cross-browser compatibility

### 3. User Testing
- Usability testing
- Performance testing
- Mobile responsiveness
- Accessibility validation