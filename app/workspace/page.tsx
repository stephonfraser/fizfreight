import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



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
              <Card className="hover:cursor-pointer">
                  <CardHeader>
                      Add New Customer
                  </CardHeader>
              </Card>
              
              <Card className="hover:cursor-pointer">
                  <CardHeader>
                      Add New User
                  </CardHeader>
              </Card>
              
              <Card className="hover:cursor-pointer">
                  <CardHeader>
                      Add New Package
                  </CardHeader>
              </Card>
            </div>
            <div className="dashboard-tiles flex flex-row gap-3 mt-5">
              <Link href={"/workspace/history"}>
                <Card className="hover:cursor-pointer">
                    <CardHeader>
                        Shipping History
                    </CardHeader>
                </Card>
              </Link>
              
              <Link href={"/workspace/pending"}>
                <Card className="hover:cursor-pointer">
                    <CardHeader>
                        Pending Shipments
                    </CardHeader>
                </Card>
              </Link>
              
              <Link href={"/workspace/pending"}>
                <Card className="hover:cursor-pointer">
                    <CardHeader>
                        View Customers
                    </CardHeader>
                </Card>
              </Link>
            </div>
            
        </div>

    </main>
  );
}
