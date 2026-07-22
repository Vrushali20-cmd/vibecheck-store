# VibeCheck — AI-Powered Fashion Store

> A full-stack fashion e-commerce platform with an AI personal stylist, mood-reactive UI, and complete shopping flow.

![VibeCheck Banner](https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80)

## Live Demo
🔗 **[Coming Soon](#)**

---

## What is VibeCheck?

VibeCheck is not just another e-commerce app. It's a **personalized style experience** where:

- An **AI Stylist** (powered by Gemini 2.5) understands your vibe and recommends complete matching outfits
- A **Style Booth** builds a full look (outfit + shoes + bag + jewellery + makeup) for any occasion — wedding, party, date night, office
- The dashboard **re-skins itself** based on your chosen aesthetic — Soft Girl, Y2K Cyber Chic, Clean Minimal, or Indie Alternative
- Everything from browsing → cart → checkout → order tracking works end to end

---

## Features

### 🛍️ Shopping
- Product catalog with category tabs (Dresses, Makeup, Bags, Shoes, Accessories)
- Product detail page with variant selector (size, color, shade)
- Search with debounce + filters (price range, style tag, sort)
- Add to Cart + Buy Now on every product

### 🤖 AI
- **AI Stylist Chat** — type your vibe, Gemini responds and surfaces matching products in real time
- **Style Booth** — 3-step occasion-based outfit curator (Wedding, Party, Casual, Festive, Office, Date Night)

### 🎨 UI/UX
- Mood-reactive dashboard — 4 full aesthetic themes (Soft Girl, Y2K, Minimal, Indie)
- Dark/light mode per mood
- Guest dashboard with social proof, Style Booth CTA, and login nudge
- Animated promo ticker, floating AI button, sticky nav

### 👤 User
- JWT authentication (register + login)
- Wishlist saved to backend — persists across sessions
- Cart with quantity controls + free shipping threshold
- COD checkout with full address form
- Order history with status tracking

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| AI | Google Gemini 2.5 Flash |
| Auth | JWT |
| HTTP | Axios |
| Routing | React Router v6 |

---

## Project Structure

```
vibecheck-store/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── userDashboard/     # Mood-reactive dashboard
│       │   ├── GuestDashboard/    # Public landing page
│       │   ├── StyleBooth/        # AI outfit curator
│       │   ├── ProductDetail/     # Product page
│       │   ├── Cart/              # Cart drawer
│       │   ├── Checkout/          # Address + COD
│       │   ├── OrderHistory/      # Order tracking
│       │   └── AIStylistDrawer/   # Gemini chat
│       └── hooks/
│           ├── useProducts.js
│           ├── useCart.js
│           ├── useWishlist.js
│           └── useOrders.js
└── server/                  # Express backend
    ├── models/
    │   ├── User.js
    │   ├── Cart.js
    │   └── Order.js
    ├── controllers/
    │   ├── productController.js
    │   ├── aiController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   └── wishlistController.js
    └── routes/
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repo
```bash
git clone https://github.com/Vrushali20-cmd/vibecheck-store.git
cd vibecheck-store
```

### 2. Setup backend
```bash
cd server
npm install
```

Create `.env` file in `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start backend:
```bash
node index.js
```

### 3. Setup frontend
```bash
cd client
npm install
npm run dev
```

### 4. Seed the database
```bash
cd server
node seed.js
```

Visit `http://localhost:5173`

---

## Screenshots

| Guest Dashboard | User Dashboard | Style Booth |
|---|---|---|
| Dark landing with AI CTA | Mood-reactive product feed | 3-step outfit builder |

| Product Detail | AI Stylist | Cart |
|---|---|---|
| Variant selector | Gemini-powered chat | Slide-in drawer |

---

## Key Highlights for Recruiters

- **Real AI integration** — not a mockup. Gemini 2.5 Flash extracts styling keywords and surfaces matching products in real time
- **Mood-reactive design system** — CSS custom properties cascade through the entire UI on mood change, zero re-renders
- **Production patterns** — JWT auth, protected routes, axios cancel tokens, optimistic UI updates, debounced search
- **Full e-commerce flow** — browse → search → filter → product detail → cart → checkout → order history
- **Clean architecture** — every feature in its own folder with index.jsx + components/ pattern

---

## Roadmap

- [ ] Online payment gateway integration
- [ ] Email order confirmation
- [ ] Size recommendation based on user profile
- [ ] Reviews & ratings system
- [ ] Admin dashboard (add/edit/delete products)
- [ ] PWA support (installable on mobile)

---

## Author

**Vrushali Jain**  
[GitHub](https://github.com/Vrushali20-cmd) · [LinkedIn](#)

---

*Built with ❤️ and a lot of ✨ vibes*
