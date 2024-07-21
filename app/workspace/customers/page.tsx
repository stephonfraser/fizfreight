import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import { Customer, columns } from "./columns"
import { DataTable } from "./data-table"
import { headers } from "next/headers";
import { getCustomers } from "@/app/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


// export const runtime = 'edge';

async function getData(link: any): Promise<Customer[]> {
  const res = await getCustomers();
  const data = await res.json();
  // console.log("Data is now: ", data);
  const returnedData: any[] = []
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 

  // console.log("Returned Data is now: ", returnedData)

   
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const returned: Customer[] = returnedData.map((result: { signup_date: any; account_number: any; first_name: any; last_name: any; phone_number: any; email_address: any; physical_address: any; total_weight_shipped: any; package_count: any; id: any;}) => {
    const signup = new Date(result.signup_date);
    const formattedSignup = signup.toLocaleDateString();
    return ({
    signup_date: formattedSignup,
    account_number: result.account_number,
    first_name: result.first_name,
    last_name: result.last_name,
    phone_number: result.phone_number,
    email_address: result.email_address,
    physical_address: result.physical_address,
    total_weight_shipped: result.total_weight_shipped,
    package_count: result.package_count,
    id: result.id,
  })})
 
  return returned
}



export default async function Home() {

  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  const link = headersList.get('x-url') || "";

  console.log("Domain is: ", domain);

  const data = await getData(domain)
  // console.log("Pulled Data: ", data);

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
                  <BreadcrumbPage>View Customers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="controls flex items-center gap-2 my-5">
                <Link href="/workspace">
                    <LuArrowBigLeft size={42}/>
                </Link>
                <div className="page-title text-[30px]">
                    All Customers
                </div>
            </div>
            
            <DataTable columns={columns} data={data} />
        </div>

    </main>
  );
}
function getUrl(arg0: { req: import("http").IncomingMessage | undefined; }) {
  throw new Error("Function not implemented.");
}

