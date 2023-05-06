# Folder and file naming

### Folder naming patterns

-   All folders should be in lowercase format

-   Words in folders name should be separated using `-`(dash) sign - **kebab-case**

### File naming patterns

-   All files should be in lowercase format

-   Component files should have `.tsx` extension

-   Other TS files should have `.ts` extension

-   Words in file name should be separated using `-`(dash) sign - **kebab-case**

    -   Files naming pattern `[a-z0-9-].?[a-z0-9]?.tsx`:

    -   all `[name]` - `toast-popup`: all words should be separated using `-`(dash) sign

    -   names can be combined `[name].[type].ts`

-   Every type of entity should have separate folder, for ex:

    -   `src/components` - for React/RN components

    -   `src/constants` - for constants

    -   `src/context` - for context

    -   `src/database` - for database

    -   `src/screens` - for RN page containers

    -   `src/store` - for Redux or Context Providers

### Component example file structure

```
├───components/
│   └───toast-popup/
│       ├───toast-popup.tsx
│       ├───toast-popup.props.ts
│       ├───toast-popup.md
│       ├───toast-popup.styles.ts
│       └───__test__/
│           └───toast-popup.spec.tsx
└───utils/
    ├───image.utils.ts
    └───__test__/
        └───image.utils.spec.ts
```

### Layout Conventions

-   Always end a statement with a semicolon.
-   We should use functional component.
