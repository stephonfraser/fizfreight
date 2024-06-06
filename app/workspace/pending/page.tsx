import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { LuArrowBigLeft } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HistoryTable } from "./components/HistoryTable";



export default async function Home() {

  return (
    <main className="flex w-full">
        <div className="p-5 w-full">
            <div className="controls flex items-center gap-2 my-5">
                <Link href="/workspace">
                    <LuArrowBigLeft size={42}/>
                </Link>
                <div className="page-title text-[30px]">
                    Pending Shipments
                </div>
            </div>
            
            <HistoryTable />
        </div>

    </main>
  );
}
