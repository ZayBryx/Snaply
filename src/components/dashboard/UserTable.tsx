"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  plan?: string;
  country?: string;
  timezone?: string;
  business_accounts?: { _id: string; business_name: string }[]; // array
}

interface UserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: UserTableProps) => {
  const userActions: TableAction[] = [
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
        data={users}
        excludeColumns={["_id", "role", "__v", "business_accounts"]}
        size="md"
        actions={userActions}
      />
    </div>
  );
};

export default UserTable;
