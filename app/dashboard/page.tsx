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
    <div className="max-w-5xl bg-gray-50 mx-auto px-4 pt-10 space-y-10 rounded-xl">
      
      <div className="space-y-4 pt-6 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Dashboard
        </h1>

        <div className="flex justify-center pt-2">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-1">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>

            <p className="text-sm text-gray-500">User ID: {user.id}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <AddBillForm />
      </div>

      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-800">Bills</h2>
      </div>

      <BillsList />
    </div>
  );
}