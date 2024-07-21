import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import { History, columns } from "./columns"
import { DataTable } from "./data-table"
import { headers } from "next/headers";
import { getShippingByDate } from "@/app/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import DatepickerButton from "./components/DatepickerButton";
import ShipmentList from "./components/ShipmentList";


async function getData() {
  const res = await getShippingByDate();
  const data = await res.json();
  const returnedData: any[] = []
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 

   
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const returned: any = returnedData.map((result: { delivery_date: any; no_of_shipment: any; id: any;}) => {
    const delivery = new Date(result.delivery_date);
    const forParsing = Date.parse(result.delivery_date);
    const formattedDelivery = delivery.toLocaleDateString();
    return (
      {
        id: result.id,
        delivery_sort: delivery,
        delivery_date_text: formattedDelivery,
        delivery_date: result.delivery_date,
        no_of_shipment: result.no_of_shipment,
        deliveryId: forParsing
      }
    )})
 
  return returned
}



export default async function Home() {
  const data = await getData();
  const sortedData = data.sort(function(a:any, b:any) {
    return b.delivery_sort - a.delivery_sort
  })
  console.log("Pulled Data: ", sortedData);

  

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
                  <BreadcrumbPage>Shipping History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="controls flex items-center gap-2 my-5">
                <Link href="/workspace">
                    <LuArrowBigLeft size={42}/>
                </Link>
                <div className="page-title text-[30px]">
                    Shipping History
                </div>
            </div>
            
            <ShipmentList shippingData={sortedData} />
            
        </div>

    </main>
  );
}
