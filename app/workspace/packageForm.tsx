"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  shipmentDate: z.string(),
  deliveryDate: z.string(),
  warehouseId: z.string().min(1, {
    message: "Warehouse ID must be at least 1 characters.",
  }),
  customer: z.string(),
  trackingNumber: z.string(),
  weight: z.string(),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  vendor: z.string(),

})

export function PackageForm({createPackage}: any) {
  // 1. Define your form.
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouseId: "",
      customer: "",
      trackingNumber: "",
      weight: "",
      description: "",
      vendor: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const { shipmentDate, deliveryDate, warehouseId, customer, trackingNumber, weight, description, vendor} = values;
    const submissionData = {
      shipmentDate, 
      deliveryDate, 
      warehouseId, 
      customer, 
      trackingNumber, 
      weight, 
      description, 
      vendor
    }
    await createPackage(submissionData);
    toast({
      title: "Package Created!",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="row flex flex-row gap-3 w-full mt-5">
          <FormField
            control={form.control}
            name="shipmentDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Shipment Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Delivery Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="row flex flex-row gap-3 w-full">
          <FormField
            control={form.control}
            name="warehouseId"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Warehouse ID</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="row flex flex-row gap-3 w-full">
          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Tracking Number</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Type here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <FormControl>
                <Input placeholder="Vendor Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}