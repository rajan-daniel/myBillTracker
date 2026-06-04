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

-----------------------------------5/29/2026-----------------------------------------------
Core application functionality
  CREATE Bills to table
  READ Bills from table using RLS
  DELETE Bills from table protected route

Update table rules to now allow NULL or EMPTY values for name amount 
changed bill to be actual date instead of just day of month
architecture and functionality are nearly complete

-----------------------------------5/31/2026-----------------------------------------------
refactored add bill form into a proper step based flow instead of everything on one screen
fixed weird form resizing issue caused by flex + max width layout
removed alerts and replaced them with in app error + success messages
added basic step validation so users cant move forward without filling required fields
cleaned up dashboard spacing between add bill form and bills list so it doesnt feel so disconnected
improved overall styling consistency (background contrast, card styling, spacing)
built out full page UI responsive navbar + hero image + footer and made navbar reactive for navigation across pages
kept full supabase auth + CRUD working (create, read, delete with user based RLS)
Legal Pages including Privacy Policy & Terms of Service

-----------------------------------6/2/2026-----------------------------------------------
App router for reset and update password via supabase client
Refactors and basic de bloating
First complete version of myBillTracker

-----------------------------------6/4/2026-----------------------------------------------
Polish and add edge features, edit, mark as paid, overdue and ascending sort logic
Complete styling and test for edge cases,
App becomes usuable and functional, start to stage CI/CD roadmaps for near future before
deployment.
```
