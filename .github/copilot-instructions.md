# Copilot Instructions for timerapp

## Project Overview
- This is a Next.js (App Router) project bootstrapped with `create-next-app`.
- Main features: Pomodoro timer, Todo list, and task management UI.
- Uses React, TypeScript, Tailwind CSS, Bootstrap, and Biome for formatting/linting.
- State and data are managed via React context and localStorage (no backend).

## Key Architecture & Patterns
- **Pages**: Main entry is `src/app/page.tsx` (Next.js App Router).
- **Components**: All UI logic is in `src/components/` (e.g., `Pomodoro.tsx`, `Todolist.tsx`, `MyNavbar.tsx`).
- **Context**: Shared state and data logic in `src/context/context.tsx` (provides task data, modal state, search, etc.).
- **Types**: Centralized in `src/types/index.ts`.
- **Styling**: Uses Tailwind CSS (`globals.css`) and Bootstrap (via `react-bootstrap`).
- **Routing**: Uses Next.js routing and some `react-router-dom` for in-app navigation (e.g., in Todo list).
- **Data**: Tasks are stored in browser localStorage, loaded via context provider.

## Developer Workflows
- **Start dev server**: `npm run dev` (uses Next.js Turbopack)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (Biome)
- **Format**: `npm run format` (Biome)
- **No backend/serverless functions**: All data is client-side.

## Project-Specific Conventions
- All React components are in `src/components/` and use PascalCase.
- Context is provided at the app level; always use the context for task data and modal state.
- Use localStorage for persisting tasks; fetch/update via context methods.
- UI state (modals, search, etc.) is managed in context, not in individual components.
- Use Tailwind for layout and color, Bootstrap for forms and lists.
- TypeScript is enforced for all code.
- Use Biome for linting/formatting (not ESLint/Prettier).

## Integration Points
- No external API calls; all data is local.
- Uses `@headlessui/react`, `@heroicons/react`, `lucide-react`, and `motion` for UI/animation.
- Font is loaded via Next.js font optimization.

## Examples
- See `src/components/Pomodoro.tsx` for timer logic and SVG progress ring.
- See `src/components/Todolist.tsx` for Todo CRUD and react-bootstrap usage.
- See `src/context/context.tsx` for context shape and data flow.

## Tips for AI Agents
- Always update context logic if changing task data shape or modal state.
- When adding new features, prefer placing shared state in context.
- Follow existing component and file naming conventions.
- Use provided scripts for linting/formatting before committing.

---
For more, see `README.md` and `src/context/context.tsx`.
