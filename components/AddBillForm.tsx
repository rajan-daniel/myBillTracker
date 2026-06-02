"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddBillForm({ onSuccess }: { onSuccess?: () => void }) {
  const supabase = createClient();

  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [frequency, setFrequency] = useState("monthly");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const steps = ["Name", "Amount", "Due Date", "Frequency"];

  function validateStep() {
    if (step === 0 && !name.trim()) {
      setError("Please enter a bill name");
      return false;
    }

    if (step === 1 && !amount) {
      setError("Please enter an amount");
      return false;
    }

    if (step === 2 && !dueDate) {
      setError("Please select a due date");
      return false;
    }

    setError("");
    return true;
  }

  function nextStep() {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  }

  function prevStep() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (step < steps.length - 1) {
      nextStep();
    } else {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    if (!name.trim()) return setError("Name is required");
    if (!amount) return setError("Amount is required");
    if (!dueDate) return setError("Due date is required");

    setError("");
    setSuccess("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in");
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
      setError(error.message);
      return;
    }

    setName("");
    setAmount("");
    setDueDate("");
    setFrequency("monthly");
    setStep(0);

    setSuccess("Bill tracked!");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
    onSuccess?.();
  }

  return (
    <main className="bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[448px] bg-white rounded-2xl shadow-lg p-8 space-y-6 mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Add New Bill</h1>

          <p className="text-sm text-gray-500 mt-1">
            Step {step + 1} of {steps.length}
          </p>

          <div className="h-1 bg-gray-200 rounded mt-3 overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* ERROR / SUCCESS */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {success && (
          <p className="text-sm text-green-600 text-center">{success}</p>
        )}

        {/* STEP 1 */}
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
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="e.g. 50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* STEP 3 */}
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
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              Frequency
            </label>

            <select
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              onKeyDown={handleKeyDown}
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
            className="px-4 py-2 text-sm rounded-lg border text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
