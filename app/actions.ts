'use server'
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'



export async function createCustomer(values: any) {
   const { firstName, lastName, emailAddress, phoneNumber, physicalAddress} = values;
   const newId = await getLastId()+1;
   const accountNumber = 'FIZ'+newId;
   const signUpDate = new Date().toISOString();
   
   try {
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !signUpDate || !physicalAddress || !accountNumber) throw new Error('Pet and owner names required');
    await sql`INSERT INTO customers (first_name, last_name, phone_number, email_address, signup_date, physical_address, account_number) VALUES (${firstName}, ${lastName}, ${phoneNumber}, ${emailAddress}, ${signUpDate}, ${physicalAddress}, ${accountNumber});`;
    revalidateTag('customers')
  } catch (error) {
    console.error(error)
  }
 
  const customers = await sql`SELECT * FROM customers;`;
  console.log(customers)
  redirect('/workspace')
}

export async function createPackage(values: any) {
   const { shipmentDate, deliveryDate, warehouseId, customer, trackingNumber, weight, description, vendor} = values;
   
   try {
    if (!shipmentDate || !deliveryDate || !warehouseId || !customer || !trackingNumber || !weight || !description || !vendor) throw new Error('Pet and owner names required');
    await sql`INSERT INTO packages (delivery_date, shipped_date, customer_id, warehouse_id, tracking_number, description, weight, vendor) VALUES (${deliveryDate}, ${shipmentDate}, ${customer}, ${warehouseId}, ${trackingNumber}, ${description}, ${weight}, ${vendor});`;
    revalidateTag('packages')
  } catch (error) {
    console.error(error)
  }
 
  const packages = await sql`SELECT * FROM packages;`;
  console.log(packages)
  redirect('/workspace')
}

async function getLastId() {
  const { rows } = await sql`SELECT * FROM customers;`;
  if (rows.length < 1) {
    return 0;
  }
  let customerIds: any[] = [];
  rows.forEach((row) => {
    customerIds.push(row.id)
  });
  let sortedIds = customerIds.sort((a, b) => a - b)
  let lastItemIndex = sortedIds.length - 1;

  return sortedIds[lastItemIndex];

}