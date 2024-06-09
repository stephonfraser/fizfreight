
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

    console.log(rows);
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>All Customers</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Sign Up Date</TableHead>
                <TableHead className="w-[100px]">Account Number</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Physical Address</TableHead>
                {/* <TableHead>Delivery Date</TableHead> */}
                {/* <TableHead>Shipped Date</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.account_number}>
                    <TableCell>{row.signup_date.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{row.account_number}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email_address}</TableCell>
                    <TableCell>{row.phone_number}</TableCell>
                    <TableCell>{row.physical_address}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>

    </div>
  )
}