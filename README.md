# 🌸 Dulces Pétalos

Catálogo online de una floristería artesanal. Explora el catálogo, encuentra tu flor y añádela al carrito.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| UI | React 19 + React Compiler |
| Lenguaje | TypeScript 6 (strict) |
| Build | Vite 8 + Rolldown |
| Routing | React Router v7 |
| Estilos | CSS Modules |
| Gestor de paquetes | pnpm |

> El **React Compiler** está activo — no uses `useMemo` ni `useCallback` para micro-optimizaciones. El compilador lo maneja.

---

## Arquitectura

El proyecto sigue una arquitectura **feature-based**: cada funcionalidad es un módulo autocontenido con sus propias capas internas. Los componentes de UI genéricos viven separados y son consumidos por las features.

```
src/
├── app/                          # Infraestructura de la aplicación
│   ├── components/Header/        # Componentes del shell
│   ├── MainLayout.tsx            # Layout principal (Header + Outlet)
│   ├── router.config.tsx         # Definición de rutas
│   └── App.tsx
│
├── components/
│   ├── card/                     # Componente Card compuesto (Card.Header, Card.Media…)
│   └── ui/                       # Primitivas de UI reutilizables
│       ├── badge/                # Badge (variant: success | default)
│       ├── breadcrumb/           # Breadcrumb compuesto (6 subcomponentes)
│       ├── button/               # Button (variant: primary | ghost)
│       └── input/                # Input con prefixIcon
│
├── features/
│   └── flowers/
│       ├── flowerListPage/       # Catálogo — listado con búsqueda
│       │   ├── api/              # Llamadas al backend (Result<T>)
│       │   ├── components/       # FlowerCard, FlowerList, FlowerSearch
│       │   ├── data/             # Mock data (hasta resolver CORS)
│       │   ├── hooks/            # useFlowerPage
│       │   ├── models/           # Flower type
│       │   └── FlowerListPage.tsx
│       │
│       └── flowerDetail/         # Detalle de una flor
│           ├── components/       # FlowerDetail (presentacional)
│           ├── hooks/            # useFlowerDetailPage
│           └── FlowerDetailPage.tsx
│
└── lib/
    ├── api-client.ts             # Cliente HTTP base
    └── result.ts                 # Tipos Result<T>, Success<T>, Failure<E>
```

---

## Patrones clave

### `Result<T>` — manejo de errores sin excepciones

Todas las llamadas a la API devuelven `Result<T>`. Nunca lanzamos excepciones para el flujo normal.

```ts
// lib/result.ts
type Result<T, E = ApiFailure> = Success<T> | Failure<E>;

// Uso en un hook
const { data: flower, error: flowerError } = await getFlower(id);
setData(flower);           // null si falló
setError(flowerError?.message ?? null);
```

### Hooks de página — `useXxxPage`

Cada página tiene su hook dedicado. El hook es el único que conoce la API y el `Result<T>`. Los componentes solo reciben `{ data, isLoading, error }`.

```ts
export const useFlowerDetailPage = (id: string) => {
    const [data, setData]       = useState<Flower | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);
    // ...
    return { data, isLoading, error };
};
```

### Componentes compuestos

Los componentes complejos exponen subcomponentes en lugar de una API de props monolítica:

```tsx
// Card
<Card to="/flowers/1">
    <Card.Header>
        <Card.Title>Rosa</Card.Title>
    </Card.Header>
    <Card.Media src="..." alt="Rosa" />
</Card>

// Breadcrumb
<Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/">Inicio</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbPage>Rosa</BreadcrumbPage>
        </BreadcrumbItem>
    </BreadcrumbList>
</Breadcrumb>
```

### Diseño responsive — mobile-first

El breakpoint base del proyecto es `768px`. Los estilos base son para mobile, y se escalan hacia desktop:

```css
/* mobile — columna única */
.container { flex-direction: column; }

/* desktop */
@media (min-width: 768px) {
    .container { flex-direction: row; }
}
```

---

## Tokens de diseño

Definidos en `src/index.css` como variables CSS globales:

```css
/* Colores */
--neutral-100: #ffffff
--neutral-200: #f9f9f9     /* fondo de la app */
--neutral-800: #606060     /* texto secundario */
--neutral-1000: #111111    /* texto principal */
--accent-600: #771e42      /* color de marca */

/* Radios */
--radius-2xs: 8px
--radius-sm: 24px
--radius-md: 32px
--radius-full: 999px       /* pill shape */

/* Espaciado */
--spacing-2xs: 8px
--spacing-xs: 16px
--spacing-xl: 48px
```

---

## Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `FlowerListPage` | Catálogo con búsqueda |
| `/flowers/:id` | `FlowerDetailPage` | Detalle de una flor |
| `*` | — | Redirige a `/` |

Todas las rutas son hijas de `MainLayout` (Header + contenido).

---

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev
```

```bash
pnpm build    # build de producción
pnpm preview  # preview del build
pnpm lint     # ESLint
```

---

## openspec — documentación de cambios

Las decisiones de diseño, PRDs y especificaciones técnicas de cada feature viven en `openspec/`. Es la fuente de verdad de *por qué* el código es como es.

```
openspec/
└── flower-detail/
    └── prd.md    # Requisitos, estructura, componentes y decisiones del detalle de flor
```

Cada cambio significativo tiene su carpeta propia con el PRD que lo originó. Si en algún momento te preguntas *"¿por qué se hizo así?"*, la respuesta está en `openspec/`.
