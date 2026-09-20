This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Environment Variables

Create a `.env.local` file in the project root with the following variables. These are
**not** included in the repository for security reasons and must be provided manually.

```bash
# Neon / PostgreSQL connection string (required)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Better Auth secret — generate with: openssl rand -base64 32 (required)
BETTER_AUTH_SECRET="your-generated-secret"

# Base URL of the app (required in production; e.g. https://erevent.sa)
BETTER_AUTH_URL="http://localhost:3000"
```


---


## Database

This project uses **PostgreSQL** with **Drizzle ORM**.

The database connection is configured in:

```text
lib/db/index.ts
```

The Drizzle schema is located in:

```text
lib/db/schema.ts
```

Drizzle configuration:

```text
drizzle.config.ts
```

### Generate migrations

After making changes to the schema:

```bash
npx drizzle-kit generate
```

### Apply migrations

```bash
npx drizzle-kit migrate
```

Make sure `DATABASE_URL` is configured before running these commands.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
