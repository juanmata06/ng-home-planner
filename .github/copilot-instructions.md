# NgHomePlanner - AI Coding Agent Instructions

## Project Overview
Angular 20 standalone component application for home planning with a **Kanban board** interface. Task management uses drag-and-drop functionality implemented with `@angular/cdk/drag-drop`. The application uses zoneless change detection and lazy-loaded feature modules.

## Architecture Patterns

### Component Structure
- **Standalone components only** - no `NgModule` usage anywhere
- Two component types: **pages** and **templates** (both are Angular components)
  - **Pages**: Default exports for lazy-loaded routes: `export default class DashboardPage`
  - **Templates**: Named exports for reusable components: `export class Dashboard`
- File naming: `component-name.ts` (not `.component.ts`) - e.g., [dashboard-page.ts](src/app/features/dashboard/dashboard-page/dashboard-page.ts)
- All components use `ChangeDetectionStrategy.OnPush`

### Imports & Path Aliases
TypeScript path aliases are configured in [tsconfig.json](tsconfig.json):
- `@shared/*` → `app/shared/*` - shared components, interfaces
- `@features/*` → `app/features/*` - feature modules
- `@layouts/*` → `app/layouts/*` - layout wrappers
- `@environments/*` → `environments/*`

Always use these aliases, not relative paths. Example:
```typescript
import { Task } from '@shared/index';
import { Dashboard } from '@features/dashboard/components';
```

**CRITICAL**: Every feature/component folder MUST have an `index.ts` for public exports. This pattern is mandatory:
- [src/app/shared/index.ts](src/app/shared/index.ts) re-exports `components/index` and `interfaces/index`
- [src/app/shared/components/index.ts](src/app/shared/components/index.ts) exports all shared components
- **Always import from barrel files**, never from individual files: `from '@shared/components'` not `from '@shared/components/card/card.component'`
- When creating new components/features, **always add exports to the appropriate `index.ts`**
- Import from barrel files, not individual files: `from '@shared/components'` not `from '@shared/components/card/card.component'`

### Routing
- Lazy-loaded routes use dynamic imports: `loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page')`
- Layout-based routing: `PrivateArea` layout wraps authenticated routes with shared header
- No route guards currently active (see commented `canMatch` in [app.routes.ts](src/app/routes.ts))

### Template Patterns
- Inline templates preferred for simple components
- Use control flow syntax: `@for`, `@if` (not `*ngFor`, `*ngIf`)
- Tailwind utility classes for styling - no component CSS except [app.scss](src/app/app.scss)
- Example: `@for (item of todo; let i = $index; track item)`

### State Management
- Signals for reactive state: `signal('ng-home-planner')` in [app.ts](src/app/app.ts)
- No external state management library - components hold local state
- Task data currently hardcoded in [draggable-table.ts](src/app/shared/components/draggable-table/draggable-table.ts)

### Drag & Drop - Kanban Implementation
**Core feature**: Kanban board with draggable task cards using `@angular/cdk/drag-drop`:
- Import from `@angular/cdk/drag-drop`: `CdkDropListGroup`, `CdkDropList`, `CdkDrag`, `moveItemInArray`, `transferArrayItem`
- `CdkDropListGroup` wraps multiple columns (TODO, DOING, DONE)
- `CdkDropList` with `[cdkDropListData]` binds each column to task array
- `CdkDrag` directive on individual task cards
- Handle `(cdkDropListDropped)` events with `moveItemInArray` (same column) or `transferArrayItem` (between columns)
- See [draggable-table.ts](src/app/shared/components/draggable-table/draggable-table.ts) for reference implementation

## Development Workflow

### Commands
- Start dev server: `npm start` or `ng serve` → http://localhost:4200
- Build production: `npm run build`
- Run tests: `npm test` (Karma/Jasmine)
- Watch mode: `npm run watch`

### Code Generation
Use Angular CLI with project conventions:
```bash
ng generate component features/feature-name/component-name --standalone --change-detection OnPush --inline-template --skip-tests
```
Then manually:
1. Rename file from `.component.ts` to `.ts`
2. Add to appropriate `index.ts` barrel export
3. Convert to default export if lazy-loaded

### Prettier Configuration
Configured in [package.json](package.json):
- 100 char line width
- Single quotes
- Angular parser for HTML

## Key Files & Interfaces

### Data Models
[src/app/shared/interfaces/task.interface.ts](src/app/shared/interfaces/task.interface.ts):
- `Task` interface with `TaskStatus` union type (`'TODO' | 'DOING' | 'DONE'`)
- Includes audit fields: `createdAt`, `createdBy`, `assignedTo`

### Styling & CSS
- Global styles in [src/styles.scss](src/styles.scss) - imports Tailwind config and feature-specific stylesheets
- Feature styles in [src/app/styles/](src/app/styles/):
  - `tailwind-config.scss` - Tailwind CSS configuration
  - `draggable.scss` - Drag-and-drop visual styles and animations
- Tailwind utilities with `@apply` for maintainable component styling
- Custom CSS properties only when Tailwind equivalents don't exist (e.g., `cursor: grab`, `cursor: grabbing`)
