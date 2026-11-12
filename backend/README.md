# Portfolio Backend (Admin CMS)

NestJS + Prisma + Neon (Postgres) API powering the portfolio admin.

## Setup

1. Create a Neon project at https://neon.tech and copy the **pooled** connection string.
2. Copy env and fill it in:
   ```bash
   cp .env.example .env
   # set DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET
   ```
3. Install, generate the client, create the schema, seed:
   ```bash
   npm install
   npm run prisma:generate
   npm run prisma:migrate   # creates tables on Neon
   npm run seed             # inserts the 3 existing projects
   ```
4. Run the API:
   ```bash
   npm run start:dev        # http://localhost:4000/api
   ```

## Auth

Single admin via env (`ADMIN_EMAIL` / `ADMIN_PASSWORD`). `POST /api/auth/login`
returns a JWT; send it as `Authorization: Bearer <token>` on write routes.

## Endpoints (stage 1)

| Method | Path | Auth | Description |
|-------|------|------|-------------|
| POST  | `/api/auth/login` | – | Log in, returns `{ token }` |
| GET   | `/api/auth/me` | JWT | Validate a token |
| GET   | `/api/projects` | – | Public, published projects |
| GET   | `/api/projects/slug/:slug` | – | One project by slug |
| GET   | `/api/projects/admin/all` | JWT | All projects |
| GET   | `/api/projects/admin/:id` | JWT | One project by id |
| POST  | `/api/projects` | JWT | Create |
| PUT   | `/api/projects/:id` | JWT | Update |
| DELETE| `/api/projects/:id` | JWT | Delete |

## Roadmap

- Stage 2: Skills, Services, Experience modules
- Stage 3: Blog posts, contact messages inbox
- Stage 4: file uploads (CV, images), public site reads from the API
