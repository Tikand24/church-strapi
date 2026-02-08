# AGENTS.md - Codebase Guide for AI Agents

This file contains essential information for agentic coding tools working in this Astro + Strapi frontend project.

## Project Overview

This is an Astro frontend application for a church website (iglesia-front) that integrates with a Strapi CMS backend. The project uses TypeScript, Tailwind CSS v4, and follows a component-based architecture.

## Build & Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Astro CLI commands
npm run astro [command]

# Example: Add new integrations
npm run astro add [integration]

# Example: Check project
npm run astro check
```

**Note**: This project currently does not have dedicated lint or test commands configured. Use `astro check` for TypeScript type checking.

## Code Structure & Architecture

```
src/
├── components/           # Reusable Astro components
│   ├── Layout/          # Layout-specific components (Nav, Footer)
│   ├── Hero.astro       # Hero section component
│   ├── GroupPriest.astro # Priest group display
│   ├── PublicAtention.astro # Public attention component
│   ├── Schedule.astro   # Schedule component
│   └── Welcome.astro    # Welcome component
├── layouts/             # Page layouts
│   └── Layout.astro     # Main layout wrapper
├── lib/                 # Utility libraries
│   ├── strapi.ts        # Strapi API integration layer
│   └── utils.ts         # General utilities
├── pages/               # Astro pages/routes
│   └── index.astro      # Homepage
├── styles/              # Global styles
│   └── global.css       # Tailwind + custom theme
├── types/               # TypeScript type definitions
│   ├── index.ts         # Type exports
│   ├── *.d.ts          # Generated/external types
└── assets/             # Static assets
```

## Component Architecture & Patterns

### Astro Components
- Use `.astro` file extension for components
- Follow PascalCase naming (e.g., `Hero.astro`, `GroupPriest.astro`)
- Frontmatter section (---) for server-side code
- HTML/JSX-like template for UI
- Import statements go at the top of frontmatter

### Props Interface
Define props interfaces in frontmatter:
```typescript
---
interface Props {
  title: string;
  description?: string;
  image?: {
    url: string;
    alternativeText: string;
  };
}

const { title, description, image } = Astro.props;
---
```

### Component Imports
```typescript
---
import { fetchAPI } from '../../lib/strapi';
import type { NavigationStrapi } from '../../types';
import { getUrlImage } from '../../lib/utils';
---
```

## TypeScript & Type System

### Type Organization
- Export types from `src/types/index.ts`
- Use descriptive `.d.ts` files for external/API types
- Define interfaces for component props
- Use strict TypeScript configuration (extends astro/tsconfigs/strict)

### Type Examples
```typescript
// API Response Types
export interface NavigationStrapi {
  logo: {
    icon?: { url: string };
    churchName: string;
    locationName: string;
  };
  menuItems: MenuItem[];
  ctaButton?: CTAButton;
}

// Enums for constants
export enum PriestGrade {
  PARISH_PRIEST = 'Parroco',
  VICAR = 'Vicario',
  SEMINARIAN = 'Seminarista',
  DEACON = 'Diacono',
}
```

## Styling Guidelines

### Tailwind CSS v4 Configuration
- Theme defined in `src/styles/global.css`
- Custom color variables using `@theme` directive:
```css
@theme {
  --color-primary: #1142d4;
  --color-primary-text: #4B5E9A;
  --color-background-light: #fdfcf8;
  --color-background-dark: #101522;
  --color-accent-gold: #d4af37;
  --color-accent-red: #8b0000;
}
```

### Typography
- Primary font: "Newsreader" serif (Google Fonts)
- Applied globally via `*` selector in `global.css`
- Use optical sizing and proper fallbacks

### Class Naming Patterns
- Use semantic Tailwind classes
- Responsive design with `md:`, `lg:` prefixes
- Component variants using consistent patterns:
```css
class="w-full px-4 md:px-20 lg:px-40 py-3 relative flex flex-col items-center justify-center"
```

## API Integration (Strapi)

### Core Functions
Use the centralized Strapi client in `src/lib/strapi.ts`:

```typescript
// Basic fetch
export async function fetchAPI<T>(
  endpoint: string,
  query?: object,
  wrappedByKey?: string,
  wrappedByList?: boolean
): Promise<T>

// With populate
export async function fetchWithPopulate<T>(
  endpoint: string,
  populateFields?: string | string[] | object
): Promise<T>

// Single entry
export async function fetchSingleEntry<T>(
  endpoint: string,
  id: string | number,
  populateFields?: string[] | object
): Promise<T>
```

### Query Building
- Use `qs` library for complex query strings
- Leverage helper functions for common patterns:
```typescript
import { populateAll, populateSpecific } from '../lib/strapi';

// All fields
const data = await fetchAPI('endpoint', populateAll);

// Specific fields
const data = await fetchAPI('endpoint', populateSpecific(['field1', 'field2']));
```

### Environment Configuration
```typescript
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';
```

## Naming Conventions

### Files & Directories
- **Components**: PascalCase (`Hero.astro`, `GroupPriest.astro`)
- **Utilities**: camelCase (`utils.ts`, `strapi.ts`)
- **Types**: camelCase (`navigation.d.ts`, `hero.d.ts`)
- **Pages**: kebab-case for routes (Astro convention)
- **Assets**: descriptive kebab-case (`priest1.png`, `church-background.jpg`)

### Variables & Functions
- camelCase for variables and functions
- PascalCase for classes/types
- UPPER_SNAKE_CASE for constants
- Descriptive names that indicate purpose:
```typescript
const formateador = new Intl.DateTimeFormat(...); // Spanish naming is acceptable
const imageUrl = getUrlImage(image?.url);
const logoIconUrl = getUrlImage(navData?.logo?.icon?.url);
```

### Props & Interfaces
- Use clear, descriptive prop names
- Optional props marked with `?`
- Default values provided in component logic when needed

## Error Handling

### API Errors
- Implement try-catch blocks for API calls
- Use the built-in error handling in `fetchAPI`
- Log errors appropriately:
```typescript
try {
  const data = await fetchAPI('endpoint');
  // Handle success
} catch (error) {
  console.error('Error fetching data:', error);
  // Handle error state
}
```

### Null/Undefined Safety
- Use optional chaining (`?.`) for nested object access
- Provide fallback values for missing data:
```typescript
const { title, description, image, link } = Astro.props;
const imageUrl = image?.url?.startsWith('http')
  ? image.url
  : `${STRAPI_URL}${image?.url || ''}`;
```

## Performance & Optimization

### Image Handling
- Use `getUrlImage` utility for proper URL construction
- Implement responsive images with Tailwind classes
- Add proper alt text for accessibility

### API Optimization
- Use specific populate queries to avoid over-fetching
- Implement proper caching strategies where needed
- Consider lazy loading for heavy components

## Accessibility Guidelines

- Always include alt text for images
- Use semantic HTML elements
- Implement proper ARIA labels where needed
- Ensure keyboard navigation support
- Use proper heading hierarchy

## Development Workflow

1. **Component Development**: Create components in `src/components/`
2. **Type Definition**: Define/update types in `src/types/`
3. **API Integration**: Use centralized `strapi.ts` functions
4. **Styling**: Use Tailwind classes with custom theme variables
5. **Testing**: Use `npm run astro check` for type validation

## Important Notes

- This is a Spanish-language project (church website)
- Mixed language code (Spanish variables, English technical terms)
- No current testing framework - implement tests when adding features
- No current linting configuration - consider adding ESLint/Prettier
- Environment variables should be configured for production deployment