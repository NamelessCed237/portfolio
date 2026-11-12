# Déploiement — Vercel (frontend) + Render (backend) + Neon (base)

## 1. Base de données — Neon
1. Crée un projet sur https://neon.tech.
2. Copie la **connection string poolée** (`...-pooler...`), elle servira de `DATABASE_URL`.

## 2. Backend — Render
1. Sur https://render.com → **New +** → **Blueprint**, connecte ce dépôt GitHub.
   Render détecte `render.yaml` et propose le service **portfolio-api**.
2. Renseigne les variables **secrètes** (dashboard) :
   - `DATABASE_URL` → la chaîne Neon
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` → tes identifiants admin
   - `FRONTEND_ORIGIN` → l'URL Vercel (ex. `https://bikecedric.vercel.app`)
   - `JWT_SECRET` est généré automatiquement.
3. Déploie. Le build lance `prisma generate` + `prisma migrate deploy` (crée les tables),
   puis démarre l'API. Santé : `GET /api/health`.
4. **Seed** (une fois, pour injecter projets/compétences/services/expériences) :
   ouvre le **Shell** du service Render et lance `npm run seed`.
5. Note l'URL publique de l'API : `https://portfolio-api-xxxx.onrender.com`.

> ⚠️ Les fichiers téléversés (CV, images) sont **éphémères** sur le plan gratuit
> (perdus au redéploiement). Pour la prod : ajoute un **disque persistant**
> (décommenté dans `render.yaml`, plan payant) ou utilise un stockage externe (Cloudinary/S3).

## 3. Frontend — Vercel
1. Sur https://vercel.com → **Add New** → **Project**, importe ce dépôt.
2. **Root Directory** : `frontend` (important, c'est un monorepo). Le reste est auto
   (framework Vite, `vercel.json` gère le routage SPA).
3. Variables d'environnement :
   - `VITE_API_URL` → `https://portfolio-api-xxxx.onrender.com/api`
   - (optionnel) `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
4. Déploie. Récupère l'URL Vercel.

## 4. Relier les deux
- Mets l'URL Vercel dans `FRONTEND_ORIGIN` côté Render (CORS), puis redéploie le backend.
- L'admin est sur `https://<ton-domaine-vercel>/admin` (identifiants = `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## Notes
- Le free Render se met en veille après inactivité : le **premier appel** peut prendre ~30 s.
  Le site public reste fonctionnel pendant ce temps grâce au **repli sur les données statiques**.
- Domaine perso (`bikecedric.dev`) : à configurer côté Vercel (DNS).
