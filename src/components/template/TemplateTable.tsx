"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";

export interface ITemplate {
  content_pillar: string;
  templates: string[];
  html?: string | null;
  url?: string | null;
  type: "solid" | "overlay" | "glass";
  isPremium: boolean;
  hasFooter: boolean;
}

interface TemplateTableProp {
  data: ITemplate[];
}

const TemplateTable = ({ data }: TemplateTableProp) => {
  const templateActions: TableAction[] = [
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
        size="md"
        actions={templateActions}
        excludeColumns={["templates", "_id", "html"]}
      />
    </div>
  );
};

export default TemplateTable;
