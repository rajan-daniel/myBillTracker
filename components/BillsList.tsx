"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import EditBillForm from "@/components/EditBillForm";

// -------------- utility functions -------------- //
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

function isNextMonth(dueDate: string) {
  const date = new Date(dueDate);
  const now = new Date();

  return (
    date.getFullYear() > now.getFullYear() ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() > now.getMonth())
  );
}

function truncateName(name: string) {
  return name.length > 8 ? name.slice(0, 8) + "..." : name;
}

function truncateAmount(amount: number) {
  const formatted = amount.toFixed(2);

  return amount >= 10000000 ? formatted.slice(0, 8) + "..." : formatted;
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
// ------------------------------------------ //

// -------------- component -------------- //
export default function BillsList({ refreshKey }: { refreshKey: number }) {
  const supabase = createClient();

// -------------- states -------------- //
  const [bills, setBills] = useState<Bill[]>([]);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [showPaid, setShowPaid] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 10;
// ------------------------------------------ //

// -------------- computed values -------------- //
  const unpaidBills = bills.filter((bill) => bill.status !== "paid");

  const filteredBills = showPaid
    ? bills
        .filter((bill) => bill.status === "paid")
        .sort(
          (a, b) =>
            new Date(b.due_date).getTime() - new Date(a.due_date).getTime(),
        )
        .slice(0, 15)
    : unpaidBills.slice((page - 1) * pageSize, page * pageSize);

  const thisMonthUnpaidTotal = filteredBills
    .filter((bill) => {
      const date = new Date(bill.due_date);
      const now = new Date();

      return (
        bill.status !== "paid" &&
        ((date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()) ||
          date < now)
      );
    })
    .reduce((sum, bill) => sum + bill.amount, 0);
// ------------------------------------------ //

// -------------- useEffect hooks -------------- // 
  useEffect(() => {
    const saved = localStorage.getItem("focusMode");
    if (saved !== null) {
      setFocusMode(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("focusMode", JSON.stringify(focusMode));
  }, [focusMode, mounted]);

  useEffect(() => {
    fetchBills();
  }, [refreshKey]);

  useEffect(() => {
    setPage(1);
  }, [showPaid]);
// ------------------------------------------ //

// ------------------- data layer from Supabase ---------------- //
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

  async function toggleStatus(bill: Bill) {
    if (loadingIds.has(bill.id)) return;

    setLoadingIds((prev) => new Set(prev).add(bill.id));

    try {
      const playSound = () => {
        const audio = new Audio("/sounds/paid.mp3");
        audio.play();
      };

      const newStatus = bill.status === "paid" ? "unpaid" : "paid";

      const { error } = await supabase
        .from("bills")
        .update({ status: newStatus })
        .eq("id", bill.id);

      if (error) {
        alert(error.message);
        return;
      }

      if (
        bill.status === "unpaid" &&
        newStatus === "paid" &&
        bill.frequency !== "one-time"
      ) {
        playSound();

        const nextDueDate = getNextDueDate(bill.due_date, bill.frequency);

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
    } finally {
      setLoadingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(bill.id);
        return copy;
      });
    }
  }
// ------------------------------------------ //

// -------------- more helper functions -------------- //
  function isOverdue(bill: Bill) {
    return bill.status !== "paid" && new Date(bill.due_date) < new Date();
  }

  function getBorderClass(bill: Bill) {
    if (bill.status === "paid") return "border-3 border-green-300";
    if (isOverdue(bill)) return "border-3 border-red-300";
    return "";
  }

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }
// ---------------------------- //
 
// -------------- component’s render output -------------- //
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
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowPaid(!showPaid)}
            className="w-[170px] px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-sm"
          >
            {showPaid ? "Upcoming Bills" : "Recently Paid"}
          </button>

          <button
            onClick={() => setFocusMode((prev) => !prev)}
            className={`w-[140px] px-4 py-2 text-sm rounded-lg transition shadow-sm
              ${
                focusMode
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }
              hover:opacity-80
            `}
          >
            {focusMode ? "Focus On" : "Toggle Focus"}
          </button>
        </div>

        {!showPaid && (
          <div className="flex justify-center">
            <div className="bg-white border rounded-xl px-4 py-3 shadow-sm text-center">
              <p className="text-sm text-gray-500">This Month Unpaid Total</p>
              <p className="text-xl font-semibold text-gray-900">
                ${thisMonthUnpaidTotal.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {filteredBills.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No bills found</p>
        ) : (
          <div className="space-y-3">
            {filteredBills.map((bill) =>
              showPaid ? (
                <div
                  key={bill.id}
                  className="border rounded-lg px-4 py-2 bg-white w-full max-w-2xl mx-auto"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900">
                      {truncateName(bill.name)}
                    </p>

                    <div className="flex items-center gap-4">
                      <p className="text-gray-700">
                        <span>
                          <span className="sm:hidden">
                            ${truncateAmount(bill.amount)}
                          </span>
                          <span className="hidden sm:inline">
                            ${bill.amount.toFixed(2)}
                          </span>
                        </span>
                      </p>

                      <p className="text-sm text-gray-500">
                        {formatDate(bill.due_date)}
                      </p>

                      <button
                        onClick={() => toggleStatus(bill)}
                        disabled={loadingIds.has(bill.id)}
                        className="text-xs px-2 py-1 rounded-md text-white
  bg-gradient-to-r from-sky-400 to-indigo-500
  hover:from-sky-300 hover:to-purple-500
  transition-all duration-300
  disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Undo
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={bill.id}
                  className={`border rounded-xl p-4 flex flex-col gap-1 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg w-full max-w-2xl mx-auto
        ${getBorderClass(bill)}
        ${
          focusMode && isNextMonth(bill.due_date)
            ? "bg-gray-50 opacity-60 grayscale"
            : "bg-white"
        }
      `}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-gray-900 tracking-tight">
                      {truncateName(bill.name)}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleStatus(bill)}
                        disabled={loadingIds.has(bill.id)}
                        className="text-sm px-3 py-1 rounded-md text-white
            bg-gradient-to-r from-sky-400 to-indigo-500
            hover:from-sky-300 hover:to-purple-500
            transition-all duration-300
            shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
            hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      Due: {formatDate(bill.due_date)}
                    </p>
                    <span>
                      {isOverdue(bill) && (
                        <p className="text-xs text-red-500 font-medium">
                          Overdue
                        </p>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {bill.frequency}
                  </p>
                </div>
              ),
            )}
          </div>
        )}

        {!showPaid && filteredBills.length > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`text-sm px-3 py-1 rounded-md transition-all duration-300 shadow-md hover:scale-105 disabled:cursor-not-allowed ${
                page === 1
                  ? "bg-gray-300 text-gray-500 shadow-none"
                  : "text-white bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              }`}
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">Page {page}</span>

            <button
              onClick={() =>
                setPage((p) => (unpaidBills.length > p * pageSize ? p + 1 : p))
              }
              disabled={unpaidBills.length <= page * pageSize}
              className={`text-sm px-3 py-1 rounded-md transition-all duration-300 shadow-md hover:scale-105 disabled:cursor-not-allowed ${
                unpaidBills.length <= page * pageSize
                  ? "bg-gray-300 text-gray-500 shadow-none"
                  : "text-white bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
// ---------------------------- //
// ---------------------------- //