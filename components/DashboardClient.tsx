"use client";

import { useState } from "react";
import AddBillForm from "@/components/AddBillForm";
import BillsList from "@/components/BillsList";

export default function DashboardClient() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: ADD BILL */}
        <div>
          <AddBillForm onSuccess={() => setRefreshKey((k) => k + 1)} />
        </div>

        {/* RIGHT: BILLS LIST */}
        <div>
          <BillsList refreshKey={refreshKey} />
        </div>

      </div>
    </div>
  );
}