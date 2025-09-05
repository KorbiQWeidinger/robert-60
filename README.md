# vite-shadcn template

Welcome to my vite-shadcn template!
Check it out here: [vite-shadcn](https://korbiqweidinger.github.io/vite-shadcn/)

## What is this template?

This template is a starting point for building a web application using [Vite](https://vite.dev/) and [Shadcn UI](https://ui.shadcn.com/).
It includes a basic setup for routing, state management, theming, testing and linting.

## Features

- Vite
- TypeScript
- Shadcn UI
- ESLint and Prettier for code quality
- Routing with React Hash Router (hash router is used because gh-pages doesn't support browser router)
- State management with Redux Toolkit
- Pre-commit hooks with Husky
- Vitest for testing

## Hosting on gh-pages

This template is configured to auto deploy to gh-pages.
Therefore it includes a `pages.yml` file that autodeploys the main branch to gh-pages.

If you have no custom url you need to replace the `base` in `vite.config.ts` and in the `dev` script in `package.json` with your project name.
If you want to host this with a custom url you remove the `base` from `vite.config.ts` and from the `dev` script in `package.json`.

File: `vite.config.ts`

```ts
export default defineConfig({
  //...
  base: '/github-repo-name/',
});
```

File: `package.json`

```json
{
  "scripts": {
    "dev": "vite build --base=/github-repo-name/"
  }
}
```

## What to replace

- replace all occurences of `vite-shadcn` with your project name

## Don't forget to

- `npm run prepare` to setup pre-commit hooks
