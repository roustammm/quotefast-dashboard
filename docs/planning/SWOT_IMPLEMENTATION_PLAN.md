# SWOT Analyse Implementatie Plan

## Component Architectuur

### 1. Hoofdcomponenten

#### SWOTMatrix Component
```typescript
// app/dashboard/swot/components/SWOTMatrix.tsx
interface SWOTMatrixProps {
  data: SWOTData;
  onItemAdd: (category: SWOTCategory, item: Omit<SWOTItem, 'id'>) => void;
  onItemUpdate: (itemId: string, updates: Partial<SWOTItem>) => void;
  onItemDelete: (itemId: string) => void;
  onItemMove: (itemId: string, newCategory: SWOTCategory) => void;
}
```

#### SWOTItem Component
```typescript
// app/dashboard/swot/components/SWOTItem.tsx
interface SWOTItemProps {
  item: SWOTItem;
  isEditable: boolean;
  onEdit: (item: SWOTItem) => void;
  onDelete: (itemId: string) => void;
  onMove: (itemId: string, category: SWOTCategory) => void;
}
```

#### AIAssistant Component
```typescript
// app/dashboard/swot/components/AIAssistant.tsx
interface AIAssistantProps {
  currentData: SWOTData;
  onSuggestionAccept: (suggestion: SWOTItem) => void;
  onImproveItem: (itemId: string, improvement: string) => void;
}
```

### 2. Pagina Structuur

```
app/dashboard/swot/
├── page.tsx                    // Hoofdpagina
├── components/
│   ├── SWOTMatrix.tsx         // Hoofd matrix component
│   ├── SWOTItem.tsx           // Individuele items
│   ├── SWOTEditor.tsx         // Bewerk interface
│   ├── AIAssistant.tsx        // AI suggesties
│   ├── SWOTExport.tsx         // Export functionaliteit
│   └── SWOTToolbar.tsx        // Toolbar met acties
├── types.ts                   // TypeScript types
└── hooks/
    ├── useSWOTData.ts         // Data management hook
    ├── useAISuggestions.ts    // AI integratie hook
    └── useSWOTExport.ts       // Export functionaliteit
```

## Implementatie Details

### 1. State Management
```typescript
// app/dashboard/swot/hooks/useSWOTData.ts
export function useSWOTData(analysisId?: string) {
  const [data, setData] = useState<SWOTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCallback((category: SWOTCategory, item: Omit<SWOTItem, 'id'>) => {
    // Implementatie
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<SWOTItem>) => {
    // Implementatie
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    // Implementatie
  }, []);

  const moveItem = useCallback((itemId: string, newCategory: SWOTCategory) => {
    // Implementatie
  }, []);

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    moveItem
  };
}
```

### 2. AI Integratie
```typescript
// app/dashboard/swot/hooks/useAISuggestions.ts
export function useAISuggestions(currentData: SWOTData) {
  const [suggestions, setSuggestions] = useState<SWOTItem[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = useCallback(async (category: SWOTCategory) => {
    setLoading(true);
    try {
      const response = await fetch('/api/swot/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentData,
          category,
          companyName: currentData.companyName
        })
      });
      
      const data = await response.json();
      setSuggestions(prev => [...prev, ...data.suggestions]);
    } catch (error) {
      console.error('AI suggestions failed:', error);
    } finally {
      setLoading(false);
    }
  }, [currentData]);

  return {
    suggestions,
    loading,
    generateSuggestions
  };
}
```

### 3. Drag & Drop Functionaliteit
```typescript
// app/dashboard/swot/components/SWOTMatrix.tsx
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableSWOTItem = ({ item, onMove }: { item: SWOTItem; onMove: (id: string, category: SWOTCategory) => void }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SWOT_ITEM',
    item: { id: item.id, category: item.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`swot-item ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move' }}
    >
      {/* Item content */}
    </div>
  );
};

