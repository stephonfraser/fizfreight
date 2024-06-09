import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { LuUserPlus, LuUserCog, LuPackagePlus, LuPackageSearch, LuPackageOpen } from "react-icons/lu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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




export default function Home() {

  const userType = "admin";

  return (
    <main className="flex">
        <div className="leftSide p-5 w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle>Dorwin Kingston</CardTitle>
                    <CardDescription>Admin/Owner</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Add Details Here</p>
                </CardContent> */}
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
                      Form will be placed here. Logic already written.
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
                      Form will be placed here. Logic already written.
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
            
        </div>

    </main>
  );
}
