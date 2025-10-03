# Next.js + Supabase + Stripe Template

A simple, ready-to-use template for building web apps with Next.js, Supabase authentication, and Stripe payments. Perfect for beginners who want to get started quickly!

## What's Inside

- ✅ **Next.js 15** - Modern React framework with App Router
- ✅ **React 19** - Latest React with Server Components
- ✅ **Supabase** - User authentication with Server Actions
- ✅ **Stripe** - Payment processing
- ✅ **Tailwind CSS 4.0** - Modern utility-first CSS framework
- ✅ **TypeScript** - Type-safe code
- ✅ **Server Components** - Server-side rendering by default
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

This template uses the **Next.js App Router** with the `src/` directory:

```
├── src/
│   ├── app/                      # App Router directory (Next.js 15)
│   │   ├── layout.tsx           # Root layout (wraps all pages)
│   │   ├── page.tsx             # Home page (/) - Server Component
│   │   ├── globals.css          # Global styles with Tailwind 4.0
│   │   ├── auth/
│   │   │   ├── actions.ts       # Server Actions for auth
│   │   │   ├── signup/page.tsx  # Sign up page
│   │   │   ├── login/page.tsx   # Login page
│   │   │   └── logout/page.tsx  # Logout handler
│   │   ├── dashboard/page.tsx   # Protected dashboard - Server Component
│   │   ├── payment/page.tsx     # Payment demo page
│   │   ├── success/page.tsx     # Payment success page
│   │   ├── cancel/page.tsx      # Payment cancelled page
│   │   └── api/
│   │       └── create-checkout/route.ts  # Stripe checkout API
│   └── lib/
│       ├── supabase-server.ts   # Supabase server-side client
│       └── stripe.ts            # Stripe payment functions
├── public/                       # Static assets
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## How to Use

### Authentication

This template uses **Server Actions** for authentication - the secure, modern way to handle auth in Next.js.

**Server-side authentication** (in Server Components):

```typescript
// src/app/page.tsx or src/app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/supabase-server";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Welcome {user.email}</div>;
}
```

**Client-side authentication** (using Server Actions):

```typescript
// src/app/auth/login/page.tsx
"use client";

import { signInAction } from "../actions";

export default function Login() {
  async function handleSubmit(formData: FormData) {
    const result = await signInAction(formData);
    // Server Action handles auth and redirects automatically
  }

  return (
    <form action={handleSubmit}>
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

Available Server Actions in `src/app/auth/actions.ts`:
- `signUpAction(formData)` - Create a new user account
- `signInAction(formData)` - Sign in existing user
- `logoutAction()` - Sign out current user

### Payments

Payment functions are in `src/lib/stripe.ts`. The template includes a working example:

1. Go to `/payment` page
2. Click "Pay with Stripe"
3. Use test card: `4242 4242 4242 4242`
4. Use any future expiry date and any CVC

To customize the payment:

1. Open `src/app/payment/page.tsx`
2. Change the `priceInCents` (1000 = $10.00)
3. Change the `productName` to your product

### Protected Pages

**Server Component approach** (recommended) - see `src/app/dashboard/page.tsx`:

```typescript
// Protected Server Component
import { getCurrentUser } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Welcome to your dashboard, {user.email}!</div>;
}
```

This approach is better because:
- ✅ No loading states needed
- ✅ Auth checked before page renders
- ✅ Better SEO (server-rendered)
- ✅ Faster initial page load

### Styling with Tailwind CSS 4.0

This template uses **Tailwind CSS 4.0** with the new CSS import syntax. All components are styled with Tailwind utility classes:

```tsx
// Example: Button with Tailwind classes
<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
  Click Me
</button>
```

To customize styles:

- Edit `src/app/globals.css` for global styles
- Use Tailwind classes directly in your components
- Extend the theme in `tailwind.config.ts`

## Customization Guide

### For Beginners - Where to Start:

1. **Change the home page**: Edit `src/app/page.tsx`
2. **Customize the dashboard**: Edit `src/app/dashboard/page.tsx`
3. **Add your product**: Edit `src/app/payment/page.tsx`
4. **Style your app**: Use Tailwind classes or edit `src/app/globals.css`

### Adding New Pages (App Router):

With the App Router, you create pages using folders and `page.tsx` files:

1. Create a new folder in the `src/app/` directory
2. Add a `page.tsx` file inside
3. Example: `src/app/about/page.tsx` creates the route `/about`

```tsx
// src/app/about/page.tsx
export default function About() {
  return <div>About page content</div>;
}
```

### Server Components vs Client Components:

By default, all components are **Server Components** (faster, better SEO). Only use `'use client'` when you need:

- `useState`, `useEffect`, or other React hooks
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)

```tsx
// src/app/counter/page.tsx
"use client"; // Add this for client-side features

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**When to use Server Components (default):**
- Fetching data
- Accessing backend resources directly
- Keeping sensitive information on the server (API keys, etc.)
- Pages that need SEO

**When to use Client Components:**
- Interactive UI (forms, buttons with state)
- Event listeners
- Browser-only APIs

### Adding Database Tables:

1. Go to your Supabase project
2. Click on **Table Editor**
3. Create new tables
4. Use the Supabase server client in Server Components:

```typescript
// In a Server Component or Server Action
import { createClient } from "@/lib/supabase-server";

export default async function MyPage() {
  const supabase = await createClient();

  // Query data
  const { data, error } = await supabase.from("your_table").select("*");

  // Insert data
  const { error: insertError } = await supabase
    .from("your_table")
    .insert({ column: "value" });

  return <div>{/* render your data */}</div>;
}
```

Or use Server Actions for mutations:

```typescript
// src/app/actions.ts
"use server";

import { createClient } from "@/lib/supabase-server";

export async function addItem(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name");

  const { error } = await supabase.from("items").insert({ name });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
}
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
