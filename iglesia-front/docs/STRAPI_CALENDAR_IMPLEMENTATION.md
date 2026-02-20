# Implementación del Calendario en Strapi

Este documento describe la estructura necesaria en Strapi para soportar la página de Calendario (`/calendario`) del frontend.

---

## Resumen de la Arquitectura

La página de calendario necesita:

1. **Horarios de Misas** → Ya existe (`schedule.schedule` component)
2. **Eventos Litúrgicos/Santos** → Ya existe parcialmente (`liturgical-events` collection)
3. **Colores Litúrgicos** → Nuevo (collection type)
4. **Inspiración del Día** → Nuevo (collection type)
5. **Tarjetas de Información** → Nuevo (component)
6. **Página de Calendario** → Nuevo (single type)

---

## 1. Collection Types

### 1.1 `liturgical-color` (Nuevo)

Colores litúrgicos con sus temporadas asociadas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `name` | Text (required) | Nombre del color: "Morado", "Blanco", "Verde", "Rojo", "Rosa" |
| `hexCode` | Text (required) | Código hexadecimal: "#800080" |
| `season` | Text (required) | Temporada: "Tiempo de Adviento", "Tiempo Ordinario", etc. |
| `description` | Text (long) | Explicación del significado del color |
| `isActive` | Boolean | Si es el color litúrgico actual |
| `order` | Number | Orden de visualización |

**API ID:** `liturgical-color`

```json
// Ejemplo de respuesta
{
  "id": 1,
  "name": "Morado",
  "hexCode": "#800080",
  "season": "Tiempo de Adviento",
  "description": "Simboliza penitencia y preparación",
  "isActive": true,
  "order": 1
}
```

---

### 1.2 `daily-inspiration` (Nuevo)

Citas bíblicas o frases inspiracionales para mostrar en el sidebar.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `quote` | Text (long, required) | La cita o frase |
| `source` | Text (required) | Fuente: "Salmo 27:1", "Mateo 11:28" |
| `saintName` | Text | Nombre del santo asociado (opcional) |
| `saintDate` | Date | Fecha del santo |
| `saintImage` | Media (single) | Imagen del santo |
| `isActive` | Boolean | Si se muestra actualmente |
| `displayDate` | Date | Fecha para mostrar esta inspiración |

**API ID:** `daily-inspiration`

```json
// Ejemplo de respuesta
{
  "id": 1,
  "quote": "El Señor es mi luz y mi salvación, ¿a quién temeré?",
  "source": "Salmo 27:1",
  "saintName": "San Nicolás de Bari",
  "saintDate": "2024-12-06",
  "saintImage": { "url": "/uploads/san_nicolas.jpg" },
  "isActive": true,
  "displayDate": "2024-12-06"
}
```

---

### 1.3 `liturgical-event` (Ya existe - Verificar/Extender)

Eventos litúrgicos especiales que aparecen en el calendario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | Text (required) | Nombre del evento: "S. Nicolás de Bari" |
| `eventType` | Enumeration | Tipo: "santo", "solemnidad", "fiesta", "memoria" |
| `eventDate` | Date (required) | Fecha específica del evento |
| `color` | Relation → liturgical-color | Color litúrgico del día |
| `description` | Rich Text | Descripción del evento |
| `recurrence` | Enumeration | "yearly", "once", "weekly" |
| `location` | Text | Ubicación si aplica |

**Nota:** Si ya existe, verificar que tenga el campo `eventDate` como tipo `Date` (no solo día de la semana).

---

## 2. Single Types

### 2.1 `calendar-page` (Nuevo)

