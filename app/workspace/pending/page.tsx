
import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import { History, columns } from "./columns"
import { DataTable } from "./data-table"
import { headers } from "next/headers";
import { getShippingHistory, getCustomers } from "@/app/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



async function getData( ): Promise<History[]> {
  const res = await getShippingHistory();
  const data = await res.json();
  const returnedData: any[] = []
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 

  const cusRes = await getCustomers();
  const cusData = await cusRes.json();
  const returnedCustomer: any[] = []
  cusData.data.map((singleData: any) => {
    returnedCustomer.push(singleData);
  })

  const currentDate = new Date();
  console.log("Current Date: ", currentDate);

  const pendingShipments: any = returnedData.filter((item) => {
    let itemDate = new Date(item.delivery_date);
    console.log(itemDate);
    return itemDate > currentDate;
  });

  console.log("Pending List: ", pendingShipments);


   
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const returned: History[] = returnedData.map((result: { customer_id: any, shipped_date: any; warehouse_id: any; tracking_number: any; weight: any; description: any; vendor: any; }) => {
    const customerData = returnedCustomer.find((customer) => customer.id == result.customer_id)
    const customerName = customerData.first_name + " " + customerData.last_name;
    const shipped = new Date(result.shipped_date);
    const formattedShipped = shipped.toLocaleDateString();
    return (
    {
    customer: customerName,
    shipped_date: formattedShipped,
    warehouse_id: result.warehouse_id,
    tracking_number: result.tracking_number,
    weight: result.weight,
    description: result.description,
    vendor: result.vendor
  })})
 
  return returned
}


export default async function Home() {
  const data = await getData()
  return (
    <main className="flex w-full">
        <div className="p-5 w-full">
          <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/workspace">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pending Shipments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="controls flex items-center gap-2 my-5">
                <Link href="/workspace">
                    <LuArrowBigLeft size={42}/>
                </Link>
                <div className="page-title text-[30px]">
                    Pending Shipments
                </div>
            </div>
            <DataTable columns={columns} data={data} />
            {/* <HistoryTable /> */}
        </div>

    </main>
  );
}
