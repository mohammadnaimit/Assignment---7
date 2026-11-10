# বাজার দর (BazarDor)

BazarDor helps people check everyday market prices in Bangladesh, compare product prices across markets, and follow price changes.

## Technologies

- Next.js 16 (App Router)
- React 19 and TypeScript
- Tailwind CSS 4, daisyUI, and HeroUI
- Better Auth for email/password and Google/GitHub sign-in
- MongoDB for authentication data
- BazarDor Products API for product, category, and market-price data

## Key features

1. Browse products across categories and sort them by price.
2. View product details, including market-by-market minimum and maximum prices.
3. Follow products with rising or falling prices from the home page and scrolling price ticker.
4. Create an account and sign in with email/password, Google, or GitHub.
5. Access product details and profile pages after signing in.

## Getting started

### Requirements

- Node.js
- A MongoDB connection string
- Google and GitHub OAuth credentials if you want to use social sign-in

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and set the environment variables used by the app:

   ```env
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_CICRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_CICRET=
   ```

   Keep credentials private. For local Google and GitHub OAuth apps, configure these callback URLs:

   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/github`

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
