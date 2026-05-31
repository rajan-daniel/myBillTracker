"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddBillForm() {
  const supabase = createClient();

  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [frequency, setFrequency] = useState("monthly");

  const steps = ["Name", "Amount", "Due Date", "Frequency"];

  function nextStep() {
    setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase.from("bills").insert({
      user_id: user.id,
      name,
      amount: Number(amount),
      due_date: dueDate,
      frequency,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // reset
    setName("");
    setAmount("");
    setDueDate("");
    setFrequency("monthly");
    setStep(0);

    alert("Bill added!");
  }

  return (
    <main className="flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Bill
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Step {step + 1} of {steps.length}
          </p>

          <div className="h-1 bg-gray-200 rounded mt-3 overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1 - Name */}
        {step === 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              Bill Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="e.g. Rent, Netflix"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* STEP 2 - Amount */}
        {step === 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="e.g. 50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}

        {/* STEP 3 - Date */}
        {step === 2 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        )}

        {/* STEP 4 - Frequency */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              Frequency
            </label>

            <select
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
              <option value="one-time">One Time</option>
            </select>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div className="flex justify-between pt-2">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-4 py-2 text-sm rounded-lg border disabled:opacity-40"
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Add Bill
            </button>
          )}
        </div>
      </div>
    </main>
  );
}