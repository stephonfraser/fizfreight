"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import WarehouseReceipt from "../../components/WarehouseReceipt"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type History = {
  shipped_date: any
  customer: string
  warehouse_id: any
  tracking_number: any
  weight: any
  description: any
  vendor: any
  delivery_date: any
}

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "shipped_date",
    header: "Shipment Date",
  },
  {
    accessorKey: "delivery_date",
    header: "Delivery Date"
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
  {
    accessorKey: "warehouse_id",
    header: "Warehouse ID",
  },
  {
    accessorKey: "tracking_number",
    header: "Tracking Number",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const warehouse = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(warehouse.warehouse_id)}
            >
              Copy Warehouse ID
            </DropdownMenuItem>
            <DropdownMenuItem>
            </DropdownMenuItem>
              <Dialog>
                <DialogTrigger>
                  View Warehouse Receipt
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-11/12 overflow-y-scroll max-h-screen">
                    <WarehouseReceipt />
                </DialogContent>
              </Dialog>
            <DropdownMenuSeparator />
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ]

