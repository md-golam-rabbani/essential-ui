# Essential UI

## UI Library

This project uses [`shadcn/ui`](https://ui.shadcn.com) components to avoid reinventing common UI logic.  
When styling or extending components, create custom wrappers instead of modifying the core shadcn components directly.

> ⚠️ Avoid altering shadcn component logic. Extend via composition when needed.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Format code
pnpm format:fix
```
