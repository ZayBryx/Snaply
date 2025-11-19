"use client";

import React from "react";
import { DynamicTable, type TableAction } from "@/components/ui/DyanmicTable";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "@/lib/axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { addContentCalendar } from "@/api/content-calendar";

export interface IBusiness {
  business__id: string;
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
  const handleAddContenCalendar = async (row: any) => {
    try {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we populate the content pillar.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const content_calendar = await addContentCalendar(row.original._id);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: content_calendar.data[0].message,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const business: TableAction[] = [
    {
      label: "Edit",
      onClick: (row) => alert(`Edit product: ${row._id}`),
    },
    {
      label: "View",
      onClick: (row) => alert(`View product: ${row._id}`),
    },
    {
      label: "Delete",
      onClick: (row) => alert(`Delete product: ${row._id}`),
      variant: "destructive",
    },
    {
      label: "Populate Content Pillar",
      onClick: async (row) => {
        try {
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we populate the content pillar.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await axios.post("/populate-content-pillar", {
            business_account_id: row._id,
          });

          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data[0].message,
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || error.message,
          });
        }
      },
    },
  ];

  const businessColumns = [
    {
      header: "Content Calendar",
      accessorKey: "content_calendar_url",
      cell: ({ row }: any) => (
        <>
          {row.original.content_calendar_url ? (
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="underline hover:scale-105 text-blue-500 font-bold"
              href={row.original.content_calendar_url}
            >
              Content Calendar URL
            </Link>
          ) : (
            <Button
              onClick={() => handleAddContenCalendar(row)}
              size="sm"
              className="hover:cursor-pointer"
            >
              Add 📅
            </Button>
          )}
        </>
      ),
    },
    {
      header: "Dashboard URL",
      accessorKey: "dashboard_url",
      cell: ({ row }: any) => (
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="underline hover:scale-0 text-blue-500 font-bold"
          href={row.original.dashboard_url || "#"}
        >
          Dashboard URL
        </Link>
      ),
    },
    {
      header: "Brand Voice",
      accessorKey: "brand_voice",
      cell: ({ row }: any) => (
        <div className="flex flex-wrap gap-1">
          {row.original.brand_voice.map((voice: string, index: number) => (
            <Badge key={index}>{voice}</Badge>
          ))}
        </div>
      ),
    },
    {
      header: "vps",
      accessorKey: "vps",
      cell: ({ row }: any) => (
        <Tooltip>
          <TooltipTrigger>
            <div className="truncate max-w-[200px]" title={row.original.vps}>
              {row.original.vps}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {row.original.vps.length > 50 ? (
                <>
                  {row.original.vps.slice(0, 50)}
                  <br />
                  {row.original.vps.slice(50)}
                </>
              ) : (
                row.original.vps
              )}
            </p>
          </TooltipContent>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <DynamicTable
        data={data}
        size="sm"
        actions={business}
        excludeColumns={["_id"]}
        columns={businessColumns}
        pagination={true}
      />
    </div>
  );
};

export default BusinessTable;
