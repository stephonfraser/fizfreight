import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shipmentDate = searchParams.get('shipmentDate');
  const deliveryDate = searchParams.get('deliveryDate');
  const warehouseId = searchParams.get('warehouseId');
  const customer = searchParams.get('customer');
  const trackingNumber = searchParams.get('trackingNumber');
  const weight = searchParams.get('weight');
  const description = searchParams.get('description');
  const vendor = searchParams.get('vendor');
 
  try {
    if (!shipmentDate || !deliveryDate || !warehouseId || !customer || !trackingNumber || !weight || !description || !vendor) throw new Error('Pet and owner names required');
    await sql`INSERT INTO packages (delivery_date, shipped_date, customer_id, warehouse_id, tracking_number, description, weight, vendor) VALUES (${deliveryDate}, ${shipmentDate}, ${customer}, ${warehouseId}, ${trackingNumber}, ${description}, ${weight}, ${vendor});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const packages = await sql`SELECT * FROM packages;`;
  return NextResponse.json({ packages }, { status: 200 });
}