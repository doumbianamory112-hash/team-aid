# TEAM AID

Projet de site vitrine + inscription + administration.

## Stack
- Frontend: React 19 + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL

## Structure
- `frontend/` : site public et administration
- `backend/` : API REST
- `backend/schema.sql` : schéma de base

## Local launch

1. Install dependencies:
   ```bash
   npm install
   npm --prefix frontend install
   npm --prefix backend install
   ```

2. Configure MySQL and create the database:
   ```sql
   CREATE DATABASE team_aid;
   ```

3. Import schema:
   ```bash
   mysql -u root -p team_aid < backend/schema.sql
   ```

4. Copy `.env.example` to `.env` and update values.

5. Start backend:
   ```bash
   npm --prefix backend run dev
   ```

6. Start frontend:
   ```bash
   npm --prefix frontend run dev
   ```

## Deploy to production

Recommended:
- Frontend: Vercel / Netlify
- Backend: Render / Railway / VPS
- MySQL: managed service or secure dedicated server

Important:
- Do not expose MySQL directly to the internet.
- Use a public API backend and keep DB access protected.
- Put your domain and HTTPS certificate in place.

## Public sharing
- `/` : landing page
- `/register` : inscription publique
- `/dashboard` : admin dashboard

## Admin credentials
Default admin in schema:
- email: `admin@team-aid.local`
- password: `admin123`

Update it after first login.
