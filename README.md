This is a sample project demonstrating how to use the [Genabiltiy JavaScript SDK](https://www.npmjs.com/package/@genability/api) for common use cases.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The application includes a backend proxy, demonstrating how to keep Genability API credentials secure while using the JavaScript SDK on the frontend. This endpoint can be seen in `pages/api/genability-proxy/[...path].js`.

Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages, and are not published to the frontend. Never include your Genability API credentials in user-facing frontend code.

## Learn More

To obtain Genability API credentials, [visit our Quick Start page](https://developer.genability.com/quick-start/).

To learn more about the Genability JavaScript SDK, [see the SDK documentation](https://www.npmjs.com/package/@genability/api).

To learn more about Genability's APIs, take a look at our [developer documentation](https://developer.genability.com/).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
