"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";

export interface IBusiness {
  business_name: string;
  business_email: string;
  vps: string;
  services?: string[];
  content_language?: string | null;
  niche?: string | null;
  industry?: string | null;
  content_calendar_url?: string;
  dashboard_url?: string;
  logo?: string | null;
  accent_color?: string | null;
  primary_color?: string | null;
  font?: string | null;
  brand_voice?: string | null;
}

interface BusinessTableProp {
  data: IBusiness[];
}

const BusinessTable = ({ data }: BusinessTableProp) => {
  const business: TableAction[] = [
    {
      label: "Edit",
      onClick: (row) => alert(`Edit product: ${row.name}`),
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
        data={data}
        size="sm"
        actions={business}
        excludeColumns={["_id"]}
      />
    </div>
  );
};

export default BusinessTable;
