# PRD — Página de Detalle de Flor (`FlowerDetailPage`)

**Proyecto:** Dulces Pétalos  
**Fecha:** 2026-04-22  
**Estado:** Aprobado

---

## 1. Objetivo

Crear la página de detalle de una flor accesible desde `/flowers/:id`, dentro del `MainLayout` existente. La página muestra toda la info relevante de una flor individual con layout responsivo (mobile-first) y tres nuevos componentes UI reutilizables.

---

## 2. Ruta

| Ruta | Componente |
|------|-----------|
| `/flowers/:id` | `FlowerDetailPage` |

Se agrega como hijo de `MainLayout` en `router.config.tsx`, al mismo nivel que `FlowerListPage`.

---

## 3. Nuevos componentes UI (`src/components/ui/`)

### 3.1 `Breadcrumb`

**Ubicación:** `src/components/ui/breadcrumb/`

**Archivos:** `Breadcrumb.tsx` + `breadcrumb.module.css`

**Anatomía del componente (composición):**
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/">Inicio</a>} />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{flower.name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Subcomponentes a exportar:**
- `Breadcrumb` — contenedor semántico `<nav aria-label="breadcrumb">`
- `BreadcrumbList` — `<ol>` con flex row, gap, list-style none
- `BreadcrumbItem` — `<li>`
- `BreadcrumbLink` — acepta prop `render` (render prop pattern) para inyectar un `<a>` o `<Link>` de React Router
- `BreadcrumbSeparator` — `<span aria-hidden="true">›</span>`
- `BreadcrumbPage` — `<span aria-current="page">` para el ítem activo (no es link)

> **No se necesita** `DropdownMenu` ni `BreadcrumbEllipsis` — el detalle solo tiene dos niveles: `Inicio > Nombre`.

---

### 3.2 `Badge`

**Ubicación:** `src/components/ui/badge/`

**Archivos:** `Badge.tsx` + `badge.module.css`

```tsx
type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "default";
};
```

- `variant="success"` → fondo verde claro, texto verde oscuro (para el badge "Nuevo")
- `variant="default"` → neutro (extensible a futuro)
- Pill shape: `border-radius: var(--radius-full)`

---

### 3.3 `Button`

**Ubicación:** `src/components/ui/button/`

**Archivos:** `Button.tsx` + `button.module.css`

```tsx
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
};
```

- `variant="primary"` → fondo `var(--accent-600)`, texto blanco, hover con opacidad/oscuridad
- `fullWidth` → `width: 100%` (útil en mobile)
- Por defecto: `type="button"` para evitar submit accidental

---

## 4. Feature: `FlowerDetailPage`

### 4.1 Estructura de carpetas

```
src/features/flowers/flowerDetail/
├── FlowerDetailPage.tsx
├── flower-detail-page.module.css
├── hooks/
│   └── useFlowerDetailPage.ts
└── components/
    └── FlowerDetail/
        ├── FlowerDetail.tsx
        └── flower-detail.module.css
```

---

### 4.2 Hook — `useFlowerDetailPage`

**Mismo formato que `useFlowerPage`:** estado local con `useState` + `useEffect`, branching del `Result<T>` DENTRO del hook.

```ts
// src/features/flowers/flowerDetail/hooks/useFlowerDetailPage.ts

export const useFlowerDetailPage = (id: string) => {
  const [data, setData] = useState<Flower | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setIsLoading(true);
    const { data: flower, error: flowerError } = await getFlower(id);
    setData(flower);
    setError(flowerError?.message ?? null);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]); // re-fetch si cambia el id (navegación entre detalles)

  return { data, isLoading, error };
};
```

> El `id` viene de `useParams()` en `FlowerDetailPage`, **no** dentro del hook. El hook solo recibe el string.

---

### 4.3 `FlowerDetailPage` (página contenedora)

Responsabilidades:
1. Leer `id` con `useParams()`
2. Redirigir a `/` si `id` es `undefined`
3. Llamar a `useFlowerDetailPage(id)`
4. Gestionar estados: loading → error → data
5. Renderizar `Breadcrumb` + `FlowerDetail`

```tsx
export const FlowerDetailPage = () => {
  const { id } = useParams();
  // guard: si no hay id, Navigate a "/"
  const { data, isLoading, error } = useFlowerDetailPage(id!);
  // ...
};
```

---

### 4.4 `FlowerDetail` (componente presentacional)

Recibe `flower: Flower` como prop. Layout mobile-first:

#### Mobile (columna única, apilado)
```
[ imagen con badge "Nuevo" superpuesto ]
[ nombre ]
[ binomialName ]
[ precio ]
[ botón "Añadir al carrito" ]
```

#### Desktop (≥ 768px, dos columnas)
```
[ imagen (izq, border-radius: var(--radius-sm)) ] | [ nombre        ]
                                                   | [ binomialName  ]
                                                   | [ precio        ]
                                                   | [ btn carrito   ]
```

**Especificaciones visuales:**
- Imagen: `border-radius: var(--radius-sm)` en desktop, `var(--radius-2xs)` en mobile
- Badge "Nuevo": posición `absolute` sobre la imagen (top-left o top-right), `variant="success"`
- `binomialName`: cursiva, color `var(--neutral-800)`
- Precio: tamaño grande, negrita, color `var(--accent-600)`
- Botón "Añadir al carrito": `variant="primary"`, `fullWidth` en mobile

---

## 5. CSS — Breakpoint

El proyecto no tiene breakpoints definidos todavía. Se establece:

```css
/* mobile-first: estilos base = mobile */
/* desktop: @media (min-width: 768px) */
```

Se documenta como convención del proyecto.

---

## 6. Router — cambio en `router.config.tsx`

```tsx
import { FlowerDetailPage } from "@/features/flowers/flowerDetail/FlowerDetailPage";

// dentro de children de MainLayout:
{
  path: "/flowers/:id",
  element: <FlowerDetailPage />,
}
```

---

## 7. Qué NO entra en este PRD

| Fuera de scope | Razón |
|----------------|-------|
| `DropdownMenu` / `BreadcrumbEllipsis` | Solo 2 niveles en breadcrumb |
| Funcionalidad real del carrito | Solo UI, sin lógica de estado global |
| Animaciones / transiciones | Fuera del alcance solicitado |
| Tests | No hay runner configurado en el proyecto |

---

## 8. Archivos a crear/modificar

| Acción | Archivo |
|--------|---------|
| CREAR | `src/components/ui/breadcrumb/Breadcrumb.tsx` |
| CREAR | `src/components/ui/breadcrumb/breadcrumb.module.css` |
| CREAR | `src/components/ui/badge/Badge.tsx` |
| CREAR | `src/components/ui/badge/badge.module.css` |
| CREAR | `src/components/ui/button/Button.tsx` |
| CREAR | `src/components/ui/button/button.module.css` |
| CREAR | `src/features/flowers/flowerDetail/FlowerDetailPage.tsx` |
| CREAR | `src/features/flowers/flowerDetail/flower-detail-page.module.css` |
| CREAR | `src/features/flowers/flowerDetail/hooks/useFlowerDetailPage.ts` |
| CREAR | `src/features/flowers/flowerDetail/components/FlowerDetail/FlowerDetail.tsx` |
| CREAR | `src/features/flowers/flowerDetail/components/FlowerDetail/flower-detail.module.css` |
| MODIFICAR | `src/app/router.config.tsx` — agregar ruta `/flowers/:id` |
