# ARqueologIA Rupestre

Plataforma web responsive para la exploración, localización e interpretación de arte rupestre en España. Combina **geolocalización** y, en fases futuras, **Realidad Aumentada (AR)** e **Inteligencia Artificial (IA)** — de ahí el nombre del proyecto.

La aplicación permite descubrir yacimientos de pintura rupestre sobre un mapa interactivo, consultar fichas arqueológicas detalladas y valorar los sitios visitados, contribuyendo a la preservación del patrimonio arqueológico.

> **Nota:** este repositorio contiene **únicamente el frontend**. Toda la lógica de datos y autenticación se delega en [Supabase](https://supabase.com) (PostgreSQL + Auth + Row Level Security). No hay backend propio que desplegar.

## Características

**Implementadas**

- Mapa interactivo a pantalla completa con clusterización de marcadores (Leaflet + MarkerCluster).
- Fichas arqueológicas con descripción, datación, localización y bibliografía.
- Sistema de valoraciones (1–5 estrellas) y comentarios.
- Autenticación con Supabase (email + password), incluyendo recuperación y actualización de contraseña.
- Rutas protegidas (perfil de usuario) y páginas con estados de carga y error.
- Protección de coordenadas sensibles mediante `visibility_level` (`PUBLIC` / `APPROXIMATE` / `HIDDEN`), aplicada en el servidor con RLS.

**Planificadas (roadmap)**

- Galerías de imágenes por sitio (`site_images`).
- Superposición de Realidad Aumentada sobre las pinturas (`ar_elements`).
- Perfiles de usuario enriquecidos (`profiles`).

## Stack tecnológico

| Área | Tecnología |
| --- | --- |
| Framework UI | React 19 + TypeScript |
| Empaquetado | Vite 6 |
| Enrutado | React Router 7 (rutas en español: `/mapa`, `/sitio/:id`, `/registro`…) |
| Estado de datos | TanStack Query 5 |
| Estilos | Tailwind CSS 4 (variables CSS, sin `tailwind.config`) + shadcn/ui |
| Mapa | react-leaflet + leaflet.markercluster |
| Formularios | react-hook-form + zod |
| Backend (BaaS) | Supabase (PostgreSQL + Auth + RLS) |

## Requisitos previos

- [Node.js](https://nodejs.org) LTS
- npm
- Un proyecto de Supabase con las tablas `sites` y `reviews` (ver [Modelo de datos](#modelo-de-datos))

## Puesta en marcha

1. Clona el repositorio e instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz a partir de `.env.example`:

   ```dotenv
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

   Ambas variables son obligatorias: `src/lib/supabase.ts` lanza un error en el arranque si falta alguna.

3. Arranca el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Compilación de tipos (`tsc -b`) + build de producción |
| `npm run preview` | Previsualización del build de producción |
| `npm run lint` | ESLint con reglas de tipo estrictas (`strictTypeChecked`) |
| `npm run format` | Formatea `src/**/*.{ts,tsx,css}` con Prettier |

> No existe framework de tests por ahora.

## Estructura del proyecto

```
src/
├── app/          # Enrutado (router con rutas lazy)
├── components/   # Componentes de la app y shadcn/ui (components/ui)
├── constants/    # Claves de query y constantes globales
├── contexts/     # Contexto de autenticación
├── hooks/        # Hooks con TanStack Query
├── layouts/      # Layouts principal y de autenticación
├── lib/          # Cliente de Supabase
├── pages/        # Páginas (Home, Mapa, Detalle, Login, Registro…)
├── providers/    # Proveedores globales (QueryClient, Router, Auth)
├── services/     # Acceso a datos: servicios → supabase-js
├── styles/       # globals.css con tokens de tema de Tailwind v4
├── types/        # Tipos de base de datos y declaraciones ambient
└── utils/        # Utilidades (cn, formateadores)
```

La arquitectura sigue una estratificación estricta: **componentes → hooks → servicios → supabase-js**. Los componentes nunca llaman a Supabase directamente y los servicios no usan React.

## Modelo de datos

Tablas actuales en Supabase:

- **`sites`** — yacimientos: nombre, descripción, datación, coordenadas, `visibility_level`, imagen destacada.
- **`reviews`** — valoraciones y comentarios anónimos o con nombre de autor.

La seguridad se aplica en el servidor mediante Row Level Security (ver `docs/ARqueologIA_Supabase_Development_Package/03_RLS_POLICY_GUIDE.md`):

- `sites`: lectura pública, escritura solo para administradores.
- `reviews`: lectura pública, inserción para usuarios autenticados, edición/borrado por el propietario.
- La privacidad de coordenadas se garantiza con RLS según el `visibility_level` — nunca se filtra en el frontend.

## Documentación

- `docs/ARqueologIA_Rupestre_Especificacion_v3.md` — especificación funcional y técnica original (arquitectura de backend descrita ahí es aspiracional).
- `docs/ARqueologIA_Supabase_Development_Package/` — arquitectura Supabase, evolución de base de datos, guía de RLS y especificación del frontend.

## Convenciones

- Código, mensajes de error, textos de interfaz y documentación en **español**.
- Alias de importación `@/` → `src/`.
- Prettier: comillas dobles, punto y coma, indentación de 2 espacios, anchura 90.
