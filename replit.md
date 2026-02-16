# Xenflow - AI Technology Company Landing Page

## Overview

Xenflow is a single-page marketing website for an AI/tech company called "XENFLOW" with the tagline "Scaling Intelligence." It features a dark, futuristic design with neon red accents, glassmorphism effects, and smooth animations. The site includes sections for services, technology, case studies, about, and a contact form that persists submissions to a PostgreSQL database.

The project follows a full-stack TypeScript monorepo pattern with a React frontend served by an Express backend, using Drizzle ORM for database access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project is organized into three main directories:
- **`client/`** — React SPA (Single Page Application)
- **`server/`** — Express.js API server
- **`shared/`** — Code shared between client and server (database schema, route definitions, types)

### Frontend (`client/src/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router) — currently just `/` (Home) and a 404 page
- **Styling**: Tailwind CSS with CSS variables for theming (dark mode only, black + neon red `#FF0000`)
- **UI Components**: shadcn/ui (new-york style) — extensive library in `client/src/components/ui/`
- **Animations**: Framer Motion for scroll reveals, floating elements, and hover effects
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Data Fetching**: TanStack React Query with a custom `apiRequest` helper
- **Fonts**: Inter (sans-serif body) and Space Mono (monospace headings)
- **Build Tool**: Vite with React plugin

### Backend (`server/`)
- **Framework**: Express.js (v5) running on Node.js
- **API Pattern**: Single REST endpoint `POST /api/contact` for contact form submissions
- **Route Definitions**: Centralized in `shared/routes.ts` — both client and server reference the same route paths and Zod schemas
- **Storage Pattern**: Interface-based (`IStorage`) with `DatabaseStorage` implementation in `server/storage.ts`
- **Dev Server**: Vite dev server middleware is attached to Express in development mode
- **Static Serving**: In production, serves built files from `dist/public/`

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `pg` Pool using `DATABASE_URL` environment variable
- **Schema**: Defined in `shared/schema.ts` — currently one table:
  - `contact_messages`: id (serial PK), name (text), email (text), message (text), createdAt (timestamp)
- **Validation**: `drizzle-zod` generates Zod schemas from Drizzle table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema sync

### Build System
- **Client Build**: Vite outputs to `dist/public/`
- **Server Build**: esbuild bundles server to `dist/index.cjs`, with selective dependency bundling (allowlist in `script/build.ts`)
- **Dev**: `tsx server/index.ts` with Vite HMR middleware
- **Production**: `node dist/index.cjs`

### Key Design Decisions
1. **Shared route contracts** — Route paths, HTTP methods, and Zod schemas are defined once in `shared/routes.ts` and used by both client and server, ensuring type safety across the stack.
2. **Storage interface pattern** — `IStorage` interface in `server/storage.ts` abstracts database operations, making it easy to swap implementations.
3. **CSS variables for theming** — All colors use HSL CSS variables defined in `client/src/index.css`, making theme changes centralized.
4. **SPA with server-side fallback** — All non-API routes fall through to `index.html` for client-side routing.

## External Dependencies

### Required Services
- **PostgreSQL Database** — Required. Connection via `DATABASE_URL` environment variable. The app will crash on startup without it.

### Key NPM Packages
- **Frontend**: React, Wouter, Framer Motion, TanStack React Query, shadcn/ui (Radix primitives), Tailwind CSS, React Hook Form, Zod
- **Backend**: Express v5, Drizzle ORM, pg (node-postgres), connect-pg-simple
- **Shared**: Zod, drizzle-zod
- **Build**: Vite, esbuild, tsx

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors in an overlay
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)

### Google Fonts (CDN)
- Inter (body text)
- Space Mono (headings/monospace)
- DM Sans, Fira Code, Geist Mono, Architects Daughter (loaded in HTML head)