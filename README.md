# 🏠 RentEasy — Client Side

This is the Client/Front-end repository for the Property Rental & Booking Platform. Tenants, Owners, and Admins can each browse, book, pay for, and manage properties through their own role-based dashboards.

---

## 🔗 Live & Repo Links

| Resource | Link |
|---|---|
| 🌍 Live Site | https://property-rental-client-kappa.vercel.app/
| ⚙️ Server Repository | https://github.com/nowshintisha230/property-rental-server
**Admin Credentials (Demo)**
- Email: `admin@renteasy.com`
- Password: `Admin123`

---

## 🎯 Purpose

NestStay makes it easy for Tenants to search, filter, save favorites, book properties, and pay securely via Stripe. Owners can list properties and track their earnings through an analytics dashboard. Admins moderate the entire platform.

---

## ✨ Key Features

- 🔐 Firebase Authentication (Email/Password) + JWT-protected routes
- 🔑 Google Social Login (new users are automatically assigned the Tenant role)
- 🧑‍🤝‍🧑 Role-Based Dashboards — Tenant / Owner / Admin
- 🏡 Home Page — Banner with search bar, Featured Properties, Why Choose Us, Reviews, and extra sections
- 🔍 All Properties Page — filter by location and property type, sort by price (low-to-high / high-to-low), backend pagination
- ❤️ Add to Favorites & Favorites Management
- 📅 Booking Modal — move-in date, contact number, additional notes
- 💳 Stripe Payment Integration
- ⭐ Review & Rating System
- 📊 Owner Analytics Dashboard — Total Earnings, Total Properties, Total Bookings, and a 12-month earnings line chart (Recharts)
- 🛠️ Admin Dashboard — manage Users, Properties, Bookings, and Transactions
- 🎞️ Framer Motion animations (Banner, Featured Properties, Review Section)
- 📱 Fully Responsive (mobile, tablet, desktop)
- 🚦 Custom Loading Page & Error Page
- 🔄 Logged-in users stay logged in on private route reload (no forced redirect to login)

---

## 🛠️ Tech Stack

- HTML5, CSS3, Tailwind CSS
- JavaScript (ES6+)
- React.js / Next.js
- HeroUI
- Firebase Authentication
- Stripe (Client SDK)

---

## 📦 Key NPM Packages

- `react` / `next`
- `react-router-dom` *(if not using Next.js routing)*
- `firebase`
- `axios`
- `@tanstack/react-query`
- `framer-motion`
- `recharts`
- `react-hook-form`
- `sweetalert2` / `react-hot-toast`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `@heroui/react`
- `react-icons`
- `swiper` *(if used for carousels/banners)*

> ⚠️ Update this list to match your actual `package.json`.

---

## 🔒 Environment Variables (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_IMGBB_API_KEY=
```

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Tenant** | Browse & book properties, manage favorites, view bookings, leave reviews |
| **Owner** | Add/update/delete properties, view analytics, approve/reject booking requests |
| **Admin** | Change user roles, approve/reject properties, monitor bookings & transactions |

---

## 🚀 Run Locally

```bash
git clone https://github.com/your-username/client-repo.git
cd client-repo
npm install
npm run dev
```

---

## 📌 Notes

- Make sure all environment variables are correctly set before running the project.
- The server must be deployed and running, otherwise API calls will fail.






<!-- 
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBFh0yUYjAVHF197qedLs1FFaAKBXCkydI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=property-rent-8a01b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=property-rent-8a01b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=property-rent-8a01b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=759746155997
NEXT_PUBLIC_FIREBASE_APP_ID=1:759746155997:web:c68270e50ca1ae1cdd9234
NEXT_PUBLIC_API_URL=http://localhost:5000 
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# NEXT_PUBLIC_IMGBB_API_KEY=


# MONGODB_URI=mongodb://Property-Rent:71mZcgAfwl0HeSTX@ac-yqaxt3v-shard-00-00.w9z1idq.mongodb.net:27017,ac-yqaxt3v-shard-00-01.w9z1idq.mongodb.net:27017,ac-yqaxt3v-shard-00-02.w9z1idq.mongodb.net:27017/?ssl=true&replicaSet=atlas-9oghey-shard-0&authSource=admin&appName=Cluster0

# // Your web app's Firebase configuration
# // For Firebase JS SDK v7.20.0 and later, measurementId is optional
# const firebaseConfig = {
#   apiKey: "AIzaSyBFh0yUYjAVHF197qedLs1FFaAKBXCkydI",
#   authDomain: "property-rent-8a01b.firebaseapp.com",
#   projectId: "property-rent-8a01b",
#   storageBucket: "property-rent-8a01b.firebasestorage.app",
#   messagingSenderId: "759746155997",
#   appId: "1:759746155997:web:c68270e50ca1ae1cdd9234",
#   measurementId: "G-E2QZ1C5M6F"
# };
 -->