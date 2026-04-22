# Exploration: catalogo-productos

**Change:** catalogo-productos  
**Project:** dulces-petalos  
**Date:** 2026-04-21  
**Status:** Ready for Proposal

---

## Current State

The project is a React 19 + TypeScript + Vite 8 shell with almost no real code yet:

- `src/lib/api-client.ts` — fetch wrapper with `Result<T>` pattern, reads `VITE_API_URL` directly from `import.meta.env`
- `src/lib/result.ts` — `Result<T>`, `Success<T>`, `Failure<E>`, `ok()`, `fail()` constructors
- `src/App.tsx` — empty shell (default export, function declaration, no router)
- `src/main.tsx` — mounts `<App />` in `StrictMode`, no provider wrapper
- `src/components/card/Card.tsx` — stub component (arrow function, no CSS Module yet — uses raw `.css`)
- `src/components/card/card.css` — has invalid CSS values (`Radius/m`, `Spacing/xs`, unitless numbers) — needs cleanup
- `src/index.css` — design tokens as CSS variables (`--neutral-*`, `--accent-600`, `--black`), `#root` at 1126px centered
- `src/features/` — completely empty
- React Router is **NOT installed** — needs `pnpm add react-router`
- The `api-client.ts` reads `VITE_API_URL` inline — no `config/env.ts` layer exists

---

## Affected Areas

- `src/App.tsx` — will be replaced/moved to `src/app/app.tsx`
- `src/main.tsx` — needs provider wrapper added
- `src/lib/api-client.ts` — currently reads env inline; a `config/env.ts` will decouple this
- `src/components/card/` — existing stub, will be evolved into `ProductCard`
- `src/features/products/` — entirely new feature slice to create
- `src/app/` — new directory: router, provider, app shell
- `openspec/catalogo-productos/` — SDD artifact directory

---

## Key Decisions

### 1. Folder Structure — Minimal but Complete

Only create what's needed for the two views:

```
src/
├── app/
│   ├── router.tsx          # createBrowserRouter definition
│   ├── provider.tsx        # RouterProvider wrapper
│   └── app.tsx             # re-export or thin shell
├── config/
│   └── env.ts              # re-exports VITE_API_URL
├── components/
│   └── card/               # evolve existing stub
├── features/
│   └── products/
│       ├── api/
│       │   └── products.api.ts     # raw API calls
│       ├── hooks/
│       │   ├── useProducts.ts      # list hook
│       │   └── useProduct.ts       # detail hook
│       ├── components/
│       │   ├── ProductCard/
│       │   │   ├── ProductCard.tsx
│       │   │   └── ProductCard.module.css
│       │   ├── ProductList/
│       │   │   ├── ProductList.tsx
│       │   │   └── ProductList.module.css
│       │   └── ProductDetail/
│       │       ├── ProductDetail.tsx
│       │       └── ProductDetail.module.css
│       ├── pages/
│       │   ├── ProductsPage.tsx    # route component for /
│       │   └── ProductDetailPage.tsx  # route component for /product/:id
│       └── types/
│           └── product.ts
```

**Rationale:** No `stores/`, `testing/`, `utils/` at this scale — add only when needed. Pages live inside the feature, not in `app/routes/`, because they belong to the feature domain.

---

### 2. React Router — `createBrowserRouter` (Data API)

**Decision:** Use `createBrowserRouter` + `RouterProvider`, NOT `<BrowserRouter>`.

**Rationale:**
- It's the current React Router v6/v7 recommended approach
- Supports future loader/action data patterns without refactor
- `RouterProvider` fits cleanly in `provider.tsx`
- `<BrowserRouter>` is legacy JSX approach — no advantage here

```tsx
// src/app/router.tsx
import { createBrowserRouter } from 'react-router'
import { ProductsPage } from '../features/products/pages/ProductsPage'
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage'

export const router = createBrowserRouter([
  { path: '/', element: <ProductsPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
])
```

```tsx
// src/app/provider.tsx
import { RouterProvider } from 'react-router'
import { router } from './router'

export function AppProvider() {
  return <RouterProvider router={router} />
}
```

---

### 3. Custom Hooks — Migration-Friendly Shape

**Decision:** Hooks expose a stable interface that matches TanStack Query's shape, using `useState`/`useEffect` internally. When migrating, only the hook internals change — consuming components are untouched.

```ts
// Shape that TanStack Query useQuery returns (the parts we use):
{ data, isLoading, error }

// Our hook mirrors this exactly:
function useProducts() {
  return { data: Product[] | undefined, isLoading: boolean, error: string | null }
}

function useProduct(id: string) {
  return { data: Product | undefined, isLoading: boolean, error: string | null }
}
```

**Implementation pattern:**
```ts
// src/features/products/hooks/useProducts.ts
import { useState, useEffect } from 'react'
import { getProducts } from '../api/products.api'
import type { Product } from '../types/product'

export function useProducts() {
  const [data, setData] = useState<Product[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    getProducts().then(result => {
      if (cancelled) return
      if (result.ok) {
        setData(result.data)
      } else {
        setError(result.error.error.message)
      }
      setIsLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return { data, isLoading, error }
}
```

**Migration path to TanStack Query:** Replace `useState/useEffect` block with `useQuery({ queryKey: ['products'], queryFn: getProducts })` — the return shape `{ data, isLoading, error }` stays identical.

---

### 4. Shared Components Scope

At this scale, only two shared components are warranted:

| Component | Location | Purpose |
|-----------|----------|---------|
| `ErrorMessage` | `src/components/ErrorMessage/` | Reusable error display for failed API calls |
| `LoadingSpinner` | `src/components/LoadingSpinner/` | Reusable loading indicator |

