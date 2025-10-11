# SWOT Analyse Architectuur Diagram

## System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[SWOT Matrix UI]
        Editor[SWOT Editor]
        AI[AI Assistant Panel]
        Export[Export Component]
    end
    
    subgraph "State Management"
        Store[SWOT State Store]
        Hooks[Custom Hooks]
    end
    
    subgraph "API Layer"
        SWOTAPI[SWOT API Endpoints]
        AIAPI[AI Suggestions API]
        ExportAPI[Export API]
    end
    
    subgraph "Data Layer"
        DB[(Supabase Database)]
        Storage[(File Storage)]
    end
    
    subgraph "External Services"
        OpenAI[OpenAI API]
        Firecrawl[Firecrawl API]
    end
    
    UI --> Store
    Editor --> Store
    AI --> Store
    Export --> Store
    
    Store --> Hooks
    Hooks --> SWOTAPI
    Hooks --> AIAPI
    Hooks --> ExportAPI
    
    SWOTAPI --> DB
    AIAPI --> OpenAI
    ExportAPI --> Storage
    
    AIAPI --> Firecrawl
    
    classDef frontend fill:#e1f5fe
    classDef state fill:#f3e5f5
    classDef api fill:#e8f5e8
    classDef data fill:#fff3e0
    classDef external fill:#fce4ec
    
    class UI,Editor,AI,Export frontend
    class Store,Hooks state
    class SWOTAPI,AIAPI,ExportAPI api
    class DB,Storage data
    class OpenAI,Firecrawl external
```

## Component Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as SWOT UI
    participant Store as State Store
    participant API as SWOT API
    participant AI as AI Service
    participant DB as Database
    
    User->>UI: Start nieuwe SWOT analyse
    UI->>Store: Create new analysis
    Store->>API: POST /api/swot
    API->>DB: Save analysis
    DB-->>API: Return analysis ID
    API-->>Store: Analysis data
    Store-->>UI: Update UI
    
    User->>UI: Voeg SWOT item toe
    UI->>Store: Add item
    Store->>API: PUT /api/swot/:id
    API->>DB: Update items
    DB-->>API: Confirm update
    API-->>Store: Success
    Store-->>UI: Refresh items
    
    User->>UI: Vraag AI suggesties
    UI->>Store: Request suggestions
    Store->>AI: POST /api/swot/ai-suggestions
    AI->>AI: Generate suggestions
    AI-->>Store: Return suggestions
    Store-->>UI: Display suggestions
    
    User->>UI: Accepteer suggestie
    UI->>Store: Add suggested item
    Store->>API: Update analysis
    API->>DB: Save new item
    DB-->>API: Confirm
    API-->>Store: Success
    Store-->>UI: Update display
```

## Data Model

```mermaid
erDiagram
    SWOT_ANALYSES ||--o{ SWOT_ITEMS : contains
    SWOT_ANALYSES ||--o{ AI_SUGGESTIONS : generates
    
    SWOT_ANALYSES {
        uuid id PK
        uuid user_id FK
        text company_name
        timestamp analysis_date
        text description
        timestamp created_at
        timestamp updated_at
    }
    
    SWOT_ITEMS {
        uuid id PK
        uuid analysis_id FK
        enum category
        text text
        enum priority
        boolean ai_generated
        integer order_index
        timestamp created_at
        timestamp updated_at
    }
    
    AI_SUGGESTIONS {
        uuid id PK
        uuid analysis_id FK
        enum category
        text suggestion_text
        boolean accepted
        timestamp created_at
    }
    
    USERS {
        uuid id PK
        text email
        text name
        timestamp created_at
    }
```

## Technology Stack

```mermaid
graph LR
    subgraph "Frontend"
        React[React 18]
        NextJS[Next.js 14]
        TS[TypeScript]
        Tailwind[Tailwind CSS]
        DnD[React DnD]
    end
    
    subgraph "Backend"
        API[Next.js API Routes]
        Supa[Supabase]
        Auth[Supabase Auth]
    end
    
    subgraph "AI/External"
        OpenAI[OpenAI GPT-4]
        Firecrawl[Firecrawl API]
    end
    
    subgraph "Infrastructure"
        Vercel[Vercel Deployment]
        Storage[Supabase Storage]
    end
    
    React --> NextJS
    NextJS --> API
    API --> Supa
    API --> OpenAI
    API --> Firecrawl
    
    NextJS --> Vercel
    Supa --> Storage
```

## User Interaction Flow

```mermaid
journey
    title SWOT Analyse User Journey
    section Setup
      Start Dashboard: 5: User
      Navigate to SWOT: 4: User
      Create New Analysis: 5: User
    section Data Entry
      Add Strengths: 4: User
      Add Weaknesses: 4: User
      Add Opportunities: 4: User
      Add Threats: 4: User
    section AI Enhancement
      Request Suggestions: 5: User
      Review AI Ideas: 4: User
      Accept/Reject: 4: User
    section Interaction
      Drag & Drop: 5: User
      Edit Items: 4: User
      Set Priority: 3: User
    section Export
      Review Complete: 5: User
      Export PDF: 4: User
      Share Analysis: 3: User
```

## Performance Considerations

```mermaid
graph TD
    subgraph "Optimization Strategies"
        Cache[API Response Caching]
        Lazy[Lazy Loading]
        Debounce[Debounced Input]
        Virtual[Virtual Lists]
        Compress[Image Compression]
    end
    
    subgraph "Monitoring"
        Perf[Performance Metrics]
        Error[Error Tracking]
        Analytics[User Analytics]
    end
    
    subgraph "Scaling"
        CDN[CDN Distribution]
        Load[Load Balancing]
        DB[Database Optimization]
    end
    
    Cache --> Perf
    Lazy --> Perf
    Debounce --> Perf
    Virtual --> Perf
    Compress --> CDN
    
    Perf --> Analytics
    Error --> Analytics
    
    Analytics --> Load
    Load --> DB
```

## Security Architecture

```mermaid
graph TB
    subgraph "Authentication"
        Auth[Supabase Auth]
        JWT[JWT Tokens]
        Session[Session Management]
    end
    
    subgraph "Authorization"
        RBAC[Role-Based Access]
        Permissions[Permission Checks]
        Ownership[Data Ownership]
    end
    
    subgraph "Data Protection"
        Encrypt[Encryption at Rest]
        Transit[Encryption in Transit]
        Backup[Secure Backups]
    end
    
    subgraph "API Security"
        Rate[Rate Limiting]
        Validate[Input Validation]
        CORS[CORS Policy]
    end
    
    Auth --> JWT
    JWT --> Session
    Session --> RBAC
    RBAC --> Permissions
    Permissions --> Ownership
    
    Ownership --> Encrypt
    Encrypt --> Transit
    Transit --> Backup
    
    Backup --> Rate
    Rate --> Validate
    Validate --> CORS