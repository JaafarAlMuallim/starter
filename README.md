# Turborepo starter

This is a turborepo starter, trying to create something similar to the experience of t3 apps.


## What's inside?

It includes the following packages/apps:

### Apps and Packages

- `landing`: an [Astro](https://astro.build) app
- `web`: a [Next.js](https://nextjs.org/) app
- `mobile`: an [Expo](https://expo.dev/) app
- `@repo/ui`: a stub React component library that can be shared for `web` and any other compatible app
- `@repo/validators`: zod schemas and type validations
- `@repo/server`: [Hono](https://hono.dev/) app, currently using [tRPC](https://trpc.io/), will be migrating to hono RPC.
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
cd my-turborepo
bun build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd my-turborepo
bun dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
cd my-turborepo
bunx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
bunx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## 🤝 Contributing

### Clone the repo

```bash
git clone [https://github.com/xyz/zipzod@lates](https://github.com/JaafarAlMuallim/starter
cd starter
```

### Run the project and its tasks

```bash
bun dev
```

### Run the tests

```bash
bun test
```

### Submit a pull request
