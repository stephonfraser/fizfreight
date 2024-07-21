'use client';
import React from 'react'
import useState from 'react-usestateref'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

const ShipmentList = ({ shippingData }:any) => {

  const [searchData, setSearchData, ref] = useState("");
  const [filteredRecords, setFilteredRecords, secondRef] = useState([]);

  let listData = shippingData;

  const filterData = (event: any) => {
    setSearchData((prev) => prev = event.target.value);

    // setSearchData(event.target.value);

    
    console.log(ref.current)
    if(!ref.current) {
      return console.log("Filter is null");
    }
    setFilteredRecords(shippingData.filter((data: any) => data.delivery_date_text == ref.current))
    return console.log("Filter is now: ", secondRef.current);
  }

  if ( !ref.current ) {
    listData = shippingData;
  } else {
    listData = secondRef.current;
  }

  return (
    <>
      <Input value={searchData} onChange={(event) => {filterData(event)}}/>
      <div className="grid grid-flow-row grid-cols-4 gap-4 mt-5">
        {listData.map((result: any)=> (
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
    </>
    
  )
}

export default ShipmentList