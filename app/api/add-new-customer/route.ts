import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const newId = await getLastId()+1;
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const phoneNumber = searchParams.get('phoneNumber');
  const emailAddress = searchParams.get('emailAddress');
  const signUpDate = new Date().toISOString();
  const physicalAddress = searchParams.get('physicalAddress');
  const accountNumber = 'FIZ'+newId;
 
  try {
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !signUpDate || !physicalAddress || !accountNumber) throw new Error('Pet and owner names required');
    await sql`INSERT INTO customers (first_name, last_name, phone_number, signup_date, physical_address, account_number) VALUES (${firstName}, ${lastName}, ${phoneNumber}, ${emailAddress}, ${signUpDate}, ${physicalAddress}, ${accountNumber});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const customers = await sql`SELECT * FROM customers;`;
  return NextResponse.json({ customers }, { status: 200 });
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