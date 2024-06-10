
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
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

 
export async function HistoryTable() {

    const getCustomerId = async (id: any) => {
      const { rows } = await sql`SELECT * from customers`;
      const foundUser = rows.find((row) => row.id == id);
      if(!foundUser) return console.error("Customer not found!");
      let customerName = foundUser.first_name + " " + foundUser.last_name
      // console.log(customerName);
      return customerName;
    }
    const { rows } = await sql`SELECT * from packages`;
    const data:any[] = [];
    const mappedInfo = rows.map((row) => ({
      id: row.id,
      shipped_date: row.shipped_date,
      customer: getCustomerId(row.id),
      warehouse_id: row.warehouse_id,
      tracking_number: row.tracking_number,
      weight: row.weight,
      description: row.description,
      vendor: row.vendor
    }))
    mappedInfo.map((row) => {
      data.push(row);
    })
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Shipping History</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Shipment Date</TableHead>
                <TableHead>Customer Name</TableHead>
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
                    <TableCell>{data.customer}</TableCell>
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