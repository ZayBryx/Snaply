"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";
import { Badge } from "../ui/badge";

const AffiliateTable = ({ affiliates }: any) => {
  const affiliatesAction: TableAction[] = [
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

  const affiliateColumns = [
    {
      header: "coupon_codes",
      accessorKey: "coupon_codes",
      cell: ({ row }: any) => (
        <ul>
          {row.original.coupon_codes && row.original.coupon_codes.length > 0 ? (
            row.original.coupon_codes.map((code: string, index: number) => (
              <div key={index} className="flex flex-col">
                <Badge className="mr-1 mb-1">{code}</Badge>
              </div>
            ))
          ) : (
            <li>No Coupons</li>
          )}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <DynamicTable
        data={affiliates}
        excludeColumns={[
          "_id",
          "role",
          "__v",
          "announcement",
          "mop",
          "payout",
          "createdAt",
          "updatedAt",
          "first_name",
          "last_name",
          "registered",
        ]}
        size="md"
        actions={affiliatesAction}
        columns={affiliateColumns}
        pagination={true}
      />
    </div>
  );
};

export default AffiliateTable;
