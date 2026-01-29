# NgHomePlanner - AI Coding Agent Instructions

## Project Overview
Angular 20+ standalone component application for home planning with a **Kanban board** interface. Task management uses drag-and-drop functionality implemented with `@angular/cdk/drag-drop`. The application uses zoneless change detection, lazy-loaded feature modules, and standalone components with OnPush change detection strategy.

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
- `@shared/*` → `src/app/shared/*` - shared components, interfaces, utilities
- `@features/*` → `src/app/features/*` - feature modules and pages
- `@layouts/*` → `src/app/layouts/*` - layout wrappers
- `@environments/*` → `environments/*` - environment configurations

**Always use these aliases, never relative paths**. Example:
```typescript
import { Task } from '@shared/index';
import { DraggableTable } from '@shared/components';
import DashboardPage from '@features/dashboard/dashboard-page/dashboard-page';
```

**CRITICAL**: Every feature/component folder MUST have an `index.ts` for public exports. This pattern is mandatory:
- [src/app/shared/index.ts](src/app/shared/index.ts) re-exports `components/index` and `interfaces/index`
- [src/app/shared/components/index.ts](src/app/shared/components/index.ts) exports all shared components
- **Always import from barrel files**, never from individual files: `from '@shared/components'` not `from '@shared/components/card/card.component'`
- When creating new components/features, **always add exports to the appropriate `index.ts`**
- Import from barrel files, not individual files: `from '@shared/components'` not `from '@shared/components/card/card.component'`

### Routing
- Lazy-loaded routes use dynamic imports with default exports: `loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page')`
- Layout-based routing: `PrivateArea` layout wraps authenticated routes with shared header
- Routes defined in [app.routes.ts](src/app/app.routes.ts)
- Auth guard currently commented out (see `canMatch` in [app.routes.ts](src/app/app.routes.ts) - enable when auth module is complete)

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
- Imports from `@angular/cdk/drag-drop`: `CdkDropListGroup`, `CdkDropList`, `CdkDrag`, `moveItemInArray`, `transferArrayItem`, `CdkDragPreview`
- `CdkDropListGroup` wraps multiple columns (TODO, DOING, DONE) for cross-list drag support
- `CdkDropList` with `[cdkDropListData]` binds each column to task array
- `CdkDrag` directive on individual task cards with `cdkDragData` for task reference
- `CdkDragPreview` (optional) for custom drag preview appearance
- Handle `(cdkDropListDropped)` events with `moveItemInArray` (same column) or `transferArrayItem` (between columns)
- See [draggable-table.ts](src/app/shared/components/draggable-table/draggable-table.ts) for reference implementation
- See [draggable-column.ts](src/app/shared/components/draggable-table/components/draggable-column/draggable-column.ts) for column structure
- See [draggable-item.ts](src/app/shared/components/draggable-table/components/draggable-item/draggable-item.ts) for task card structure

## Development Workflow

### Commands
- Start dev server: `npm start` (or `ng serve`) → http://localhost:4200
- Build production: `npm run build`
- Run tests: `npm test` (Karma/Jasmine, headless, no watch)
- Run tests with coverage: `npm run test:coverage`
- Watch mode: `npm run watch`

### Code Generation
Use Angular CLI with project conventions:
```bash
ng generate component features/feature-name/component-name --standalone --change-detection OnPush --inline-template --skip-tests
```

Post-generation steps:
1. Rename file from `.component.ts` to `.ts` (e.g., `my-component.component.ts` → `my-component.ts`)
2. Add named export to appropriate `index.ts` barrel file
3. Convert to default export (`export default class XyzPage`) if it's a lazy-loaded route/page
4. Update component class name to follow convention: `XyzPageComponent` → `XyzPage`
5. Import shared components/interfaces from barrel files (`@shared/components`), not individual files

### Testing
- Test files follow naming pattern: `component-name.spec.ts`
- All test configurations **MUST include** `provideZonelessChangeDetection()` in the TestBed setup:
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ComponentName],
    providers: [provideZonelessChangeDetection()]
  }).compileComponents();
});
```
- Tests use Jasmine/Karma framework
- Aim for component logic and interaction testing

### Prettier Configuration
Configured in [package.json](package.json):
- 100 char line width (`printWidth: 100`)
- Single quotes (`singleQuote: true`)
- Angular parser for HTML files (`parser: 'angular'`)
- Auto-formatted on save with proper VS Code integration

## AI Agent Behavior Guidelines

**IMPORTANT**: Before making any changes to the codebase, the AI agent SHOULD:
1. **Ask clarifying questions** if the request is ambiguous or could affect multiple areas
2. **Confirm understanding** of the business logic and technical approach
3. **Check for dependencies** - verify how changes might impact other components/features
4. **Suggest alternatives** if there are multiple valid approaches
5. **Request more context** when needed (e.g., "Should this component be reusable or specific to dashboard?")

Only proceed with implementation after establishing clear requirements and alignment with the project architecture.

## Key Files & Interfaces

### Data Models
[src/app/shared/interfaces/task.interface.ts](src/app/shared/interfaces/task.interface.ts):
- `Task` interface with `TaskStatus` union type (`'TODO' | 'DOING' | 'DONE'`)
- Includes audit fields: `createdAt`, `createdBy`, `assignedTo`
- Exported from barrel file: `@shared/interfaces` and `@shared/index`

[src/app/shared/interfaces/tasks-column.interface.ts](src/app/shared/interfaces/tasks-column.interface.ts):
- `TasksColumn` interface defining column structure for Kanban board

### Styling & CSS
- Global styles in [src/styles.scss](src/styles.scss) - imports Tailwind CSS 4+ and feature-specific stylesheets
- Feature styles in [src/app/styles/](src/app/styles/):
  - `tailwind-config.scss` - Tailwind CSS 4+ configuration and custom utilities
  - `draggable.scss` - Drag-and-drop visual styles, animations, and CDK-specific overrides
- Tailwind CSS 4+ with PostCSS for styling (no traditional Tailwind config file needed)
- Use Tailwind utility classes in templates for responsive, maintainable styling
- Custom CSS properties and `@apply` only when Tailwind equivalents don't exist
- Drag-and-drop visual feedback: custom cursors (`grab`, `grabbing`), animations, shadow effects defined in `draggable.scss`
