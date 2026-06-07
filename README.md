# 💸 myBillTracker

myBillTracker is a simple bill management application built for everyday people who want an easy way to track recurring expenses without the complexity of traditional finance apps. Instead of overwhelming users with budgeting tools, investment tracking, and unnecessary features, myBillTracker focuses on what matters most: keeping track of bills, payment dates, and upcoming expenses in a clean and simple way.

---

## ✨ Technologies

* TypeScript
* React
* NextJS
* Tailwind CSS
* Supabase
* Vercel

---

## 🚀 Features

* 💳 Track recurring bills and subscriptions
* 📅 Monitor upcoming payment due dates
* 📊 View monthly expense summaries
* 🔐 Secure authentication with Supabase
* 📱 Fully responsive design
* ⚡ Fast and modern NextJS architecture
* 🎨 Clean and user-friendly interface
* ☁️ Cloud-based data storage

---

## 📍 The Process

myBillTracker was built starting with the database architecture and authentication layer before evolving into a fully functional bill management application.

Rather than summarizing the process after the fact, the timeline below captures my thought process throughout the project. The entries are intentionally preserved in their original wording to reflect the real decisions, milestones, challenges, and improvements during development.

---

## 🛠️ Development Timeline

### 📅 5/20/2026

Scaffolded NextJS project

Create Supabase DB using Auth users and new table called public bills,

Table Schema

- id UUID gen_random_uuid
- user_ud -> auth.uid()
- name -> text
- amount -> numeric
- due_day -> int8
- frequency -> text DEFAULT monthly
- create_at -> timestampz DEFAULT now()

foreign key

- user_id -> auth.users.id

Enabled RLS with policy,

```sql
create policy "Users manage own bills"
on bills
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

at this point now have,

- auth linkage
- foreign key
- ownership enforcement
- RLS security

---

### 📅 5/27/2026

Wiring Supabase to NextJS Project

Connect Supabase DB by creating

```text
.env.local

utils-
  supabase-
    server.ts
    client.ts
    middleware.ts
```

The NextJS router also needs,

```text
(auth)-
  Login
  Signup

Dashboard-
```

The fundamentals to wiring supabase on these pages,

- Step 1: Import Supabase client
- Step 2: Create Supabase instance inside component
- Step 3: signup with real Supabase signup inside try, catch block
- Step 4: Handle success + redirect

Dashboard

- cookies for SSR Supabase client
- create Supabase client
- fetch authenticated user

As of now I have,

- Auth fully working (signup/login/logout)
- Session persistence working
- Protected dashboard working
- User identity available (user.id, user.email)
- DB exists with RLS enabled

---

### 📅 5/29/2026

Core application functionality

- CREATE Bills to table
- READ Bills from table using RLS
- DELETE Bills from table protected route

Update table rules to now allow NULL or EMPTY values for name amount

changed bill to be actual date instead of just day of month

architecture and functionality are nearly complete

---

### 📅 5/31/2026

refactored add bill form into a proper step based flow instead of everything on one screen

fixed weird form resizing issue caused by flex + max width layout

removed alerts and replaced them with in app error + success messages

added basic step validation so users cant move forward without filling required fields

cleaned up dashboard spacing between add bill form and bills list so it doesnt feel so disconnected

improved overall styling consistency (background contrast, card styling, spacing)

built out full page UI responsive navbar + hero image + footer and made navbar reactive for navigation across pages

kept full supabase auth + CRUD working (create, read, delete with user based RLS)

Legal Pages including Privacy Policy & Terms of Service

---

### 📅 6/2/2026

App router for reset and update password via supabase client

Refactors and basic de bloating

First complete version of myBillTracker

---

### 📅 6/4/2026

Polish and add edge features, edit, mark as paid, overdue and ascending sort logic

Complete styling and test for edge cases,

App becomes usuable and functional, start to stage CI/CD roadmaps for near future before deployment.

Auto recurring billing on payment

Style: Added two column dashboard while maintaining mobile scaling

Added border for clarity

Resolved edge cases, overflow element causing right side bands on mount, styling decisions,

additional application features not core like focus mode and styling to present them cleanly.

Resolved found bugs through testing like mark as paid spam causing duplicate cards.

---

### 📅 6/6/2026

version 1.0 of the application: edge cases and desired features.

styling, pagination, and mobile scaling features.

resolved edge cases of headers being too long by implementing truncation.

overall styling overhaul of the dashboard

resolved found bugs during testing

documentation updates including legal pages and README.md

website deployed.

---

## 🎯 Final Outcome

The result is a secure full-stack bill management application built with NextJS and Supabase featuring authentication, protected routes, CRUD functionality, recurring bill management, responsive design, and user-owned data secured through Row Level Security.

The project evolved from a simple bill tracker into a complete production-ready application while maintaining a focus on simplicity, usability, and clean architecture.

---

## ⚙️ Upcoming Project Features

* Light / Dark Mode
* SMS Notifications
* Toast Notifications
* Multi-currency support
* Mobile Deployment

---

## 📦 Use Cases

myBillTracker can be used for:

* Personal bill management
* Subscription tracking
* Household budgeting
* Expense monitoring
* Small business recurring expenses
* Financial planning

---

## 🌐 Live Demo

View the live project here:

https://my-bill-tracker-alpha.vercel.app/

GitHub Repository:

https://github.com/rajan-daniel/myBillTracker

---

## 📄 License

Copyright © 2026 Rajan Daniel

All Rights Reserved.
