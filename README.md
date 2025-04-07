# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```



//  "recharts": "^2.15.2",   
//     "@dnd-kit/core": "^6.3.1",
    // "@dnd-kit/modifiers": "^9.0.0",
    // "@dnd-kit/sortable": "^10.0.0",
    // "@dnd-kit/utilities": "^3.2.2",
    // "@radix-ui/react-avatar": "^1.1.3",
    // "@radix-ui/react-checkbox": "^1.1.4",
    // "@radix-ui/react-dialog": "^1.1.6",
    // "@radix-ui/react-dropdown-menu": "^2.1.6",
    // "@radix-ui/react-label": "^2.1.2",
    // "@radix-ui/react-select": "^2.1.6",
    // "@radix-ui/react-separator": "^1.1.2",
    // "@radix-ui/react-slot": "^1.1.2",
    // "@radix-ui/react-tabs": "^1.1.3",
    // "@radix-ui/react-toggle": "^1.1.2",
    // "@radix-ui/react-toggle-group": "^1.1.2",
    // "@radix-ui/react-tooltip": "^1.1.8",
    // "@tabler/icons-react": "^3.31.0",
        // "vaul": "^1.1.2",
    // "zod": "^3.24.2"