Configuración de la página de calendario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Seo` | Component (shared.seo) | Meta title y description |
| `bannerTitle` | Text | Título del banner: "¿A qué hora es la próxima Misa?" |
| `bannerQuote` | Text | Cita en el banner |
| `bannerQuoteSource` | Text | Fuente de la cita |
| `bannerLocation` | Text | Ubicación: "Templo Parroquial" |
| `weekTitle` | Text | Título de sección: "Esta Semana" |
| `blocks` | Dynamic Zone | Bloques dinámicos de contenido |

**Dynamic Zone `blocks` incluye:**
- `calendar.schedule-reference` → Referencia al horario de misas
- `calendar.info-cards` → Tarjetas de información inferior
- `calendar.sidebar-config` → Configuración del sidebar

**API ID:** `calendar-page`

---

## 3. Components

### 3.1 Categoria: `calendar`

Crear una nueva categoría de componentes llamada `calendar`.

---

#### 3.1.1 `calendar.schedule-reference`

Referencia al componente de horarios existente (reutiliza `schedule.schedule`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `useHomeSchedule` | Boolean | Si usa el mismo horario de la página home |
| `customSchedule` | Component (schedule.schedule) | Horario personalizado si no usa el de home |

---

#### 3.1.2 `calendar.info-card`

Tarjeta de información individual.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | Text (required) | Título: "Confesiones" |
| `description` | Text (long, required) | Descripción del servicio |
| `iconSvg` | Text (long) | SVG del icono |
| `link` | Component (shared.link) | Enlace opcional |
| `variant` | Enumeration | "default" o "highlight" |
| `backgroundColor` | Text | Color de fondo (hex) si es highlight |

---

#### 3.1.3 `calendar.info-cards`

Grupo de tarjetas de información (bloque de Dynamic Zone).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `cards` | Component (calendar.info-card, repeatable) | Lista de tarjetas |

---

#### 3.1.4 `calendar.sidebar-config`

Configuración del sidebar.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `showInspiration` | Boolean | Mostrar widget de inspiración |
| `showLiturgicalColor` | Boolean | Mostrar widget de color litúrgico |
| `showQuickLinks` | Boolean | Mostrar enlaces rápidos |
| `quickLinks` | Component (shared.link, repeatable) | Enlaces del sidebar |

---

## 4. Componentes Existentes a Reutilizar

### 4.1 `schedule.schedule` (Ya existe)

```
schedule.schedule
├── Title: Text
├── description: Text
└── ScheduleTab: Component (schedule.schedule-tab, repeatable)
    ├── Title: Text ("Lunes a Viernes", "Sabado", "Domingo")
    └── Item: Component (schedule.schedule-item, repeatable)
        ├── time: Time (HH:MM:SS)
        ├── description: Text
        └── Icon: Text (SVG)
```

### 4.2 `shared.seo` (Ya existe)

```
shared.seo
├── metaTitle: Text
└── metaDescription: Text
```

### 4.3 `shared.link` (Ya existe)

```
shared.link
├── text: Text
├── link: Text
├── redirectOutside: Boolean
└── iconSvg: Text
```

---

## 5. Estructura de API Endpoints

### Endpoints necesarios:

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/calendar-page` | GET | Configuración de la página |
| `/api/liturgical-colors` | GET | Lista de colores litúrgicos |
| `/api/liturgical-colors?filters[isActive][$eq]=true` | GET | Color activo actual |
| `/api/daily-inspirations?filters[displayDate][$eq]=YYYY-MM-DD` | GET | Inspiración del día |
| `/api/liturgical-events?filters[eventDate][$gte]=X&filters[eventDate][$lte]=Y` | GET | Eventos de la semana |

---

## 6. Query de Populate para Frontend

```javascript
const CALENDAR_PAGE_POPULATE = {
  populate: {
    Seo: { populate: true },
    blocks: {
      on: {
        'calendar.schedule-reference': {
          populate: {
            customSchedule: {
              populate: {
                ScheduleTab: {
                  populate: {
                    Item: { populate: true }
                  }
                }
              }
            }
          }
        },
        'calendar.info-cards': {
          populate: {
            cards: {
              populate: {
                link: { populate: true }
              }
            }
          }
        },
        'calendar.sidebar-config': {
          populate: {
            quickLinks: { populate: true }
          }
        }
      }
    }
  }
};
```

---

## 7. Pasos de Implementación en Strapi

### Paso 1: Crear Collection Types

1. **Content-Type Builder** → Create new collection type
2. Crear `liturgical-color` con los campos especificados
3. Crear `daily-inspiration` con los campos especificados
4. Verificar/extender `liturgical-event` si es necesario

### Paso 2: Crear Components

1. **Content-Type Builder** → Create new component
2. Categoría: `calendar`
3. Crear los 4 componentes:
   - `calendar.schedule-reference`
   - `calendar.info-card`
   - `calendar.info-cards`
   - `calendar.sidebar-config`

### Paso 3: Crear Single Type

