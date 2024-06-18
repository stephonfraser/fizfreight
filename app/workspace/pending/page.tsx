
import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { History, columns } from "./columns"
import { DataTable } from "./data-table"
import { headers } from "next/headers";


async function getData( link: any ): Promise<History[]> {
  let starter = "";
  if (link == "localhost:3000") {
    starter = "http://"
  } else {
    starter = "https://"
  }
  const res = await fetch(`${starter}${link}/api/select-pending-shipment`,  { next: { revalidate: 5 }, cache: 'no-store'})
  console.log("Got response: ", res);
  const data = await res.json();
  console.log("Data is now: ", data);
  const returnedData: any[] = []
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 

  console.log("Returned Data is now: ", returnedData)

   
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const returned: History[] = returnedData.map((result: { shipped_date: any; warehouse_id: any; tracking_number: any; weight: any; description: any; vendor: any; }) => ({
    shipped_date: result.shipped_date.toLocaleString(),
    warehouse_id: result.warehouse_id,
    tracking_number: result.tracking_number,
    weight: result.weight,
    description: result.description,
    vendor: result.vendor
  }))
 
  return returned
}


export default async function Home() {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const data = await getData(domain)
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
