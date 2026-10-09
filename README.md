# \# 🛒 বাজার দর (Bazar Dor)

# 

# \### নিত্যপণ্যের দাম জানুন, বাজার করুন বুঝেশুনে!

# 

# \*\*বাজার দর (Bazar Dor)\*\* একটি web application, যেখানে চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলাসহ নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখা যায়।

# 

# পণ্যের আজকের দাম, গতকালের তুলনায় দাম বেড়েছে নাকি কমেছে, বিভিন্ন ক্যাটাগরির পণ্য এবং বাজারভিত্তিক মূল্যসংক্রান্ত তথ্য সহজেই দেখা যায়।

# 

# This is my \*\*B14-A7 assignment project\*\*. I built it while learning Next.js App Router, BetterAuth, MongoDB, and modern web development practices.

# 

# \## 🌐 Project Links

# 

# \- \*\*Live Website:\*\* https://bazar-dor-one.vercel.app/

# \- \*\*GitHub Repository:\*\* https://github.com/ahabib69/bazar-dor

# 

# \## ✨ Features

# 

# \- 🏠 \*\*Dynamic Homepage:\*\* Hero section, price ticker, top price risers, top price fallers, and all products.

# \- 📦 \*\*Product Information:\*\* Product name, emoji, unit, today's price, and price change.

# \- 📈 \*\*Price Comparison:\*\* See whether product prices have increased, decreased, or remained unchanged.

# \- 🗂️ \*\*Category Filtering:\*\* Browse products by category.

# \- ↕️ \*\*Sorting:\*\* Sort products by default order, lowest price, highest price, and biggest price change.

# \- 🏷️ \*\*Category Pages:\*\* Dedicated pages for individual product categories.

# \- 📊 \*\*Product Details:\*\* Detailed price information, including minimum, maximum, and average prices, along with historical comparisons and market-wise price information.

# \- 🔐 \*\*Authentication:\*\* Sign up, sign in, Google login, and sign out using BetterAuth.

# \- 🛡️ \*\*Protected Routes:\*\* Restrict access to protected pages and redirect users back to their intended page after login.

# \- 👤 \*\*User Profile:\*\* View profile information and update name and photo URL.

# \- 🔔 \*\*Toast Notifications:\*\* Display success and error messages for relevant actions.

# \- ⏳ \*\*Loading States:\*\* Skeleton loading interfaces for relevant pages.

# \- 🚫 \*\*Error Handling:\*\* Custom 404 page and error handling for failed API requests.

# \- 📱 \*\*Responsive Design:\*\* Designed for mobile, tablet, and desktop screens.

# 

# \## 🧰 Technologies Used

# 

# \- \*\*Next.js 16\*\* — App Router and server-side rendering

# \- \*\*React 19\*\* — UI components

# \- \*\*Tailwind CSS 4\*\* — Styling and responsive design

# \- \*\*BetterAuth\*\* — Authentication and session management

# \- \*\*MongoDB Atlas\*\* — Database

# \- \*\*Google OAuth\*\* — Social authentication

# \- \*\*react-hot-toast\*\* — Toast notifications

# \- \*\*Hind Siliguri\*\* — Bengali typography

# \- \*\*REST API\*\* — Product and category data

# 

# \### Products API

# 

# The application uses the assignment-provided API:

# 

# `https://api.api-store.workers.dev/api/bazardor`

# 

# \## 🚀 Getting Started

# 

# Follow these steps to run the project locally.

# 

# \### Prerequisites

# 

# Make sure you have installed:

# 

# \- Node.js

# \- npm

# \- Git

# \- A MongoDB Atlas account

# \- Google Cloud Console access for Google OAuth

# 

# \### 1. Clone the Repository

# 

# ```bash

# git clone https://github.com/ahabib69/bazar-dor.git

# cd bazar-dor

# ```

# 

# \### 2. Install Dependencies

# 

# ```bash

# npm install

# ```

