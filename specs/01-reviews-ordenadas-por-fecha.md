# SPEC 01 — Reviews ordenadas por fecha en el detalle del sitio

> **Estado:** Implementado
> **Depende de:** Ninguna
> **Fecha:** 2026-10-18
> **Objetivo:** Mostrar las reviews de un sitio en su página de detalle, con la
> más reciente primero.

## Por qué existe este spec

La UI y el orden ya estaban escritos, pero eran código muerto: la query de
reviews nunca se ejecutaba por un bug en `enabled`. Este spec corrige el bug
de carga y el refresco tras crear una review.

## Alcance

**In:**

- Corregir `enabled` en `src/hooks/useReviews.ts` para que la query de reviews
  se ejecute en `/sitio/:id`.
- Garantizar el orden `created_at` DESC (ya existe en
  `ReviewService.getBySiteId`) con desempate determinista por `id` DESC.
- Corregir la invalidación de caché en `useCreateReview` para que la lista y el
  promedio se refresquen tras crear una review.

**Fuera de alcance (para specs futuros):**

- Arreglar los campos del flujo de creación (`profile_id` vs `user_id`,
  `author_name` nunca enviado).
- Paginación o botón "cargar más" en el listado.
- Rediseño visual de la sección de valoraciones.

## Modelo de datos

Este feature no introduce estructuras de datos nuevas. Reutiliza el modelo
existente: tabla `reviews` (`ReviewRow` en `src/types/database.ts`) y el
componente `ReviewCard` tal cual está.

## Plan de implementación

1. En `src/hooks/useReviews.ts`, reemplazar `enabled: Number.isFinite(siteId)`
   (siempre `false` con un `string`) por `enabled: !!siteId`. Prueba manual:
   abrir `/sitio/:id` de un sitio con reviews → la lista se muestra, la más
   reciente arriba.
2. En `src/services/review.service.ts` (`getBySiteId`), añadir orden secundario
   `.order("id", { ascending: false })` tras el `created_at` DESC existente, para
   desempatar reviews con el mismo `created_at`.
3. En `useCreateReview.onSuccess`, invalidar usando `variables.site_id` (el
   string de la ruta, misma clave que la query de lista) en vez de
   `data.site_id` (number, clave que no coincide). Incluir también la
   invalidación del sitio/promedio con la constante `SITE_QUERY_KEY` (hoy usa
   el literal `"sites"` con number). Prueba manual: si el flujo de creación
   funciona en la BD, la review nueva aparece al principio sin recargar.
4. Ejecutar `npm run lint` y `npm run build`.

## Criterios de aceptación

- [ ] Al abrir `/sitio/:id` de un sitio con reviews, la lista se muestra
      (antes la sección quedaba en blanco).
- [ ] La primera card es la review con el `created_at` más reciente.
- [ ] La fecha de cada card coincide con el `created_at` de esa review.
- [ ] Se ven los estados de carga, error con reintento y vacío según el caso.
- [ ] Las claves de invalidación de `useCreateReview` coinciden exactamente
      (mismo valor y tipo) con las claves de las queries de reviews y
      sitio/promedio.
- [ ] Si la creación funciona contra la BD real, la review nueva aparece al
      principio de la lista sin recargar la página.
- [ ] `npm run build` pasa sin errores y los cambios de este spec no
      introducen errores nuevos de lint (conjunto idéntico al de la base).

## Decisiones

- **Sí:** `enabled: !!siteId` en vez de copiar el `enabled: true` de los hooks
  hermanos. El guard tiene sentido si el hook se reusa fuera de la ruta, y es
  tipo-correcto (un string nunca pasa `Number.isFinite`).
- **Sí:** desempate secundario por `id` DESC. Barato y hace el orden
  determinista con `created_at` iguales.
- **Sí:** invalidar con `variables.site_id` (string de la ruta). Garantiza
  coincidencia exacta de claves sea cual sea el tipo real que devuelva la BD.
- **No:** paginación ni límite. Escala actual pequeña; cargar todas (decisión
  del usuario).
- **No:** arreglar el flujo de creación (`profile_id`/`user_id`,
  `author_name`). Fuera de scope; va en su propio spec (decisión del usuario).
- **No:** ordenar en el frontend. El orden lo dicta la query a Supabase; el
  cliente no reordena.
- **Sí (durante la implementación):** el criterio de lint se interpreta como
  "sin errores nuevos". El lint ya fallaba en la base con 49 errores
  preexistentes en ~15 archivos (verificado con stash: conjunto idéntico antes
  y después de los cambios de este spec); la limpieza global de lint va en su
  propio spec.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| `src/types/database.ts` es escrito a mano; el tipo real de `site_id` puede diferir | La invalidación usa `variables.site_id` (string de la ruta), robusto ante cualquier tipo real |
| La creación de reviews puede estar rota contra la BD real (mismatch `user_id`/`profile_id`, spec aparte) | Ese criterio se verifica por revisión de código (claves coinciden) hasta que el spec de creación lo arregle |

## Qué **no** está en este spec

- Arreglar los campos del flujo de creación de reviews.
- Paginación o "cargar más".
- Rediseño de la sección de valoraciones.

Cada uno de esos, si llega, va en su propio spec.
