## Development Notes

```bash
`-----------------------------------5/20/2026-----------------------------------------------
Scaffolded NextJS project
Create Supabase DB using Auth users and new table called public bills,
  Table Schema
  id UUID gen_random_uuid
  user_ud -> auth.uid()
  name -> text
  amount -> numeric
  due_day -> int8
  frequency -> text  DEFAULT monthly
  create_at -> timestampz DEFAULT now()

  foreign key 
  user_id -> auth.users.id

Enabled RLS with policy,
"create policy "Users manage own bills"
on bills
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);"

at this point now have, 
auth linkage
foreign key
ownership enforcement
RLS security

-----------------------------------5/27/2026-----------------------------------------------
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
