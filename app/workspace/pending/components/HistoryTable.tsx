
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { sql } from "@vercel/postgres";


 
export async function HistoryTable() {
    const { rows } = await sql`SELECT * from packages`;
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Shipping History</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Warehouse ID</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Vendor</TableHead>
                {/* <TableHead>Delivery Date</TableHead> */}
                {/* <TableHead>Shipped Date</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.customer_id}</TableCell>
                    <TableCell>{row.warehouse_id}</TableCell>
                    <TableCell>{row.tracking_number}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.vendor}</TableCell>
                    {/* <TableCell>{row.delivery_date}</TableCell> */}
                    {/* <TableCell>{row.shipped_date}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    </Table>

    </div>
  )
}