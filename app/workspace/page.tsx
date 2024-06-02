import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function Home() {

  return (
    <main className="flex">
        <div className="leftSide p-5 w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle>Dorwin Kingston</CardTitle>
                    <CardDescription>Admin/Owner</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Add Details Here</p>
                </CardContent>
            </Card>
        </div>
        <div className="rightSide p-5 w-3/3">
            Hello World
        </div>

    </main>
  );
}
