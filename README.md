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
```
