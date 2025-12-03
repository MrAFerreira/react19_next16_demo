# React 19 & Next.js 16 Starter

Aplicação demo para explorar as novas funcionalidades de React e Next.js.

## Tech Stack

- React 19
- Next.js 16 (App Router)
- Tailwind CSS (com DaisyUI components)
- BetterAuth (authentication)
- Prisma (ORM)
- Zod (schema validation)
- Node 22 or higher

## Getting Started

1. Fork this repository to your GitHub account.
2. Clone your fork locally.
3. Create and fill the `.env` file with the required variables (given during class)
4. Install dependencies.
5. Generate Prisma client.
6. Run the dev server.

## Environment Variables

Create a `.env` file in the project root. Include:

- Database connection (`DATABASE_URL`)
- BetterAuth secrets/keys ( `BETTERAUTH_SECRET`, `BETTERAUTH_BASE_URL`)

Example:

```sh
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
BETTERAUTH_SECRET="a-long-random-string"
BETTERAUTH_BASE_URL="http://localhost:3000"
```

Proper .env will be given during the class.

## Setup commands

```sh
# 1) Install dependencies
npm i

# 2) Generate Prisma client
npx prisma generate

# 3) Run the dev server
npm run dev
```

Open http://localhost:3000 in your browser.

To build and run the project:

```sh
# 1) Build the project
npm run build

# 2) Run the built version
npm run start

```

## Project Structure

- `app/` — Main application folder. Contains:
  - `(root)/` — Public pages and layout.
  - `(authenticated)/` — Authenticated pages and layout.
  - `globals.css` — Global styles.
- `components/` — Reusable UI components (e.g., `Navbar`, `ui/AuthBar`).
- `actions/` — Server actions for authentication, posts, and profiles.
- `lib/` — Utility modules (e.g., authentication helpers).
- `prisma/` — Prisma ORM schema and migrations.
- `proxy.ts` — Route protection and middleware logic.
- `package.json` — Project scripts and dependencies.
- `.env` — Environment variables (not committed).
- `README.md` — Project documentation.

## Client Routes (Endpoints)

| Method | Endpoint        | Description         | Access    |
| ------ | --------------- | ------------------- | --------- |
| GET    | `/home`         | Public landing page | Public    |
| GET    | `/auth/login`   | Login page          | Public    |
| GET    | `/auth/signup`  | Signup page         | Public    |
| GET    | `/dashboard`    | Dashboard           | Auth-only |
| GET    | `/posts/create` | Create post page    | Auth-only |
| GET    | `/profile`      | Profile page        | Auth-only |

Auth redirection behavior is implemented in [`proxy.ts`](proxy.ts):

- Public routes: `["/auth/login", "/auth/signup", "/home"]`
- If a user is not authenticated and requests a protected route, they are redirected to `/home`.
- If a user is authenticated and requests a public route, they are redirected to `/dashboard`.

## Actions API

Actions are server-side functions used by components and pages.

## Actions API

| File                 | Function Signature                                                                | Returns                  | Description / Notes                                                                |
| -------------------- | --------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `actions/auth.ts`    | `getUserInfo(): Promise<User \| null>`                                            | User object or `null`    | Used by `app/(authenticated)/layout.tsx` and `components/Navbar.tsx` via Suspense. |
|                      | `login(input: { email: string; password: string }): Promise<User \| null>`        | User object or `null`    | Authenticates user.                                                                |
|                      | `signup(input: { name: string; email: string; password: string }): Promise<User>` | User object              | Registers new user.                                                                |
| `actions/post.ts`    | `createPost(input: { title: string; content: string }): Promise<Post>`            | Created post             | Creates a new post.                                                                |
|                      | `getLatestPosts(): Promise<Post[]>`                                               | Array of posts           | Returns recent posts.                                                              |
|                      | `getPostById(id: string): Promise<Post \| null>`                                  | Post object or `null`    | Fetches a post by ID.                                                              |
| `actions/profile.ts` | `getProfile(userId: string): Promise<Profile \| null>`                            | Profile object or `null` | Fetches user profile by user ID.                                                   |
|                      | `updateProfile(input: { name?: string; bio?: string }): Promise<Profile>`         | Updated profile          | Updates profile fields.                                                            |

All actions are server-side functions and the mutations use Zod for validation.

## Auth and Routing

- Route protection logic is centralized in [`proxy.ts`](proxy.ts).
- It uses BetterAuth session via [`lib/auth`](lib/auth) and Next’s request/response API:
  - `auth.api.getSession({ headers })` decides whether a user is logged in.
  - Redirect rules:
    - Not authenticated + protected route → redirect to `/home`.
    - Authenticated + public route → redirect to `/dashboard`.

## Styling

- Tailwind CSS is configured and DaisyUI utility classes are used in components (e.g., `btn`, `navbar`).
- Global styles live in `app/globals.css` (imported by both layouts).

## Notes for Students

There is a folder [`components/exercises`](components/exercises/) that you can use to write your components for class exercises. If you prefer you can create them elsewhere and then share the code you created during class.
