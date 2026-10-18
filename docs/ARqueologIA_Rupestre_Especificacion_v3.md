# ARqueologIA Rupestre
## Especificación Funcional, Técnica y de Seguridad (v3.0)

### Resumen del proyecto
ARqueologIA Rupestre es una plataforma web responsive que combina geolocalización, realidad aumentada (AR) e inteligencia artificial (IA) para facilitar la exploración, localización e interpretación de pinturas rupestres ubicadas en España.

El nombre del proyecto utiliza:
- **AR** → Realidad Aumentada
- **IA** → Inteligencia Artificial

---

# 1. Objetivos

## Objetivo principal

Desarrollar una aplicación web accesible desde ordenador, tablet y móvil que permita:

1. Visualizar pinturas rupestres sobre un mapa interactivo.
2. Consultar fichas arqueológicas detalladas.
3. Utilizar realidad aumentada para localizar elementos de las pinturas in situ.
4. Interactuar con componentes individuales de las escenas.
5. Visualizar animaciones interpretativas cuando existan.
6. Permitir valoraciones y comentarios de usuarios.
7. Incorporar funcionalidades de IA para enriquecer la experiencia.

---

# 2. Arquitectura tecnológica

## Frontend

- React 19+
- TypeScript
- Vite
- React Router
- TanStack Query
- PWA

## Backend

- Node.js LTS
- Express.js
- TypeScript

## Base de datos

- MySQL 8+
- Prisma ORM

## Mapa

- Leaflet o Mapbox GL JS
- Marker Clustering

## Realidad aumentada

- WebXR
- Three.js
- AR.js (si fuera necesario)

## Infraestructura

- Docker
- Nginx
- HTTPS obligatorio

---

# 3. Pantallas

## Home

Contenido:
- Logo
- Título ARqueologIA Rupestre
- Imagen principal
- Descripción
- Botón "Explorar Mapa"

## Mapa

Mapa a pantalla completa.

Funciones:
- Zoom táctil y ratón
- Arrastre
- Geolocalización opcional
- Clusterización automática
- Popup informativo

Popup:
- Nombre
- Imagen destacada
- Botón Detalle
- Botón Localizar

## Detalle

Información:
- Nombre
- Descripción extensa
- Datación
- Provincia
- Comunidad Autónoma
- Características
- Bibliografía
- Galería multimedia
- Valoraciones
- Comentarios
- Botón Localizar

## Realidad Aumentada

Disponible únicamente en móviles compatibles.

Funciones:
- Cámara en tiempo real
- Geolocalización
- Orientación del dispositivo
- Superposición AR
- Elementos interactivos
- Animaciones opcionales

---

# 4. Funcionalidades del mapa

## Navegación

- Arrastrar mapa
- Zoom
- Centrado automático mediante GPS

## Marcadores

Cada ubicación incluye:

- id
- nombre
- coordenadas
- imagen destacada

## Clusterización

Si varios puntos están próximos:

- Agrupar automáticamente
- Mostrar contador
- Expandir al hacer zoom

## Rendimiento

Objetivo:
- 10.000 ubicaciones
- Carga inferior a 3 segundos

---

# 5. Fichas arqueológicas

## Información general

- Nombre
- Descripción
- Datación
- Estilo artístico
- Estado de conservación
- Localización

## Recursos

- Fotografías
- Reconstrucciones digitales
- Enlaces externos

## Acciones

- Compartir
- Localizar
- Valorar
- Comentar

---

# 6. Realidad aumentada

## Flujo

1. Usuario pulsa Localizar.
2. Solicitar permisos.
3. Obtener posición.
4. Obtener orientación.
5. Renderizar escena AR.

## Elementos interactivos

Ejemplos:

- Cazador
- Ciervo
- Caballo
- Cabra
- Fuego
- Arco
- Grupo humano

Al pulsar:

- Nombre
- Descripción breve
- Interpretación arqueológica

## Animaciones

Opcionales.

Ejemplos:

- Caza
- Animales corriendo
- Escenas rituales

Objetivo:
- 30 FPS mínimos

---

# 7. Inteligencia Artificial

## Generación de contenido