# 

# \### 3. Configure Environment Variables

# 

# Create a `.env.local` file in the project root.

# 

# On Windows:

# 

# ```powershell

# copy .env.example .env.local

# ```

# 

# Open `.env.local` and configure the required environment variables.

# 

# \### 4. Run the Development Server

# 

# ```bash

# npm run dev

# ```

# 

# Open the following address in your browser:

# 

# `http://localhost:3000`

# 

# \### 5. Check the Production Build

# 

# Run:

# 

# ```bash

# npm run build

# ```

# 

# If the build succeeds, you can test the production server locally:

# 

# ```bash

# npm start

# ```

# 

# \## 🔑 Environment Variables

# 

# Configure the following variables in `.env.local`:

# 

# | Variable | Description |

# |---|---|

# | `MONGODB\_URI` | MongoDB Atlas connection string |

# | `BETTER\_AUTH\_SECRET` | Secret used by BetterAuth |

# | `BETTER\_AUTH\_URL` | Base URL of the application |

# | `GOOGLE\_CLIENT\_ID` | Google OAuth client ID |

# | `GOOGLE\_CLIENT\_SECRET` | Google OAuth client secret |

# | `NEXT\_PUBLIC\_API\_BASE\_URL` | Base URL for the products API |

# 

# \*\*Important:\*\* Never commit `.env.local` or publish secret credentials in your repository.

# 

# Use `.env.example` to document the required variable names without exposing real credentials.

# 

# \## 🍃 MongoDB Atlas Setup

# 

# 1\. Visit https://cloud.mongodb.com and sign in.

# 2\. Create a project and a free cluster.

# 3\. Open \*\*Database Access\*\* and create a database user.

# 4\. Configure \*\*Network Access\*\* to allow your application to connect.

# 5\. Open \*\*Connect → Drivers\*\* and copy the connection string.

# 6\. Add the database name `bazar\_dor` to the connection string.

# 7\. Save the completed connection string as `MONGODB\_URI` in `.env.local`.

# 

# Example format:

# 

# ```text

# mongodb+srv://<username>:<password>@<cluster-url>/bazar\_dor?retryWrites=true\&w=majority

# ```

# 

# Replace the example values with your actual MongoDB credentials.

# 

# \*\*Security note:\*\* Use a strong database password and restrict network access appropriately for your deployment.

# 

# \## 🔐 Google OAuth Setup

# 

# Google login requires a Google OAuth client configured in Google Cloud Console.

# 

# \### 1. Create an OAuth Client

# 

# 1\. Visit https://console.cloud.google.com.

# 2\. Create or select a Google Cloud project.

# 3\. Configure the OAuth consent screen.

# 4\. Create an OAuth Client ID.

# 5\. Select \*\*Web application\*\* as the application type.

# 

# \### 2. Configure Authorized JavaScript Origins

# 

# For local development, add:

# 

# ```text

# http://localhost:3000

# ```

# 

# For production, add:

# 

# ```text

# https://bazar-dor-one.vercel.app

# ```

# 

# \### 3. Configure Authorized Redirect URIs

# 

# For local development, add:

# 

# ```text

# http://localhost:3000/api/auth/callback/google

# ```

# 

# For production, add:

# 

# ```text

# https://bazar-dor-one.vercel.app/api/auth/callback/google

# ```

# 

# \### 4. Configure Environment Variables

# 

# Add the Google OAuth credentials to `.env.local`:

# 

# ```text

# GOOGLE\_CLIENT\_ID=your\_google\_client\_id

# GOOGLE\_CLIENT\_SECRET=your\_google\_client\_secret

# ```

# 

# Use the actual values from Google Cloud Console. Never publish the client secret.

# 

# For production, configure the corresponding environment variables in Vercel.

# 

# Make sure `BETTER\_AUTH\_URL` matches the deployed application URL:

# 

# ```text

# https://bazar-dor-one.vercel.app

# ```

# 

