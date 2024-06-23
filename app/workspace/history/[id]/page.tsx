import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import { History, columns } from "./columns";
import { DataTable } from "./data-table"
import { headers } from "next/headers";
import { getCustomers, getShippingHistory } from "@/app/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


async function getData( dateFilter: any ): Promise<History[]> {
  const res = await getShippingHistory();
  const data = await res.json();
  const returnedData: any[] = [];
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 

  const filtered: any = returnedData.filter((result) =>
    (new Date(result.delivery_date)).toLocaleDateString() == dateFilter
  )

  const cusRes = await getCustomers();
  const cusData = await cusRes.json();
  const returnedCustomer: any[] = []
  cusData.data.map((singleData: any) => {
    returnedCustomer.push(singleData);
  })

  console.log("Filtered Dates: ", filtered);

   
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const returned: History[] = filtered.map((result: {
      customer_id: any; shipped_date: any; delivery_date: any; warehouse_id: any; tracking_number: any; weight: any; description: any; vendor: any; 
    }) => {
    const customerData = returnedCustomer.find((customer) => customer.id == result.customer_id)
    const customerName = customerData.first_name + " " + customerData.last_name;
    const shipped = new Date(result.shipped_date);
    const delivery = new Date(result.delivery_date);
    const formattedShipped = shipped.toLocaleDateString();
    const formattedDelivery = delivery.toLocaleDateString();
    return ({
      shipped_date: formattedShipped,
      delivery_date: formattedDelivery,
      customer: customerName,
      warehouse_id: result.warehouse_id,
      tracking_number: result.tracking_number,
      weight: result.weight,
      description: result.description,
      vendor: result.vendor
    })
  })
 
  return returned
}



export default async function Page({params}: { params: { id: any } }) {
  const idNumber = parseInt(params.id);
  const pageId = new Date(idNumber);
  const pageIdFormatted = pageId.toLocaleDateString();
  const data = await getData(pageIdFormatted);
  console.log("Pulled Data: ", data);

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
                  <BreadcrumbLink href="/workspace/history">Shipping History</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Shipping Details for {pageIdFormatted}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="controls flex items-center gap-2 my-5">
                <Link href="/workspace/history">
                    <LuArrowBigLeft size={42}/>
                </Link>
                <div className="page-title text-[30px]">
                    Shipping Details for {pageIdFormatted}
                </div>
            </div>
            <DataTable columns={columns} data={data} />
            {/* <HistoryTable /> */}
        </div>

    </main>
  );
}
