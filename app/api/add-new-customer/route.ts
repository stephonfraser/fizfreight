import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const phoneNumber = searchParams.get('phoneNumber');
  const emailAddress = searchParams.get('emailAddress');
  const signUpDate = new Date().toISOString();
  const physicalAddress = searchParams.get('physicalAddress');
  const accountNumber = searchParams.get('accountNumber');
 
  try {
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !signUpDate || !physicalAddress || !accountNumber) throw new Error('Pet and owner names required');
    await sql`INSERT INTO customer (Name, Owner) VALUES (${firstName}, ${lastName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}

async function getLastId() {
  
}