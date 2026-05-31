import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Dashboard
        </h1>

        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-1">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>

            <p className="text-sm text-gray-500">User ID: {user.id}</p>
          </div>
        </div>
      </div>

      <AddBillForm />

      <BillsList />
    </div>
  );
}
