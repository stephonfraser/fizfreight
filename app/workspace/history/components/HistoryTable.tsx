
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { QueryResultRow, sql } from "@vercel/postgres";

async function getData() {
  const res = await fetch('http://localhost:3000/api/select-shipment-history')
  // console.log(res.json());
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

 
export async function HistoryTable() {
    const { rows } = await sql`SELECT * from packages`;
    const data:any[] = [];
    rows.map((row) => {
      data.push(row);
    })
    console.log(data[1].shipped_date);
    // const data = getData();
    // console.log(rows);
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Shipping History</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Shipment Date</TableHead>
                <TableHead>Warehouse ID</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                {/* <TableHead>Delivery Date</TableHead> */}
                {/* <TableHead>Shipped Date</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((data) => (
                <TableRow key={data.id}>
                    <TableCell>{data.shipped_date.toLocaleString()}</TableCell>
                    <TableCell>{data.warehouse_id}</TableCell>
                    <TableCell>{data.tracking_number}</TableCell>
                    <TableCell>{data.weight}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.vendor}</TableCell>
                    {/* <TableCell>{row.delivery_date}</TableCell> */}
                    {/* <TableCell>{row.shipped_date}</TableCell> */}
                </TableRow>
            ))}
        </TableBody>
    </Table>

    </div>
  )
}