"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";
import { Badge } from "../ui/badge";

const PaymentsTable = ({ payments }: any) => {
  const paymentsAction: TableAction[] = [
    {
      label: "Edit",
      onClick: (row) => alert(`Edit product: ${row.name}`),
    },
    {
      label: "View",
      onClick: (row) => alert(`View product: ${row.name}`),
    },
    {
      label: "Delete",
      onClick: (row) => alert(`Delete product: ${row.name}`),
      variant: "destructive",
    },
  ];

  return (
    <div>
      <DynamicTable
        data={payments}
        excludeColumns={["_id", "role", "__v", "createdAt", "updatedAt"]}
        size="md"
        actions={paymentsAction}
        pagination={true}
      />
    </div>
  );
};

export default PaymentsTable;
