"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Bill = {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  frequency: string;
};

export default function BillsList() {
  const supabase = createClient();

  const [bills, setBills] = useState<Bill[]>([]);

  async function fetchBills() {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setBills(data);
  }

  async function deleteBill(id: string) {
    const { error } = await supabase
      .from("bills")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    fetchBills();
  }

  useEffect(() => {
    fetchBills();
  }, []);

return (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-gray-800">
      Your Bills
    </h2>

    {bills.length === 0 ? (
      <p className="text-gray-500 text-sm">
        No bills yet
      </p>
    ) : (
      bills.map((bill) => (
        <div
          key={bill.id}
          className="border rounded-xl p-4 bg-white flex flex-col gap-1"
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">
              {bill.name}
            </p>

            <button
              onClick={() => deleteBill(bill.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>

          <p className="text-gray-700">
            ${bill.amount.toFixed(2)}
          </p>

          <p className="text-sm text-gray-500">
            Due: {new Date(bill.due_date).toLocaleDateString()}
          </p>

          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {bill.frequency}
          </p>
        </div>
      ))
    )}
  </div>
);
}