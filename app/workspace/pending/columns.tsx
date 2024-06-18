"use client"

import { ColumnDef } from "@tanstack/react-table"

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
  customer: any
  warehouse_id: any
  tracking_number: any
  weight: any
  description: any
  vendor: any
}

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "shipped_date",
    header: "Shipment Date",
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
  }

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

