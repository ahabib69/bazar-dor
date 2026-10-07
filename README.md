# 🛒 বাজার দর (Bazar Dor)

নিত্যপণ্যের দাম এক নজরে দেখার একটা ওয়েবসাইট। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ আর মসলার
আজকের দাম, গতকালের সাথে বাড়লো না কমলো, আর কোন বাজারে কত — সব একসাথে।

This is my B14-A7 assignment project. I built it while learning the Next.js App Router and
BetterAuth, so I kept the code simple on purpose.

- Live link: `https://your-project.vercel.app` (fill this after deploy)
- GitHub repo: `https://github.com/your-username/bazar-dor` (fill this)

## 🧰 Technologies used

- Next.js (App Router) — latest stable, currently 16.x
- React 19
- Tailwind CSS 4
- BetterAuth (email/password + Google)
- MongoDB Atlas with the BetterAuth MongoDB adapter
- react-hot-toast for notifications
- Hind Siliguri google font
- Prices API from the assignment repo: `https://api.api-store.workers.dev/api/bazardor`

## ✨ Features

1. Home page with hero, price ticker and three sections — top 6 risers, top 6 fallers and all products.
2. Every product card shows the emoji, name, unit, today's price in Bengali digits and the price change badge (▲ green up, ▼ red down, — flat).
3. Category filter + sorting (default, price low to high, price high to low, biggest price change) — sorting is done on the number, not on the Bengali text.
4. Category page (/category/[slug]) with its own sort dropdown, loading skeleton and an empty state that links back to home.
5. Product details page (/product/[slug]) that is protected, with min / max / average price, today vs yesterday vs last week vs last month, and a market wise price table grouped by division.
6. BetterAuth sign up, sign in, Google login and sign out, with toast messages for success and errors.
7. Protected routes with proxy (middleware) plus a server side session check, and after login the user goes back to the page they wanted.
8. Profile page showing user info, and a separate update page to change name and photo URL.
9. 404 page, error page when the API fails, and skeleton loading states on home, category and details page.
10. Responsive on mobile, tablet and desktop (the navbar category row scrolls sideways on small screens).

## 🚀 Getting started (local)

Follow these in order.

1. Unzip the project and go inside the folder:

```
cd bazar-dor
```

2. Install packages:

```
npm install
```

3. Make a free MongoDB Atlas database (steps are below) and a Google OAuth client (steps are below too).

4. Copy the env example and fill it:

```
cp .env.example .env.local
```

On Windows use `copy .env.example .env.local`.

5. Start the dev server:

```
npm run dev
```

6. Open http://localhost:3000

7. Production build check (do this before submitting):

```
npm run build
npm start
```

## 🔑 Environment variables (.env.local)

| Variable | What it is |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string, keep `/bazar_dor` as the database name |
| `BETTER_AUTH_SECRET` | long random string, generate with `npx @better-auth/cli secret` |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally, your Vercel URL in production |
| `GOOGLE_CLIENT_ID` | from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | from Google Cloud Console |
| `NEXT_PUBLIC_API_BASE_URL` | the prices API base url |

## 🍃 MongoDB Atlas setup (free)

1. Go to https://cloud.mongodb.com and sign up with Google.
2. Create a project, then Create a cluster → choose the free **M0** tier → pick a region close to you → Create.
3. In Database Access create a database user with a username and password (remember the password).
4. In Network Access add IP address → **Allow access from anywhere** (`0.0.0.0/0`). For a real app you would limit this, but for the assignment it is fine and Vercel needs it.
5. Click Connect → Drivers → copy the connection string. It looks like:
   `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Paste it into `.env.local` as `MONGODB_URI` and add the database name before the `?`:
   `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/bazar_dor?retryWrites=true&w=majority`
7. That's it. BetterAuth creates the `user`, `session`, `account` and `verification` collections by itself on the first sign up, no migration needed.

## 🔐 Google OAuth setup

1. Open https://console.cloud.google.com and create a new project (name it bazar-dor).
2. Go to APIs & Services → OAuth consent screen → External → fill app name and your email → save.
3. While the app is in testing mode, add your own Gmail under **Test users**, otherwise login will be blocked.
4. Go to APIs & Services → Credentials → Create credentials → OAuth client ID → Application type: **Web application**.
5. Add **Authorized JavaScript origins**:

```
http://localhost:3000
https://your-project.vercel.app
```

6. Add **Authorized redirect URIs**:

```
http://localhost:3000/api/auth/callback/google
https://your-project.vercel.app/api/auth/callback/google
```

7. Copy the client id and client secret into `.env.local` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) and into the Vercel environment variables.
8. In production put your real Vercel domain in `BETTER_AUTH_URL` and add that same domain to the redirect URIs and trusted origins. If login breaks after the first deploy, 99% of the time the Vercel URL is missing from the redirect URIs.

## ⚙️ Where to change the API

The api details are in **`lib/api.js`** in one place (base url plus the four calls: all products, category filter, categories, single product).
You can also change the base url from `.env.local` with `NEXT_PUBLIC_API_BASE_URL`, no code edit needed.

Endpoints used:

```
/products
/products?category=chal
/products/1            (single product by id)
/categories
/categories/chal
```

Small note about the api: `/products/<id>` works with the numeric id, and `/products/<slug>` answers with id based data, so in `getProduct()` I first try the slug endpoint and if it does not really match the slug I look the product up in the full list. That way both work.

## ☁️ Deploy on Vercel

1. Push the project to GitHub (commands are in the git section below).
2. Go to https://vercel.com, sign up with GitHub, then Add New → Project → import your repo.
3. Framework preset will be detected as Next.js. Don't change the build settings.
4. Open Environment Variables and add every variable from `.env.local` one by one, but set `BETTER_AUTH_URL` to your real Vercel url (`https://your-project.vercel.app`). Add them for Production, Preview and Development.
5. Click Deploy.
6. After deploy, open the live url and check everything from the checklist below. If Google login fails, copy the exact live domain into the Google redirect URIs.
7. If you change any env variable later, go to Settings → Environment Variables, edit it, then Deployments → Redeploy so the new value gets used.

