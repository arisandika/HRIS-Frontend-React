import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Columns3, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const DataTable = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [departments, setDepartments] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [orderBy, setOrderBy] = useState({
    sortBy: "created_at",
    sortOrder: "asc",
  });

  const fetchDataDepartments = async () => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await api.get("/api/admin/departments", {
          params: {
            page,
            limit,
            sortBy: orderBy.sortBy,
            sortOrder: orderBy.sortOrder,
          },
        });

        setDepartments(response.data.data);
        setTotalData(response.data.total_data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Token not found");
    }
  };

  useEffect(() => {
    fetchDataDepartments();
  }, [page, orderBy]);

  const handleSortingChange = (column) => {
    setOrderBy((prevSorting) => ({
      sortBy: column,
      sortOrder: prevSorting.sortOrder === "asc" ? "desc" : "asc",
    }));

    console.log("Sorting changed:", orderBy);
  };

  const columns = [
    {
      id: "no",
      header: () => (
        <Button
          variant="thead"
          className="px-0"
          onClick={() => handleSortingChange("id")}
        >
          No
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const index = (page - 1) * limit + row.index + 1;
        return orderBy.sortOrder === "asc" ? index : totalData - index + 1;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="thead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="thead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleDetail(row.original)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: departments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleEdit = (user) => {
    console.log("Edit:", user);
  };

  const handleDetail = (user) => {
    console.log("Detail:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete:", user);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between pb-4 space-x-2">
          <Input
            placeholder="Search department name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Columns3 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end pt-4 space-x-2">
          <span className="flex-1 text-sm text-muted-foreground">
            Showing {Math.min((page - 1) * limit + 1, totalData)} to{" "}
            {Math.min(page * limit, totalData)} of {totalData} entries
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= Math.ceil(totalData / limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
