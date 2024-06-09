
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
        <TableCaption>Pending Shipments</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[200px]">Delivery Date</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                {/* <TableHead>Delivery Date</TableHead> */}
                <TableHead>Shipment Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.delivery_date.toLocaleString()}</TableCell>
                    <TableCell>{row.tracking_number}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.vendor}</TableCell>
                    <TableCell>{row.shipped_date.toLocaleString()}</TableCell>
                    {/* <TableCell>{row.delivery_date}</TableCell> */}
                    {/* <TableCell>{row.shipped_date}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    </Table>

    </div>
  )
}