## ✅ Final checklist before submitting

Test these on the deployed link, not just on localhost.

- [ ] Home page loads with categories in the navbar, price ticker and product cards
- [ ] API data actually shows up (product names, ৳ prices, change badges)
- [ ] Category filter buttons on home filter the grid
- [ ] Sort dropdown works — price low to high, high to low and price change
- [ ] Clicking a card opens `/product/[slug]`
- [ ] Details page shows min, max, average price and the market wise table
- [ ] Reloading `/product/[slug]` directly does not give 404 (and the same for `/category/[slug]`)
- [ ] Logged out user opening a product page gets sent to sign in, and after login comes back to that product
- [ ] Sign up works and shows a success toast, and wrong password shows an error toast
- [ ] Google login works
- [ ] Sign out works from the navbar dropdown
- [ ] My profile page shows name, email and join date
- [ ] Update information page saves a new name and photo url, and the profile shows them
- [ ] Unknown url like `/some-random-page` shows the 404 page with the home button
- [ ] Wrong category slug like `/category/no-such-thing` shows the 404 page
- [ ] Mobile view (375px) and tablet view look fine, navbar menu opens
- [ ] Browser console has no errors (a 404 on a broken image url is normal, nothing else)

## 🧭 Folder structure

```
bazar-dor/
├─ app/
│  ├─ api/auth/[...all]/route.js     (better auth route handler)
│  ├─ category/[slug]/page.js        (category page + loading.js)
│  ├─ product/[slug]/page.js         (details page + loading.js)
│  ├─ profile/page.js                (my profile)
│  ├─ profile/update/page.js         (update information)
│  ├─ signin/page.js, signup/page.js
│  ├─ layout.js, page.js, loading.js, error.js, not-found.js, globals.css, icon.svg
├─ components/                       (Navbar, Footer, Hero, PriceTicker, cards, forms...)
├─ lib/                              (api.js, auth.js, auth-client.js, format.js)
├─ proxy.js                          (protected routes)
├─ next.config.js, postcss.config.mjs, jsconfig.json
└─ .env.example
```

## 🧑‍💻 Git commits (in order)

These are the commits I made while building it. Run them one by one in the project root, or use
`git add .` and commit everything with the same messages.

```
git init
git add package.json next.config.js postcss.config.mjs jsconfig.json .gitignore app/globals.css
git commit -m "initial setup with next js and tailwind"

git add lib/format.js lib/api.js components/ProductCard.js
git commit -m "added api helper and product card with price change"

git add components/Navbar.js components/Footer.js
git commit -m "added navbar and footer"

git add components/Hero.js components/PriceTicker.js public/bazar-hero.png
git commit -m "added hero section and price ticker"

git add components/ProductFilter.js
git commit -m "product filter and sorting added"

git add app/category
git commit -m "category page with skeleton and empty state"

git add app/product components/ProductSkeleton.js app/loading.js
git commit -m "product details page with market wise price table"

git add lib/auth.js lib/auth-client.js app/api
git commit -m "better auth setup with google login"

git add proxy.js app/signin app/signup components/SignInForm.js components/SignUpForm.js
git commit -m "protected routes and redirect after login"

git add app/profile components/ProfileUpdateForm.js components/SignOutButton.js
git commit -m "profile page and update info done"

git add app/not-found.js app/error.js app/layout.js app/page.js components/CategoryProducts.js app/icon.svg
git commit -m "404 page, error page and toast added"

git add README.md .env.example
git commit -m "readme added"
```

(If you already unzipped a repo with history, you can just keep it, the messages are the same.)

## 📝 Notes

- The exam version of the site is in Bengali, product names and units come from the API as they are.
- Bengali digits are converted in `lib/format.js` (`toBn`, `taka`, `percent`), so sorting stays numeric.
- Email verification and forgot password are not added on purpose, like the assignment said.
- The `middleware` file is named `proxy.js` because Next.js 16 renamed middleware to proxy. In Next 15 and older you would name it `middleware.js` and the function `middleware`.
