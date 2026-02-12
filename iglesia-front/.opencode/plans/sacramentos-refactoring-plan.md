# Sacramentos Refactoring Plan

## Overview
Refactor the sacramentos page, component, and types to match the new Strapi data structure where the API returns a wrapper object containing `sacramentList`, `title`, `description`, and `blocks` arrays. Create a new MoreInfo component to render the more-info blocks from Strapi.

## Changes Required

### 1. Update `src/types/sacrament.d.ts`

**Add new interfaces:**
- `Requirement`: Object with `id` and `title` properties
- `MoreInfoLink`: Contact link with text, link, redirectOutside, iconSvg
- `MoreInfoBlock`: Block component with title, description, and linkContact array
- `SacramentPage`: Wrapper interface containing all page data

**Update existing interfaces:**
- `Sacrament`: Change `requirements` from `string[]` to `Requirement[]`, remove `order` field

### 2. Create `src/components/MoreInfo.astro`

**Purpose:** Dedicated component to render "more-info" blocks from Strapi with contact call-to-action.

**Props Interface:**
```typescript
interface Props {
  title: string;
  description: string;
  linkContact: Array<{
    id: number;
    text: string;
    link: string;
    redirectOutside: boolean;
    iconSvg: string | null;
  }>;
}
```

**Features:**
- Styled as a call-to-action section with centered layout
- Contact links rendered as primary buttons with consistent styling
- Support for optional icons in buttons (using set:html for SVG)
- External link handling with `target="_blank"` when `redirectOutside` is true
- Responsive design matching existing page styles (px-4 md:px-20 lg:px-40)

**Styling Approach:**
- Background: Light background or subtle gradient contrasting with main content
- Buttons: Primary button style with hover states (bg-primary, text-white)
- Typography: Consistent with existing design system
- Layout: Centered content with max-width for readability

### 3. Update `src/components/SacramentCard.astro`

**Key changes:**
- Remove `getIconSvg()` function - iconName now contains inline SVG
- Update icon rendering to use `set:html={sacrament.iconName}` directly
- Update requirements mapping: `requirement.title` instead of plain string
- Requirements are now objects: `{id, title}` instead of strings

### 4. Update `src/pages/sacramentos.astro`

**Key changes:**
- Change type from `Sacrament[]` to `SacramentPage`
- Extract `sacramentList` from the response object
- Use dynamic `pageData.title` and `pageData.description` from API
- Add fallback values for missing data
- Import and render the new `MoreInfo` component for blocks

**Implementation approach:**
```typescript
import MoreInfo from '../components/MoreInfo.astro';

const pageData = await fetchAPI<SacramentPage>('sacrament', JSON_POPULATE, 'data');
const sacramentList = pageData?.sacramentList || [];
const pageTitle = pageData?.title || 'Sacramentos';
const pageDescription = pageData?.description || 'Default description';
```

**Render blocks section:**
```astro
{pageData?.blocks?.map((block) => (
  block.__component === 'more-info.more-info' && (
    <MoreInfo 
      title={block.title}
      description={block.description}
      linkContact={block.linkContact}
    />
  )
))}
```

## Migration Path

1. Update types first (foundation for other changes)
2. Create MoreInfo component (independent, can be tested separately)
3. Update SacramentCard component (independent of page changes)
4. Update sacramentos page (depends on all above)
5. Run type checking to verify

## Testing Checklist

- [ ] Types compile without errors
- [ ] Page renders with API data
- [ ] Sacrament cards display correctly with images/icons
- [ ] Requirements list displays properly with new object structure
- [ ] MoreInfo component renders at bottom with correct styling
- [ ] Buttons in MoreInfo component have proper hover states
- [ ] External links open in new tab when redirectOutside is true
- [ ] Fallback data works when API unavailable

## Files to Modify/Create

1. `src/types/sacrament.d.ts` - Type definitions (update)
2. `src/components/MoreInfo.astro` - New more-info block component (create)
3. `src/components/SacramentCard.astro` - Card component (update)
4. `src/pages/sacramentos.astro` - Page component (update)

## Notes

- The `iconName` field now contains inline SVG markup, not icon keys
- Requirements are now objects with `id` and `title` properties
- The blocks array uses a discriminator field `__component` for different block types
- MoreInfo component is reusable for any page with more-info blocks
- Consider adding the component to `src/types/index.ts` exports if needed
