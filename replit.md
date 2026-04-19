# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Project: Vynza

A deals discovery and rewards app. Users browse deals from top brands and earn points for viewing them. Points unlock rewards.

### Features
- Browse deals with category filters and search
- Earn points (+5 to +15 per deal) for viewing deals
- Points tracker visible in nav across all pages
- Deal detail pages
- Rewards catalog to redeem points
- Activity/history feed of earned points
- User rank system (Scout → Hunter → Seeker → Expert → Elite → Legend)

### Architecture
- **Frontend**: `artifacts/vynza` — React + Vite + Tailwind + React Query
- **Backend**: `artifacts/api-server` — Express 5 + Drizzle ORM
- **Database**: PostgreSQL with tables: `deals`, `rewards`, `points_transactions`, `deal_views`
- **Session**: Client-side UUID in localStorage (no auth required)

### API Endpoints
- `GET /api/deals` — list/search/filter deals
- `GET /api/deals/featured` — featured deals
- `GET /api/deals/categories` — categories with counts
- `GET /api/deals/:id` — single deal
- `GET /api/points?sessionId=` — points summary
- `GET /api/points/history?sessionId=` — transaction history
- `POST /api/points/view-deal` — record view + award points
- `GET /api/rewards` — available rewards
