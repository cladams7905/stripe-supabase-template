# Next.js + Supabase + Stripe Template

A simple, ready-to-use template for building web apps with Next.js, Supabase authentication, and Stripe payments. Perfect for beginners who want to get started quickly!

## What's Inside

- ✅ **Next.js 15** - Modern React framework with App Router
- ✅ **Supabase** - User authentication (signup, login, logout)
- ✅ **Stripe** - Payment processing
- ✅ **Tailwind CSS 4.0** - Modern utility-first CSS framework
- ✅ **TypeScript** - Type-safe code
- ✅ **Example Pages** - Fully commented code for learning

## Getting Started

### Step 1: Install Dependencies

First, make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher).

Then, install the project dependencies:

```bash
npm install
```

### Step 2: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (takes about 2 minutes)
4. Go to **Project Settings** → **API Keys**
5. Copy your **Project URL** and **anon/public key**

### Step 3: Set Up Stripe

1. Go to [https://stripe.com](https://stripe.com) and create a free account
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key** (use the test mode keys)

### Step 4: Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` in your text editor

3. Fill in your Supabase and Stripe credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

4. Save the file

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the home page!

## Project Structure

This template uses the **Next.js App Router** (the modern way to build Next.js apps):

```
├── app/                    # App Router directory (Next.js 15)
│   ├── layout.tsx         # Root layout (wraps all pages)
│   ├── page.tsx           # Home page (/)
│   ├── globals.css        # Global styles with Tailwind 4.0
│   ├── auth/
│   │   ├── signup/page.tsx   # Sign up page
│   │   ├── login/page.tsx    # Login page
│   │   └── logout/page.tsx   # Logout handler
│   ├── dashboard/page.tsx    # Protected user dashboard
│   ├── payment/page.tsx      # Payment demo page
│   ├── success/page.tsx      # Payment success page
│   ├── cancel/page.tsx       # Payment cancelled page
│   └── api/
│       └── create-checkout/route.ts  # Stripe checkout API
├── lib/
│   ├── supabase.ts        # Supabase client and auth functions
│   └── stripe.ts          # Stripe payment functions
├── .env.example           # Environment variables template
└── README.md             # This file
```

## How to Use

### Authentication

All authentication functions are in `lib/supabase.ts`:

```typescript
import { signUp, signIn, signOut, getCurrentUser } from "@/lib/supabase";

// Sign up a new user
const { user, error } = await signUp("email@example.com", "password123");

// Sign in
const { user, error } = await signIn("email@example.com", "password123");

// Sign out
await signOut();

// Get current user
const user = await getCurrentUser();
```

### Payments

Payment functions are in `lib/stripe.ts`. The template includes a working example:

1. Go to `/payment` page
2. Click "Pay with Stripe"
3. Use test card: `4242 4242 4242 4242`
4. Use any future expiry date and any CVC

To customize the payment:

1. Open `app/payment/page.tsx`
2. Change the `priceInCents` (1000 = $10.00)
3. Change the `productName` to your product

### Protected Pages

See `app/dashboard/page.tsx` for an example of a page that requires login:

```typescript
"use client"; // Client component for authentication check

useEffect(() => {
  async function checkAuth() {
    const user = await getCurrentUser();
    if (!user) {
      router.push("/auth/login"); // Redirect to login
    }
  }
  checkAuth();
}, []);
```

### Styling with Tailwind CSS 4.0

This template uses **Tailwind CSS 4.0** with the new CSS import syntax. All components are styled with Tailwind utility classes:

```tsx
// Example: Button with Tailwind classes
<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
  Click Me
</button>
```

To customize styles:

- Edit `app/globals.css` for global styles
- Use Tailwind classes directly in your components
- Extend the theme in `tailwind.config.ts`

## Customization Guide

### For Beginners - Where to Start:

1. **Change the home page**: Edit `app/page.tsx`
2. **Customize the dashboard**: Edit `app/dashboard/page.tsx`
3. **Add your product**: Edit `app/payment/page.tsx`
4. **Style your app**: Use Tailwind classes or edit `app/globals.css`

### Adding New Pages (App Router):

With the App Router, you create pages using folders and `page.tsx` files:

1. Create a new folder in the `app/` directory
2. Add a `page.tsx` file inside
3. Example: `app/about/page.tsx` creates the route `/about`

```tsx
// app/about/page.tsx
export default function About() {
  return <div>About page content</div>;
}
```

### Client vs Server Components:

By default, components in the `app/` directory are **Server Components** (faster, more efficient). Add `'use client'` at the top of the file if you need:

- `useState`, `useEffect`, or other React hooks
- Event handlers (onClick, onChange, etc.)
- Browser APIs

```tsx
"use client"; // Add this for client-side features

import { useState } from "react";

export default function MyPage() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Adding Database Tables:

1. Go to your Supabase project
2. Click on **Table Editor**
3. Create new tables
4. Use the Supabase client to query them:

```typescript
import { supabase } from "@/lib/supabase";

// Insert data
const { data, error } = await supabase
  .from("your_table")
  .insert({ column: "value" });

// Query data
const { data, error } = await supabase.from("your_table").select("*");
```

## Testing Payments

Stripe provides test card numbers for development:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Authentication required**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## Common Issues

### "Invalid API Key" Error

- Make sure you copied the correct keys from Supabase/Stripe
- Check that there are no extra spaces in your `.env.local` file
- Make sure you're using the **public/anon** key for Supabase (not the service key)
- Make sure you're using **test mode** keys for Stripe

### Page Shows "Loading..." Forever

- Check your browser console for errors
- Make sure your Supabase URL and key are correct
- Try refreshing the page

### Stripe Redirect Not Working

- Make sure `NEXT_PUBLIC_APP_URL` is set in `.env.local`
- For local development, it should be `http://localhost:3000`

## Going to Production

When you're ready to deploy:

1. **Supabase**: Your test project works in production too!
2. **Stripe**: Switch from test keys to live keys in your `.env.local`
3. **Deploy**: Use [Vercel](https://vercel.com) (made by Next.js team):
   - Push your code to GitHub
   - Connect your repo to Vercel
   - Add your environment variables in Vercel's dashboard
   - Deploy!

## Learn More

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Tailwind CSS 4.0 Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## Need Help?

- Check the comments in the code files - everything is explained!
- Read the documentation links above
- Search for your error message online

## What to Build Next

Ideas for extending this template:

- Add a subscription plan instead of one-time payment
- Create a user profile page
- Add password reset functionality
- Build a pricing page
- Add email notifications with Supabase
- Create an admin dashboard
- Add social login (Google, GitHub, etc.)

---

**Happy coding!** 🚀

Remember: All the code is heavily commented. If you're not sure how something works, open the file and read the comments!
