import Link from "next/link";
import { LuUserPlus, LuUserCog, LuPackagePlus, LuPackageSearch, LuPackageOpen } from "react-icons/lu";
import { CustomerForm } from "./customerForm";
import { PackageForm } from "./packageForm";
import { createCustomer, createPackage, getCustomers } from "../actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendEmail } from "../actions";
import MailSender from "./components/MailSender";


async function getData() {
  const res = await getCustomers();
  const data = await res.json();
  const returnedData: any[] = []
  data.data.map((singleData: any) => {
    returnedData.push(singleData);
  }) 


   
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const returned = returnedData.map((result: { signup_date: any; account_number: any; first_name: any; last_name: any; phone_number: any; email_address: any; physical_address: any; total_weight_shipped: any; package_count: any; id: any;}) => ({
    signup_date: result.signup_date.toLocaleString(),
    account_number: result.account_number,
    first_name: result.first_name,
    last_name: result.last_name,
    full_name: result.first_name + " " + result.last_name,
    phone_number: result.phone_number,
    email_address: result.email_address,
    physical_address: result.physical_address,
    total_weight_shipped: result.total_weight_shipped,
    package_count: result.package_count,
    id: result.id,
  }))
 
  return returned
}

export default async function Home() {

  const userType = "admin";

  

  const customerData = await getData();

  return (
    <main className="flex">
        <div className="leftSide p-5 w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle>Dorwin Kingston</CardTitle>
                    <CardDescription>Admin/Owner</CardDescription>
                </CardHeader>
            </Card>
        </div>
        <div className="rightSide p-5 w-3/3">
          <div className="dashboard-tiles flex flex-row gap-3 ">
              <Dialog>
                <DialogTrigger>
                  <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                      <CardHeader className="flex flex-row gap-4 items-center">
                            <LuUserPlus size={24}/>
                            Add New Customer
                      </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      <CustomerForm createCustomer={createCustomer}></CustomerForm>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                    <CardHeader className="flex flex-row gap-4 items-center">
                          <LuUserPlus size={24}/>
                          Add New User
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Form will be placed here. Logic already written.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger>
                  <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                    <CardHeader className="flex flex-row gap-4 items-center">
                          <LuPackagePlus size={24} />
                          Add New Package
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Package</DialogTitle>
                    <DialogDescription>
                      <PackageForm createPackage={createPackage} customers={customerData}></PackageForm>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="dashboard-tiles flex flex-row gap-3 mt-5">
              <Link href={"/workspace/history"}>
                <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                    <CardHeader className="flex flex-row gap-4 items-center">
                        <LuPackageSearch size={24} />
                        Shipping History
                    </CardHeader>
                </Card>
              </Link>
              
              <Link href={"/workspace/pending"}>
                <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                    <CardHeader className="flex flex-row gap-4 items-center">
                        <LuPackageOpen size={24} />
                        Pending Shipments
                    </CardHeader>
                </Card>
              </Link>
              
              <Link href={"/workspace/customers"}>
                <Card className="hover:cursor-pointer hover:shadow-md hover:duration-100">
                    <CardHeader className="flex flex-row gap-4 items-center">
                        <LuUserCog size={24} />
                        View Customers
                    </CardHeader>
                </Card>
              </Link>
            </div>
            <div className="test-buttons mt-5">
              <MailSender />
            </div>
            
        </div>

    </main>
  );
}
