
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
    const { rows } = await sql`SELECT * from customers`;
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>All Customers</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Physical Address</TableHead>
                <TableHead>Total Weight Shipped</TableHead>
                <TableHead>Package Count</TableHead>
                {/* <TableHead>Delivery Date</TableHead> */}
                {/* <TableHead>Shipped Date</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.account_number}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.phone_number}</TableCell>
                    <TableCell>{row.email_address}</TableCell>
                    <TableCell>{row.physical_address}</TableCell>
                    <TableCell>{row.total_weight_shipped}</TableCell>
                    <TableCell>{row.package_count}</TableCell>
                    {/* <TableCell>{row.delivery_date}</TableCell> */}
                    {/* <TableCell>{row.shipped_date}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    </Table>

    </div>
  )
}