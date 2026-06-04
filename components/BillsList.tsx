"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import EditBillForm from "@/components/EditBillForm";

function getNextDueDate(dueDate: string, frequency: string): string {
  const date = new Date(dueDate);

  switch (frequency) {
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;

    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;

    case "yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;

    default:
      return dueDate;
  }

  return date.toISOString().split("T")[0];
}

type Bill = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  due_date: string;
  frequency: string;
  status: "paid" | "unpaid";
};

export default function BillsList({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const supabase = createClient();

  const [bills, setBills] = useState<Bill[]>([]);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [showPaid, setShowPaid] = useState(false);

  const filteredBills = showPaid
    ? bills
    : bills.filter((bill) => bill.status !== "paid");

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
  }, [refreshKey]);

  async function toggleStatus(bill: Bill) {
    const newStatus =
      bill.status === "paid" ? "unpaid" : "paid";

    const { error } = await supabase
      .from("bills")
      .update({ status: newStatus })
      .eq("id", bill.id);

    if (error) {
      alert(error.message);
      return;
    }

    // only generate next bill once
    if (
      bill.status === "unpaid" &&
      newStatus === "paid" &&
      bill.frequency !== "one-time"
    ) {
      const nextDueDate = getNextDueDate(
        bill.due_date,
        bill.frequency
      );

      await supabase.from("bills").insert({
        user_id: bill.user_id,
        name: bill.name,
        amount: bill.amount,
        due_date: nextDueDate,
        frequency: bill.frequency,
        status: "unpaid",
      });
    }

    fetchBills();
  }

  function isOverdue(bill: Bill) {
    return (
      bill.status !== "paid" &&
      new Date(bill.due_date) < new Date()
    );
  }

  function getBorderClass(bill: Bill) {
    if (bill.status === "paid")
      return "border-3 border-green-300";
    if (isOverdue(bill))
      return "border-3 border-red-300";
    return "";
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
        {/* TOGGLE */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowPaid(!showPaid)}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-sm"
          >
            {showPaid ? "Hide Paid Bills" : "Show Paid Bills"}
          </button>
        </div>

        {filteredBills.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            No bills found
          </p>
        ) : (
          <div className="space-y-3">
            {filteredBills.map((bill) => (
              <div
                key={bill.id}
                className={`border rounded-xl p-4 bg-white flex flex-col gap-1 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg hover:border-gray-300 w-full max-w-md mx-auto ${getBorderClass(
                  bill
                )}`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {bill.name}
                  </p>

                  {isOverdue(bill) && (
                    <p className="text-xs text-red-500 font-medium">
                      Overdue
                    </p>
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
                      {bill.status === "paid"
                        ? "Paid"
                        : "Mark as Paid"}
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

                <p className="text-gray-700">
                  ${bill.amount.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500">
                  Due:{" "}
                  {new Date(
                    bill.due_date
                  ).toLocaleDateString()}
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