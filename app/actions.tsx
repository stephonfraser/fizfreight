'use server'
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server';
import { mailOptions, transporter } from './utils/mail.utils';
import { render } from '@react-email/components';
import { Email } from './email';


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
  revalidatePath('/workspace')  
  const customers = await sql`SELECT * FROM customers;`;
}

export async function getCustomers() {
  try {
    const result =
      await sql`SELECT * FROM customers;`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function getShippingHistory() {
  try {
    const result =
      await sql`SELECT * FROM packages;`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function getPendingShipments() {
  try {
    const result =
      await sql`SELECT * FROM packages;`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function getShippingByDate() {
  try {
    const result =
      await sql`SELECT ROW_NUMBER() OVER (ORDER BY delivery_date) AS id, delivery_date, COUNT(*) as no_of_shipment FROM packages GROUP BY delivery_date;`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


export async function createPackage(values: any) {
   const { shipmentDate, deliveryDate, warehouseId, customer, trackingNumber, weight, description, vendor} = values;
   
   try {
    if (!shipmentDate || !deliveryDate || !warehouseId || !customer || !trackingNumber || !weight || !description || !vendor) throw new Error('Pet and owner names required');
    await sql`INSERT INTO packages (delivery_date, shipped_date, customer_id, warehouse_id, tracking_number, description, weight, vendor) VALUES (${deliveryDate}, ${shipmentDate}, ${customer}, ${warehouseId}, ${trackingNumber}, ${description}, ${weight}, ${vendor});`;
    await createReceiptRecords(values);
    revalidateTag('packages')
    revalidatePath('/workspace/history')
    revalidatePath('/workspace/pending')
    revalidatePath('/workspace')
  } catch (error) {
    console.error(error)
  }
 
  const packages = await sql`SELECT * FROM packages;`;
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


async function createReceiptRecords(values: any) {
  let {customer, warehouseId, deliveryDate, trackingNumber, weight, description, vendor} = values;
  const { rows } = await sql`SELECT * FROM customers;`;
  let consigneeInfo = rows.find((row) => row.id == customer);
  if (!consigneeInfo) return console.error("No customer found");


  let consigneeName = consigneeInfo.first_name + " " + consigneeInfo.last_name;
  let consigneeAddress = consigneeInfo.physical_address;
  let consigneePhone = consigneeInfo.phone_number;


  try {
    if (!consigneeName || !deliveryDate || !warehouseId || !customer || !trackingNumber || !weight || !description || !consigneeAddress || !consigneePhone || !vendor) throw new Error('Warehouse information required');
    await sql`INSERT INTO warehousereceipts (receipt_number, received_datetime, consignee_name, consignee_address, consignee_number, supplier_name, tracking_number,  weight, description) VALUES (${warehouseId}, ${deliveryDate}, ${consigneeName}, ${consigneeAddress}, ${consigneePhone},  ${vendor}, ${trackingNumber}, ${weight}, ${description});`;
    revalidateTag('packages')
    revalidatePath('/workspace/history')
    revalidatePath('/workspace/pending')
    revalidatePath('/workspace')
    console.log("Receipt recorded!")
  } catch (error) {
    console.error(error)
  }

}



export async function sendEmail(values: any) {
  console.log("Actions Ran")

  const emailHtml = render(<Email url="https://example.com" title={values.subject} />);

  if(!values?.name || !values?.email || !values?.subject || !values?.message) {
    return NextResponse.json({ message: "Bad Request" }, { status: 500 });
  }
  
  try {
    transporter.verify(function (error, success) {
      if (error) {
        return console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    await transporter.sendMail({
        ...mailOptions,
        to: values.email,
        subject: values.subject,
        text: "This is a test string",
        html: emailHtml
    })
    let message = "Success"
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}