const DroppableQuadrant = ({ category, children, onDrop }: { 
  category: SWOTCategory; 
  children: React.ReactNode;
  onDrop: (itemId: string, newCategory: SWOTCategory) => void;
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'SWOT_ITEM',
    drop: (item: { id: string; category: SWOTCategory }) => {
      if (item.category !== category) {
        onDrop(item.id, category);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`swot-quadrant ${isOver ? 'border-blue-400' : ''}`}
    >
      {children}
    </div>
  );
};
```

## Styling Implementatie

### 1. CSS Classes
```css
/* app/dashboard/swot/swot.css */
.swot-container {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.9) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.swot-matrix {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  padding: 24px;
  min-height: 600px;
}

.swot-quadrant {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.swot-quadrant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.swot-quadrant:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.swot-item {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  cursor: move;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.swot-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.swot-item:hover::after {
  opacity: 1;
}

.swot-item:hover {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.priority-high {
  border-left: 3px solid #ef4444;
}

.priority-medium {
  border-left: 3px solid #f59e0b;
}

.priority-low {
  border-left: 3px solid #10b981;
}

.ai-generated {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border-color: rgba(139, 92, 246, 0.3);
}

.ai-generated::before {
  content: '✨';
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
}
```

### 2. Responsive Design
```css
@media (max-width: 768px) {
  .swot-matrix {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, minmax(300px, 1fr));
    gap: 12px;
    padding: 16px;
  }
  
  .swot-quadrant {
    padding: 16px;
    min-height: 250px;
  }
  
  .swot-item {
    padding: 10px 12px;
    font-size: 14px;
  }
}
```

## API Implementatie

### 1. SWOT Data Endpoints
```typescript
// app/api/swot/route.ts
export async function GET(request: Request) {
  // Haal SWOT analyses op voor gebruiker
}

export async function POST(request: Request) {
  // Maak nieuwe SWOT analyse
}

// app/api/swot/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Haal specifieke SWOT analyse op
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Update SWOT analyse
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Verwijder SWOT analyse
}
```

### 2. AI Suggesties Endpoint
```typescript
// app/api/swot/ai-suggestions/route.ts
export async function POST(request: Request) {
  const { currentData, category, companyName } = await request.json();
  
  const prompt = `
    Geef 3-5 suggesties voor ${category} van ${companyName}.
    Huidige SWOT data: ${JSON.stringify(currentData, null, 2)}
    
    Geef suggesties in het volgende formaat:
    - Specifiek en actiegericht
    - Maximaal 15 woorden per suggestie
    - Relevante voor huidige context
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });
  
  const suggestions = parseSuggestions(completion.choices[0].message.content);
  
  return Response.json({ suggestions });
}
```

## Database Schema

### 1. Tables
```sql
-- SWOT Analyses
CREATE TABLE swot_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SWOT Items
CREATE TABLE swot_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES swot_analyses(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('strength', 'weakness', 'opportunity', 'threat')),
  text TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  ai_generated BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Suggestions Log
CREATE TABLE ai_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES swot_analyses(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  suggestion_text TEXT NOT NULL,
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_swot_analyses_user_id ON swot_analyses(user_id);
CREATE INDEX idx_swot_items_analysis_id ON swot_items(analysis_id);
CREATE INDEX idx_swot_items_category ON swot_items(category);
CREATE INDEX idx_ai_suggestions_analysis_id ON ai_suggestions(analysis_id);
```

## Test Strategie

### 1. Unit Tests
```typescript
// __tests__/swot/SWOTMatrix.test.tsx
describe('SWOTMatrix', () => {
  it('should render all four quadrants', () => {
    // Test implementation
  });
  
  it('should handle item addition', () => {
    // Test implementation
  });
  
  it('should handle drag and drop', () => {
    // Test implementation
  });
});
```

### 2. Integration Tests
```typescript
// __tests__/swot/SWOTIntegration.test.tsx
describe('SWOT Integration', () => {
  it('should save and load SWOT data', async () => {
    // Test implementation
  });
  
  it('should generate AI suggestions', async () => {
    // Test implementation
  });
});
```

## Deploy Checklist

- [ ] Database migrations uitvoeren
- [ ] API endpoints testen
- [ ] Componenten integreren in dashboard
- [ ] Navigatie updaten
- [ ] Responsive design testen
- [ ] Accessibility testen
- [ ] Performance optimalisatie
- [ ] Error handling implementeren
- [ ] Loading states toevoegen
- [ ] Export functionaliteit testen