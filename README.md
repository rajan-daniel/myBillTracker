## Development Notes

```bash
`-----------------------------------5/27/2026-----------------------------------------------
Wiring Supabase to NextJS Project
Connect Supabase DB by creating
  .env.local
  utils-
    supabase-
      server.tx
      client.ts
      middleware.ts

The NextJS router also needs, 
(auth)-
  Login
  Signup
Dashboard-

The fundamentals to wiring supabase on these pages,
  Step 1: Import Supabase client
  Step 2: Create Supabase instance inside component
  Step 3: signup with real Supabase signup inside try, catch block
  Step 4: Handle success + redirect

Dashboard
cookies for SSR Supabase client
create Supabase client
fetch authenticated user

As of now I have, 
Auth fully working (signup/login/logout)
Session persistence working
Protected dashboard working
User identity available (user.id, user.email)
DB exists with RLS enabled
```
