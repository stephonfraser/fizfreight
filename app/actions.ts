'use server'
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'


export async function createCustomer(values: any) {
   const { firstName, lastName, emailAddress, phoneNumber, physicalAddress} = values;
   const newId = await getLastId()+1;
   const accountNumber = 'FIZ'+newId;
   const signUpDate = new Date().toISOString();
   
   try {
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !signUpDate || !physicalAddress || !accountNumber) throw new Error('Pet and owner names required');
    await sql`INSERT INTO customers (first_name, last_name, phone_number, email_address, signup_date, physical_address, account_number) VALUES (${firstName}, ${lastName}, ${phoneNumber}, ${emailAddress}, ${signUpDate}, ${physicalAddress}, ${accountNumber});`;
  } catch (error) {
    console.error(error)
  }
 
  const customers = await sql`SELECT * FROM customers;`;
  console.log(customers)
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