The existing `Card` component in `src/components/card/` should remain as a **generic presentational** card shell (if it has generic use), or be moved into `features/products/components/ProductCard/` if it's product-specific. Given its current stub state (no props, no real CSS), it should be **repurposed as `ProductCard`** inside the feature.

**Decision:** Move/rename `src/components/card/` → `src/features/products/components/ProductCard/`. Keep `src/components/` for truly shared `ErrorMessage` and `LoadingSpinner`.

---

### 5. CSS Module Strategy — Responsive 3-Column Grid

**Decision:** CSS Grid with `auto-fill` on the list container, defined in `ProductList.module.css`.

```css
/* ProductList.module.css */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
```

**Rationale:**
- `auto-fill` with `minmax(320px, 1fr)` naturally gives 3 columns at 1126px width (fits ~3 × 320px + gaps)
- Collapses to 2 then 1 column on smaller viewports — responsive with zero media queries
- Avoids hardcoded breakpoints; adapts to container width
- The `#root` is already capped at `1126px` in `index.css`

**Breakpoint fallback** (only if needed for exact 3-col requirement):
```css
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
```

---

### 6. Result<T> Pattern in Components — Branching at Hook Level

**Decision:** The `ok/fail` branching happens **inside the custom hook**, NOT in the component. Components receive clean `{ data, isLoading, error }` — no `Result<T>` leaks into JSX.

```tsx
// WRONG — Result<T> leaking into component:
const result = useProducts() // returns Result<Product[]>
if (!result.ok) return <ErrorMessage message={result.error.error.message} />

// CORRECT — branching encapsulated in hook:
const { data, isLoading, error } = useProducts()
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error} />
return <ProductList products={data!} />
```

**Rationale:** This keeps components purely presentational and makes TanStack Query migration trivially easy since `useQuery` also returns `{ data, isLoading, error }`.

---

### 7. config/env.ts — Yes, Create It

**Decision:** Create `src/config/env.ts` that re-exports `VITE_API_URL`.

**Rationale:**
- Currently `api-client.ts` reads `import.meta.env.VITE_API_URL` directly — this couples infra to the API client
- A `config/env.ts` provides a single source of truth, easier to test/mock
- TypeScript-typed and validated at import time

```ts
// src/config/env.ts
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL as string,
} as const
```

Then `api-client.ts` imports `ENV.API_URL` instead of reading `import.meta.env` inline.

---

## Approaches Considered

### Routing Approach

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| `createBrowserRouter` | Future-proof, data API ready, recommended | Slightly more boilerplate | Low |
| `<BrowserRouter>` JSX | Familiar, less boilerplate | Legacy, no data API | Low |

**→ Chose `createBrowserRouter`**

### Hook Data Shape

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| Return `Result<T>` directly | Keeps Result semantics visible | Breaks TanStack migration; leaks infra to UI | Low |
| Return `{data, isLoading, error}` | Migration-safe, matches TQ shape exactly | Slight abstraction overhead | Low |

**→ Chose `{data, isLoading, error}` shape**

### Grid Layout

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| `auto-fill` with `minmax` | Responsive by default, no media queries needed | May not hit exact 3 cols in edge cases | Low |
| Fixed 3-col grid + breakpoints | Exact control | Requires explicit breakpoints | Low |
| Flexbox with `flex-wrap` | Familiar | Less precise control of item sizing | Low |

**→ Chose `auto-fill` minmax (with optional breakpoints as fallback)**

---

## Risks

1. **`card.css` has invalid CSS values** (`Radius/m`, `Spacing/xs`, unitless numbers) — needs to be rewritten as valid CSS Module before use
2. **React Router not installed** — must `pnpm add react-router` before any routing code
3. **`api-client.ts` reads env inline** — if not refactored to use `config/env.ts`, the coupling stays; low risk but technical debt
4. **`api-client.ts` `fail()` call shape mismatch** — `fail({ ok: false, error: { ... } })` wraps an extra `ok: false` layer inside `ApiFailure`. The `Failure<ApiFailure>` type has `error: ApiFailure` which itself is `Failure<{message, statusCode}>`. The accessing pattern `result.error.error.message` is correct but confusing — worth noting in design doc
5. **`useProduct(id)` needs AbortController / cancellation** — the `id` dependency in `useEffect` means we need cleanup on route change to avoid state updates on unmounted components (pattern shown above with `cancelled` flag, or use AbortController)
6. **TypeScript strict mode** — `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` are all on — all generated code must be lint-clean immediately

---

## Recommendation

Build the feature with this order:

1. `pnpm add react-router` — unblock routing
2. Create `src/config/env.ts` — decouple env
3. Create `src/features/products/types/product.ts` — define `Product` type first (need to check API response shape)
4. Create `src/features/products/api/products.api.ts`
5. Create `src/features/products/hooks/useProducts.ts` + `useProduct.ts`
6. Create shared `ErrorMessage` + `LoadingSpinner` components
7. Create `ProductCard`, `ProductList`, `ProductDetail` feature components
8. Create route pages `ProductsPage`, `ProductDetailPage`
9. Wire up `src/app/router.tsx`, `provider.tsx`, `app.tsx`
10. Update `src/main.tsx` to mount `<AppProvider />`

**One unknown:** The actual shape of `GET /api/v1/product` response. We need to know if it returns `Product[]` directly or `{ data: Product[], total: number, ... }`. This should be confirmed before writing types — or we write a flexible type and adjust after first API call test.

---

## Ready for Proposal

**Yes.** All architectural decisions are clear. The only open question is the exact API response shape for the product list endpoint — this is a low-risk unknown (we can start with `unknown` and refine). The proposal can proceed.
