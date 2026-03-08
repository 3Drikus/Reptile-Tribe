# Deployment Guide

## Stack
- Next.js 14 (App Router)
- GitHub: `3Drikus/Reptile-Tribe`
- Hosting: Vercel (via GitHub integration)

---

## First-Time Setup (One-off)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import `3Drikus/Reptile-Tribe` from GitHub
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**

Vercel will assign a production URL (e.g. `reptile-tribe.vercel.app`).

---

## Deploying Updates (Every time)

### 1. Commit your changes locally

```bash
git add <files>
git commit -m "Your commit message"
```

### 2. Push to GitHub

```bash
git push origin main
```

Vercel automatically detects the push and triggers a new production deployment. No manual steps needed.

---

## Checking Deployment Status

- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Click on the **Reptile Tribe** project
- The **Deployments** tab shows build logs and status for every push

---

## Custom Domain (Optional)

1. In the Vercel project, go to **Settings → Domains**
2. Add your domain (e.g. `reptile-tribe.co.za`)
3. Update your DNS records at your domain registrar as instructed by Vercel
4. Vercel provisions an SSL certificate automatically

---

## Environment Variables (If needed)

1. In the Vercel project, go to **Settings → Environment Variables**
2. Add key/value pairs
3. Redeploy for changes to take effect

> Local env vars go in `.env.local` — never commit this file to Git.