# The production domain must also be configured correctly in Google OAuth settings.

# 

# \## ⚙️ Products API

# 

# The API configuration is managed in:

# 

# `lib/api.js`

# 

# The application uses the assignment API to retrieve product and category information.

# 

# The API provides endpoints for:

# 

# \- Retrieving all products

# \- Filtering products by category

# \- Retrieving categories

# \- Retrieving individual product information

# 

# Base API URL:

# 

# `https://api.api-store.workers.dev/api/bazardor`

# 

# The application also handles product lookup by slug when resolving product details.

# 

# \## ☁️ Deployment on Vercel

# 

# The project is deployed on Vercel.

# 

# \*\*Live Website:\*\* https://bazar-dor-one.vercel.app/

# 

# To deploy your own copy:

# 

# 1\. Push the project to GitHub.

# 2\. Visit https://vercel.com and sign in with GitHub.

# 3\. Import the repository.

# 4\. Confirm that Vercel detects Next.js.

# 5\. Add the required environment variables.

# 6\. Set `BETTER\_AUTH\_URL` to your production domain.

# 7\. Deploy the application.

# 8\. Test authentication and the main application features after deployment.

# 

# If you change environment variables in Vercel, redeploy the application so that the updated configuration takes effect.

# 

# \## 🧪 Final Testing Checklist

# 

# The following checks should be completed on the deployed website:

# 

# \- \[ ] Homepage loads correctly.

# \- \[ ] Product names, prices, and price changes are displayed.

# \- \[ ] Category filtering works.

# \- \[ ] Product sorting works correctly.

# \- \[ ] Product cards open the appropriate details pages.

# \- \[ ] Product details display the expected price information.

# \- \[ ] Category pages load correctly when opened directly.

# \- \[ ] Protected pages require authentication.

# \- \[ ] Users return to their intended page after signing in.

# \- \[ ] Sign-up and sign-in work correctly.

# \- \[ ] Google login works correctly.

# \- \[ ] Sign-out works correctly.

# \- \[ ] Profile information is displayed correctly.

# \- \[ ] Profile updates are saved successfully.

# \- \[ ] Unknown routes display the custom 404 page.

# \- \[ ] Loading states and error handling work as expected.

# \- \[ ] The layout works on mobile, tablet, and desktop.

# \- \[ ] No unexpected browser console errors appear.

# 

# \## 📁 Project Structure

# 

# ```text

# bazar-dor/

# ├── app/

# │   ├── api/

# │   │   └── auth/

# │   ├── category/

# │   │   └── \[slug]/

# │   ├── product/

# │   │   └── \[slug]/

# │   ├── profile/

# │   │   └── update/

# │   ├── signin/

# │   ├── signup/

# │   ├── layout.js

# │   ├── page.js

# │   ├── loading.js

# │   ├── error.js

# │   ├── not-found.js

# │   └── globals.css

# ├── components/

# ├── lib/

# │   ├── api.js

# │   ├── auth.js

# │   ├── auth-client.js

# │   └── format.js

# ├── public/

# ├── proxy.js

# ├── .env.example

# ├── .gitignore

# ├── next.config.js

# ├── package.json

# └── README.md

# ```

# 

# \## 📝 Additional Notes

# 

# \- The project uses Bengali text and product information from the assignment API.

# \- Bengali number formatting is handled in `lib/format.js`.

# \- Product sorting uses numeric values rather than Bengali-formatted price strings.

# \- Authentication is implemented with BetterAuth.

# \- The `proxy.js` file is used for route protection in this Next.js 16 project.

# \- Email verification and password recovery are not implemented as part of the current project scope.

# 

# \## 👨‍💻 Author

# 

# Developed as part of the \*\*B14-A7 Bazar Dor assignment\*\* while learning Next.js, authentication, API integration, and responsive web development.

# 

# \---

# 

# \*\*Thank you for visiting Bazar Dor! 🛒💚\*\*

