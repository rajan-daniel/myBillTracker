"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import EditBillForm from "@/components/EditBillForm";

type Bill = {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  frequency: string;
  status: "paid" | "unpaid";
};

export default function BillsList({ refreshKey }) {
  const supabase = createClient();

  const [bills, setBills] = useState<Bill[]>([]);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  async function fetchBills() {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .order("due_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setBills(data);
  }

  async function deleteBill(id: string) {
    const { error } = await supabase.from("bills").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    fetchBills();
  }

  useEffect(() => {
    fetchBills();
  }, [refreshKey]);

  async function toggleStatus(bill: Bill) {
    const newStatus = bill.status === "paid" ? "unpaid" : "paid";

    const { error } = await supabase
      .from("bills")
      .update({ status: newStatus })
      .eq("id", bill.id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchBills();
  }

  function isOverdue(bill: Bill) {
    return bill.status !== "paid" && new Date(bill.due_date) < new Date();
  }

  return (
    <>
      {editingBill && (
        <EditBillForm
          bill={editingBill}
          onClose={() => setEditingBill(null)}
          onSuccess={() => {
            setEditingBill(null);
            fetchBills();
          }}
        />
      )}

      <div className="space-y-4 pb-6">
        {bills.length === 0 ? (
          <p className="text-gray-500 text-sm">No bills yet</p>
        ) : (
          <div className="space-y-3">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className={`border rounded-xl p-4 bg-white flex flex-col gap-1 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg hover:border-gray-300 w-full max-w-md mx-auto ${
                  isOverdue(bill) ? "border-3 border-red-300" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {bill.name}
                  </p>
                  {isOverdue(bill) && (
                    <p className="text-xs text-red-500 font-medium">Overdue</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleStatus(bill)}
                      className={`text-sm hover:underline ${
                        bill.status === "paid"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {bill.status === "paid" ? "Paid" : "Mark as Paid"}
                    </button>
                    <button
                      onClick={() => setEditingBill(bill)}
                      className="text-[var(--text-color)] text-sm hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBill(bill.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-700">${bill.amount.toFixed(2)}</p>

                <p className="text-sm text-gray-500">
                  Due: {new Date(bill.due_date).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {bill.frequency}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