1. **Content-Type Builder** → Create new single type
2. Nombre: `calendar-page`
3. Agregar campos y Dynamic Zone con los componentes

### Paso 4: Configurar Permisos

1. **Settings** → Users & Permissions → Roles → Public
2. Habilitar `find` para:
   - `calendar-page`
   - `liturgical-color`
   - `daily-inspiration`
   - `liturgical-event`

### Paso 5: Agregar Contenido de Prueba

1. Crear algunos colores litúrgicos
2. Crear inspiraciones para fechas específicas
3. Crear eventos litúrgicos (santos, fiestas)
4. Configurar la página de calendario

---

## 8. Ejemplo de Respuesta API Completa

```json
// GET /api/calendar-page?populate=deep
{
  "data": {
    "id": 1,
    "Seo": {
      "metaTitle": "Calendario de Misas - Parroquia Nuestra Señora de Belén",
      "metaDescription": "Consulta los horarios de misas y eventos litúrgicos"
    },
    "bannerTitle": "¿A qué hora es la próxima Misa?",
    "bannerQuote": "Vengan a mí todos los que están cansados...",
    "bannerQuoteSource": "Mateo 11:28",
    "bannerLocation": "Templo Parroquial",
    "weekTitle": "Esta Semana",
    "blocks": [
      {
        "__component": "calendar.schedule-reference",
        "useHomeSchedule": true,
        "customSchedule": null
      },
      {
        "__component": "calendar.info-cards",
        "cards": [
          {
            "title": "Confesiones",
            "description": "Media hora antes de cada misa",
            "variant": "default",
            "link": { "text": "Contactar", "link": "/contacto" }
          },
          {
            "title": "Aviso Importante",
            "description": "Durante el Adviento...",
            "variant": "highlight",
            "backgroundColor": "#d4af37"
          }
        ]
      },
      {
        "__component": "calendar.sidebar-config",
        "showInspiration": true,
        "showLiturgicalColor": true,
        "showQuickLinks": true,
        "quickLinks": [
          { "text": "Leccionario", "link": "/leccionario" }
        ]
      }
    ]
  }
}
```

---

## 9. Integración con Frontend Existente

### Actualizar tipos en `src/types/calendar.ts`:

```typescript
// Agregar tipos para la respuesta de Strapi
export interface CalendarPageResponse {
  data: {
    id: number;
    Seo?: Seo;
    bannerTitle: string;
    bannerQuote: string;
    bannerQuoteSource: string;
    bannerLocation: string;
    weekTitle: string;
    blocks: CalendarPageBlock[];
  };
}

export type CalendarPageBlock =
  | ScheduleReferenceBlock
  | InfoCardsBlock
  | SidebarConfigBlock;

export interface ScheduleReferenceBlock {
  __component: 'calendar.schedule-reference';
  useHomeSchedule: boolean;
  customSchedule?: CalendarScheduleData;
}

export interface InfoCardsBlock {
  __component: 'calendar.info-cards';
  cards: CalendarInfoCard[];
}

export interface SidebarConfigBlock {
  __component: 'calendar.sidebar-config';
  showInspiration: boolean;
  showLiturgicalColor: boolean;
  showQuickLinks: boolean;
  quickLinks?: Link[];
}
```

### Actualizar `src/pages/calendario.astro`:

```typescript
// Reemplazar datos estáticos con fetch de Strapi
const calendarData = await fetchAPI('calendar-page', CALENDAR_PAGE_POPULATE, 'data');
const liturgicalColors = await fetchAPI('liturgical-colors', { 
  filters: { isActive: { $eq: true } } 
}, 'data');
const todayInspiration = await fetchAPI('daily-inspirations', {
  filters: { displayDate: { $eq: new Date().toISOString().split('T')[0] } }
}, 'data');
```

---

## 10. Notas Importantes

1. **Horarios de Misa**: Se recomienda reutilizar el mismo `schedule.schedule` que usa la página Home para evitar duplicación de datos.

2. **Eventos Litúrgicos**: Usar filtros de fecha para obtener solo los eventos de la semana actual.

3. **Inspiración Diaria**: Puede configurarse para mostrar la misma inspiración si no hay una específica para el día.

4. **Colores Litúrgicos**: Solo uno debe tener `isActive: true` a la vez.

5. **Cache**: Considerar implementar cache en el frontend ya que estos datos no cambian frecuentemente.
