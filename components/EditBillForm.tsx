"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Bill = {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  frequency: string;
  status: "paid" | "unpaid";
};

type Props = {
  bill: Bill;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditBillForm({ bill, onClose, onSuccess }: Props) {
  const supabase = createClient();

  const [name, setName] = useState(bill.name);
  const [amount, setAmount] = useState(bill.amount.toString());
  const [dueDate, setDueDate] = useState(bill.due_date);
  const [frequency, setFrequency] = useState(bill.frequency);

  const [error, setError] = useState("");

  async function handleSubmit() {
    // clear previous error
    setError("");

    // clean validation
    if (!name.trim()) {
      setError("Please enter a bill name");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date");
      return;
    }

    if (!frequency) {
      setError("Please select a billing frequency");
      return;
    }

    const { error } = await supabase
      .from("bills")
      .update({
        name: name.trim(),
        amount: Number(amount),
        due_date: dueDate,
        frequency,
      })
      .eq("id", bill.id);

    if (error) {
      setError(
        "Something went wrong while updating the bill. Please try again.",
      );
      return;
    }

    onSuccess();
  }

  return (
    <div className="text-black fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Edit Bill</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Bill name"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Amount"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="one-time">One Time</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border rounded-lg px-4 py-2">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-black text-white rounded-lg px-4 py-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
