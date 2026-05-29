"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Bill = {
  id: string;
  name: string;
  amount: number;
  due_day: number;
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
  }, []);

  return (
    <div>
      <h2>Your Bills</h2>

      {bills.map((bill) => (
        <div key={bill.id}>
          <p>{bill.name}</p>
          <p>${bill.amount}</p>
          <p>Due: {bill.due_day}</p>
          <p>{bill.frequency}</p>
          <button onClick={() => deleteBill(bill.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
