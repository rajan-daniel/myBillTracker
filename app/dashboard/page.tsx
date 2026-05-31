import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import AddBillForm from "@/components/AddBillForm";
import BillsList from "@/components/BillsList";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome, {user.email}</p>

      <p>User ID: {user.id}</p>

      <AddBillForm />

      <BillsList />
    </div>
  );
}