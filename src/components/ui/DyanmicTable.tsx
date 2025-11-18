"use client";
import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

export interface TableAction {
  label: string;
  onClick: (row: Record<string, any>, index: number) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export type TableSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DynamicTableProps {
  data: Record<string, any>[];
  actions?: TableAction[];
  excludeColumns?: string[];
  pagination?: boolean;
  size?: TableSize;
  columns?: ColumnDef<Record<string, any>>[];
  virtualize?: boolean; // Added virtualization prop for large datasets
}

const LazyImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`${className} ${
        !isLoaded ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
    />
  );
};

const sizeConfig = {
  sm: {
    headerPadding: "px-2 py-2",
    cellPadding: "px-2 py-2",
    headerText: "text-xs",
    cellText: "text-xs",
    inputSize: "text-xs",
  },
  md: {
    headerPadding: "px-3 py-3",
    cellPadding: "px-3 py-3",
    headerText: "text-sm",
    cellText: "text-sm",
    inputSize: "text-sm",
  },
  lg: {
    headerPadding: "px-4 py-4",
    cellPadding: "px-4 py-4",
    headerText: "text-base",
    cellText: "text-base",
    inputSize: "text-base",
  },
  xl: {
    headerPadding: "px-6 py-5",
    cellPadding: "px-6 py-5",
    headerText: "text-lg",
    cellText: "text-lg",
    inputSize: "text-lg",
  },
  full: {
    headerPadding: "px-8 py-6",
    cellPadding: "px-8 py-6",
    headerText: "text-xl",
    cellText: "text-xl",
    inputSize: "text-xl",
  },
};

export function DynamicTable({
  data = [],
  actions = [],
  excludeColumns = [],
  pagination = false,
  size = "md",
  columns: customColumns = [],
  virtualize = false, // Added virtualize prop with default false
}: DynamicTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const config = sizeConfig[size];

  const formatHeader = (text: string) => {
    return text
      .replace(/([_-])/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const columns: ColumnDef<Record<string, any>>[] = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const headers = Object.keys(data[0] || {}).filter(
      (key) => !excludeColumns.includes(key)
    );

    const customColumnMap = new Map(
      (customColumns || []).map((col) => {
        const key = (col as any).accessorKey || (col as any).id;
        return [key, col];
      })
    );

    const generatedColumns = headers.map((header) => {
      const customCol = customColumnMap.get(header);

      if (customCol) {
        return customCol;
      }

      return {
        accessorKey: header,
        header: formatHeader(header),
        cell: (info: any) => formatValue(info.getValue()),
        enableSorting: true,
      };
    });

    return generatedColumns;
  }, [customColumns, data, excludeColumns]);

  const columnsWithActions = useMemo(() => {
    const cols = [...columns];
    if (actions && actions.length > 0) {
      cols.push({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const rowIndex = info.row.index;
          const row = info.row.original;

          return actions.length === 1 ? (
            <Button
              variant={actions[0].variant || "outline"}
              size="sm"
              onClick={() => actions[0].onClick(row, rowIndex)}
            >
              {actions[0].label}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map((action, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    onClick={() => action.onClick(row, rowIndex)}
                  >
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      } as ColumnDef<Record<string, any>>);
    }
    return cols;
  }, [columns, actions]);

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(pagination &&
      !virtualize && { getPaginationRowModel: getPaginationRowModel() }),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: "auto",
  });

  useEffect(() => {
    if (pagination && !virtualize) {
      table.setPageSize(10);
    }
  }, [pagination, virtualize, table]);

  const { rows } = table.getRowModel();
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => null,
    estimateSize: () => 50,
    overscan: 10,
    enabled: virtualize,
  });

  const virtualRows = virtualize ? virtualizer.getVirtualItems() : [];
  const totalSize = virtualize ? virtualizer.getTotalSize() : 0;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <div className="text-center">
          <p className="font-medium">No data available</p>
          <p className="text-sm">Please provide data to display the table</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={`max-w-sm ${config.inputSize}`}
        />
        {globalFilter && (
          <Button variant="ghost" size="sm" onClick={() => setGlobalFilter("")}>
            Clear
          </Button>
        )}
      </div>

      <div
        className={`overflow-x-auto rounded-lg border border-border ${
          virtualize ? "h-96 overflow-y-auto" : ""
        }`}
      >
        <Table>
          <TableHeader
            className={virtualize ? "sticky top-0 z-10 bg-background" : ""}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-semibold ${config.headerPadding} ${config.headerText}`}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer select-none"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <ArrowUp className="h-4 w-4" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {!header.column.getIsSorted() && (
                          <ArrowUpDown className="h-4 w-4 opacity-40" />
                        )}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {virtualize ? (
              <>
                {paddingTop > 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columnsWithActions.length}
                      style={{ height: `${paddingTop}px` }}
                    />
                  </TableRow>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={`${config.cellPadding} ${config.cellText}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                {paddingBottom > 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columnsWithActions.length}
                      style={{ height: `${paddingBottom}px` }}
                    />
                  </TableRow>
                )}
              </>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${config.cellPadding} ${config.cellText}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && !virtualize && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
            total results)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { LazyImage };
