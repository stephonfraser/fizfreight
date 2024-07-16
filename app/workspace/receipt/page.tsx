import WarehouseReceipt from "../components/WarehouseReceipt";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function Home() {

  return (
    <main className="w-full">
      <Breadcrumb className="w-full p-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/workspace">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Receipt</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <WarehouseReceipt />
    </main>
  );
}
