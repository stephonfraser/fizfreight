"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Customer = {
  first_name: any
  last_name: any
  phone_number: any
  email_address: any
  signup_date: any
  physical_address: any
  total_weight_shipped: any
  package_count: any
  account_number: any
  id: any
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "email_address",
    header: "Email Address",
  },
  {
    accessorKey: "signup_date",
    header: "Sign Up Date",
  },
  {
    accessorKey: "physical_address",
    header: "Physical Address",
  },
  {
    accessorKey: "total_weight_shipped",
    header: "Total Weight Shipped",
  },
  {
    accessorKey: "package_count",
    header: "Package Count",
  },
  {
    accessorKey: "id",
    header: "ID",
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

