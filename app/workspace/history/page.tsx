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
    const forParsing = Date.parse(result.delivery_date)
    const formattedDelivery = delivery.toLocaleDateString();
    return (
      {
        id: result.id,
        delivery_date_text: formattedDelivery,
        delivery_date: result.delivery_date,
        no_of_shipment: result.no_of_shipment,
        deliveryId: forParsing
      }
    )})
 
  return returned
}



export default async function Home() {
  const data = await getData()
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
            <div className="grid grid-flow-row grid-cols-4 gap-4">
              {data.map((result: any)=> (
                <Card key={result.id}>
                  <CardHeader>
                    <CardTitle>{result.delivery_date_text}</CardTitle>
                    <CardDescription>{result.no_of_shipment} shipment(s).</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/workspace/history/${result.deliveryId}`}>
                      <Button className="w-full">
                        <CheckIcon className="mr-2 h-4 w-4" /> View Shipments
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
        </div>

    </main>
  );
}
