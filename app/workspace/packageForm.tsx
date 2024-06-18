"use client"
 
import { any, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  shipmentDate: z.string(),
  deliveryDate: z.string(),
  warehouseId: z.string().min(1, {
    message: "Warehouse ID must be at least 1 characters.",
  }),
  customer: z.number(),
  trackingNumber: z.string(),
  weight: z.string(),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  vendor: z.string(),

})

export function PackageForm({createPackage, customers}: any) {


  // 1. Define your form.
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouseId: "",
      customer: 0,
      trackingNumber: "",
      weight: "",
      description: "",
      vendor: "",
    },
  })

  const { reset } = form;
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
    reset();
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? customers.find(
                              (customer: { id: any }) => customer.id === field.value
                            )?.full_name
                          : "Select Customer"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search customers..."
                        className="h-9"
                      />
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {customers.map((customer: { id: any; full_name: any}) => (
                            <CommandItem
                              value={customer.id}
                              key={customer.id}
                              onSelect={() => {
                                form.setValue("customer", customer.id)
                              }}
                            >
                              {customer.full_name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  customer.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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