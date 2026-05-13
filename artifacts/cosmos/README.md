# Cosmos

A TypeScript monorepo for building web applications with a type-safe API layer, React frontend, and PostgreSQL database.

## Architecture

```
Cosmos/
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec & Orval codegen config
│   ├── api-client-react/   # React Query hooks (generated from OpenAPI)
│   ├── api-zod/            # Zod schemas (generated from OpenAPI)
│   └── db/                 # Drizzle ORM models & migrations
├── artifacts/              # Deployable applications
│   ├── cosmos/             # React frontend (Vite + Tailwind CSS)
│   ├── api-server/         # Express API server (esbuild)
│   └── mockup-sandbox/     # UI mockup sandbox
├── scripts/                # Build & CI scripts
└── attached_assets/        # Static assets
```

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Runtime**: Node.js 24
- **Language**: TypeScript 5.9
- **Frontend**: React 19, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Routing**: Wouter
- **State/Data**: TanStack React Query, Zod v4
- **API**: Express 5, OpenAPI 3.1, Orval (codegen)
- **Database**: PostgreSQL (Drizzle ORM + Drizzle Kit)
- **Build**: esbuild, Vite

## Prerequisites

- [Node.js 24](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- PostgreSQL (for API server and database)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL
```

Required environment variable:
- `DATABASE_URL` — PostgreSQL connection string (e.g. `postgresql://user:pass@localhost:5432/cosmos`)

### 3. Run the development server

**Frontend** (Vite dev server):
```bash
pnpm --filter @workspace/cosmos run dev
```

**API server** (Express):
```bash
pnpm --filter @workspace/api-server run dev
```

Both support hot module replacement.

### 4. Database migrations

Push schema changes (development):
```bash
pnpm --filter @workspace/db run push
```

Force push (resets data):
```bash
pnpm --filter @workspace/db run push-force
```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm run build` | Typecheck + build all packages |
| `pnpm run typecheck` | Full typecheck across all packages |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks & Zod schemas from OpenAPI spec |
| `pnpm --filter @workspace/db run push` | Push DB schema changes (dev) |
| `pnpm --filter @workspace/cosmos run dev` | Start frontend dev server |
| `pnpm --filter @workspace/api-server run dev` | Start API server |

## API Code Generation

The API client and Zod schemas are auto-generated from the OpenAPI spec at `lib/api-spec/openapi.yaml`. After modifying the spec:

```bash
pnpm --filter @workspace/api-spec run codegen
```

This regenerates:
- `lib/api-client-react/src/generated/` — React Query hooks
- `lib/api-zod/src/generated/` — Zod validation schemas

## Project Structure Details

### `lib/api-spec`
- `openapi.yaml` — Source of truth for all API contracts
- `orval.config.ts` — Orval configuration for code generation

### `lib/db`
- `drizzle.config.ts` — Drizzle Kit config (SQLite for local dev)
- `src/schema/` — Database schema definitions
- Migrations are managed via `drizzle-kit`

### `lib/api-client-react`
- Provides typed React Query hooks for all API endpoints
- Uses a custom fetcher wrapping the generated code

### `lib/api-zod`
- Zod schemas coerced from OpenAPI types
- Shared between client and server for validation

### `artifacts/cosmos`
- React frontend built with Vite
- Entry point: `index.html`
- Routes defined with Wouter
- Styled with Tailwind CSS + Radix UI components

### `artifacts/api-server`
- Express 5 server with Pino logging
- Bundled via esbuild (ESM output)
- Uses `drizzle-zod` for type-safe DB queries
- Built to `dist/` directory

### `artifacts/mockup-sandbox`
- Isolated sandbox for prototyping UI components
- Independent from the main app

## Development

### Adding a new API endpoint

1. Add the route to `lib/api-spec/openapi.yaml`
2. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
3. Implement the handler in `artifacts/api-server/src/`
4. Database changes go in `lib/db/src/schema/`

### Adding a new UI component

Add it under `artifacts/cosmos/src/`. Components can use:
- `@workspace/api-client-react` for data fetching
- `@workspace/api-zod` for validation
- Radix UI primitives, shadcn/ui patterns, and Tailwind CSS

## Build & Deploy

```bash
# Full build
pnpm run build

# Individual artifacts
pnpm --filter @workspace/cosmos run build
pnpm --filter @workspace/api-server run build
```

Outputs:
- `artifacts/cosmos/dist/public/` — Static frontend assets
- `artifacts/api-server/dist/` — Server bundle

## License

MIT