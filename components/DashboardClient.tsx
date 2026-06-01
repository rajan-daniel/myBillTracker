"use client";

import { useState } from "react";
import AddBillForm from "@/components/AddBillForm";
import BillsList from "@/components/BillsList";

export default function DashboardClient() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <AddBillForm onSuccess={() => setRefreshKey((k) => k + 1)} />
      <BillsList refreshKey={refreshKey} />
    </>
  );
}