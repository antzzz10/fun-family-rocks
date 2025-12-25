# Fun Family Rocks - Service Guide

A simple reference for all the services powering this site.

## 🌐 Live Site
**URL:** https://fun-family-rocks.vercel.app
**What it is:** The actual website Aaron uses
**When to think about it:** Never - it auto-updates when you push to GitHub

---

## 📦 What Each Service Does

### 1. **Supabase** (Database & Storage)
**What it does:** Stores all the rock data and photos
**Dashboard:** https://supabase.com/dashboard
**When you need it:**
- To add/edit fun facts in bulk (SQL Editor)
- To check database if something seems wrong
- **Rarely** - the app manages everything else

**Your credentials:**
- Project: scavjjjiwggvcoxrqnql
- Login: Your Supabase account

---

### 2. **GitHub** (Code Storage)
**What it does:** Stores your app's code
**Repository:** https://github.com/antzzz10/fun-family-rocks
**When you need it:**
- When I make changes and push updates
- **Never** - unless you want to see the code

---

### 3. **Vercel** (Website Hosting)
**What it does:** Runs the website and makes it accessible
**Dashboard:** https://vercel.com
**When you need it:**
- To see deployment logs if something breaks
- To change environment variables (rare)
- **Almost never** - it auto-deploys from GitHub

**How it works:**
1. I push code to GitHub
2. Vercel automatically detects the change
3. Vercel rebuilds and deploys the site (2-3 minutes)
4. The site updates - no action needed from you!

---

## 🔑 Login Credentials

**Website Login:**
- Email: rocks@strictlynormal.org
- Password: Time4Coffee!

*Note: This is the shared family account for the app*

---

## 🔄 When Things Update

**I make a code change → Push to GitHub → Vercel auto-deploys → Site updates in 2-3 minutes**

You never have to do anything! Just wait a few minutes and refresh.

---

## 🆘 If Something Goes Wrong

1. **Site won't load:**
   - Check Vercel dashboard for deployment errors
   - Check if Supabase is down (status.supabase.com)

2. **Can't add rocks:**
   - Check Supabase dashboard → Storage (might be full)
   - Check browser console for errors

3. **Fun facts not showing:**
   - Go to Supabase → SQL Editor
   - Run: `SELECT COUNT(*) FROM rock_types;`
   - Should show 45 - if not, re-run the fun facts SQL

---

## 💰 Costs

**Current:** $0/month (all free tiers)

**Free tier limits:**
- Supabase: 500MB database, 1GB storage
- Vercel: Unlimited hobby projects
- GitHub: Free for public repos

**When you might need to pay:**
- If you upload hundreds of high-res photos (storage)
- If the site gets thousands of visitors (unlikely)

**Bottom line:** You'll almost certainly never hit these limits for a family collection.

---

## 📝 Quick Reference

| Service | What | When to Check |
|---------|------|---------------|
| **Vercel** | Hosts the site | Only if site is down |
| **Supabase** | Stores data/photos | To manage fun facts |
| **GitHub** | Stores code | Never (I use this) |

---

## 🪨 That's It!

**Day-to-day:** Just use the website - everything else runs itself.

**For updates:** I push changes, Vercel auto-deploys. That's it!

---

*Last updated: December 2024*