- Resúmenes divulgativos
- Explicaciones técnicas
- Explicaciones infantiles

## Clasificación automática

Detectar:

- Humanos
- Animales
- Armas
- Símbolos

## Asistente conversacional

Preguntas ejemplo:

- ¿Qué representa esta escena?
- ¿De qué época es?
- ¿Qué animales aparecen?

---

# 8. Sistema de valoraciones

## Valoración

Escala:
- 1 a 5 estrellas

## Comentarios

Campos:

- Email obligatorio
- Nombre opcional
- Comentario

Restricciones:

- Mínimo 5 caracteres
- Máximo 500 caracteres

Mostrar:

- Media de puntuación
- Número de valoraciones
- Comentarios aprobados

---

# 9. Modelo de datos

## Sites

- id UUID
- name
- slug
- description
- dating
- style
- region
- province
- latitude
- longitude
- visibility_level
- featured_image
- created_at
- updated_at

## SiteImages

- id UUID
- site_id
- image_url
- caption
- order_index

## ARElements

- id UUID
- site_id
- name
- type
- description
- x_position
- y_position
- z_position
- model_url
- animation_url

## Reviews

- id UUID
- site_id
- email_hash
- author_name
- rating
- comment
- created_at

---

# 10. API REST

Versionado obligatorio.

## Sitios

GET /api/v1/sites

GET /api/v1/sites/:id

## Imágenes

GET /api/v1/sites/:id/images

## Elementos AR

GET /api/v1/sites/:id/ar-elements

## Valoraciones

POST /api/v1/reviews

GET /api/v1/sites/:id/reviews

---

# 11. Seguridad

## Principios

- Security By Design
- Privacy By Design

## HTTPS

Obligatorio.

## SQL Injection

- Prisma ORM
- Consultas parametrizadas

Prohibido:
- SQL concatenado

## XSS

Sanitización de:

- Comentarios
- Nombres
- Campos de texto

## CSRF

Aplicar:

- SameSite Cookies
- CSRF Tokens

## Headers

Helmet:

- CSP
- X-Frame-Options
- Referrer-Policy
- X-Content-Type-Options

## CORS

Lista blanca de dominios.

Nunca usar:

Access-Control-Allow-Origin: *

en producción.

---

# 12. Protección del patrimonio arqueológico

No todas las coordenadas deben ser públicas.

## visibility_level

### PUBLIC

Coordenadas exactas.

### APPROXIMATE

Precisión reducida.

### HIDDEN

Sin coordenadas públicas.

---

# 13. Protección anti abuso

## Rate limiting

API pública:
- 100 peticiones/minuto/IP

Comentarios:
- 5 por hora/IP

Valoraciones:
- 20 por día/IP

## Anti spam

- Honeypot
- Captcha opcional
- Moderación futura

## Anti scraping

- Paginación obligatoria
- Cache
- Logs de abuso

---

# 14. Privacidad y RGPD

## Emails

- Nunca visibles públicamente
- Nunca enviados por APIs públicas

## Consentimiento

Checkbox obligatorio:

"Acepto la política de privacidad"

## Datos sensibles

No almacenar:

- Vídeo de cámara
- Fotografías
- Datos de sensores

sin consentimiento explícito.

---

# 15. Gestión de imágenes

Formatos:

- jpg
- jpeg
- png
- webp

Máximo:
- 10 MB

Validaciones:

- MIME Type
- Tamaño
- Extensión

Renombrar archivos automáticamente.

---

# 16. Observabilidad

Registrar:

- Errores backend
- Errores frontend
- Accesos API
- Bloqueos de seguridad

Herramientas sugeridas:

- Sentry
- OpenTelemetry

---

# 17. Calidad

## Tests

Cobertura mínima:
- 80%

## Auditoría

- OWASP Top 10
- OWASP ZAP

## Lighthouse

Objetivo:
- >90

---

# 18. Entregables

1. Frontend React.
2. Backend Node.js.
3. Base de datos MySQL.
4. API OpenAPI/Swagger.
5. Sistema AR funcional.
6. Panel de administración.
7. Dockerización completa.
8. Tests automáticos.
9. Documentación técnica.
10. Manual de despliegue.
