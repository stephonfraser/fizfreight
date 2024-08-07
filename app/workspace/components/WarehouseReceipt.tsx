import React from 'react'
import Image from 'next/image'
import "../../globals.css";

const WarehouseReceipt = ({receiptData}:any) => {

  let receiptDemo = {
    number: "WR-9112",
    date: "June 15th, 2024 12:48 PM",
    customerName: "Dorwin Kingston",
    customerAddress: "Georgetown, Demerara-Mahaica, Guyana",
    customerPhone: "+592-621-2733",
    trackingNumber: "1zhe69434215035596",
    weight: "15.00LB, 6.80 Kg",
    description: "APPAREL; FASHION ACCESSORIES"
  }
  if(!receiptData) {
    receiptData = receiptDemo;
  }
  return (
    <div className='warehouse-receipt w-full p-10'>
      <div className="header w-full flex flex-row items-center justify-between">
        <div className="logo-container">
          <Image src="/fizfreight.png" alt="logo" width={200} height={200} style={{objectFit: "contain"}}	/>
        </div>
        <div className="receipt-info mr-10">
          <div className="receipt-table">
            <table className='w-full table-auto border border-slate-500'>
              <thead>
                <tr>
                  <td className='p-2'>Receipt Number:</td>
                  <td className='p-2'>{receiptData.number}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2'>Received Date/Time:</td>
                  <td className='p-2'>{receiptData.date}</td>
                </tr>
                <tr>
                  <td className='p-2'>Received By:</td>
                  <td className='p-2'>Customer Support</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
      <div className="company-info w-full ml-10 mb-5">
        <div className="company-name font-semibold text-lg">
          FizFreight
        </div>
        <div className="company-address-1 text-sm">
          10831 NW 122nd Street
        </div>
        <div className="company-address-2 text-sm">
          MEDLEY, FLORIDA, UNITED STATES
        </div>
        <div className="zip-contact text-sm">
          Zip: 33178, Phone: +1-786-693-3049
        </div>
      </div>
      <div className="details">
        <table className='w-full table-auto border-collapse border border-slate-500'>
          <thead>
            <tr className='w-full text-center'> 
              <th className='border border-slate-600'>Shipper Information</th>
              <th className='border border-slate-600'>Consignee Information</th>
            </tr>
          </thead>
          <tbody>
            <tr className='w-full text-center'>
              <td className='border border-slate-600 p-10 text-sm'>
                10831 NW 122ND STREET,
                <br />
                MIAMI, FLORIDA, UNITED STATES
                <br />
                Zip: 300086
              </td>
              <td className='border border-slate-600 p-10 text-sm'>
                {receiptData.customerName}
                <br />
                Diamond,
                <br />
                {receiptData.customerAddress}
                <br />
                {receiptData.customerPhone}
              </td>
            </tr>
          </tbody>
          
        </table>
        <table className='w-full text-center table-fixed border-collapse border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600' colSpan={4}>Inland Carrier and Supplier Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-600 p-2 text-sm'>
                Carrier Name
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                Driver License
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
            </tr>
            <tr>
              <td className='border border-slate-600 p-2 text-sm'>
                PRO Number
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                Supplier Name
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
            </tr>
            <tr>
              <td className='border border-slate-600 p-2 text-sm'>
                Tracking Number
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                {receiptData.trackingNumber}
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                Invoice Number
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
            </tr>
            <tr>
              <td className='border border-slate-600 p-2 text-sm'>
                Driver Name
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                P.O. Number
              </td>
              <td className='border border-slate-600 p-2 text-sm'>
                
              </td>
            </tr>
          </tbody>
        </table>
        <table className='w-full text-center table-fixed border-collapse border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600'>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-600 p-12 text-sm'></td>
            </tr>
          </tbody>
        </table>
        <table className='table-auto border-collapse border w-full'>
          <thead>
            <tr>
              <th className='border border-slate-600'>Pcs</th>
              <th className='border border-slate-600'>Package</th>
              <th className='border border-slate-600' colSpan={3}>Description</th>
              <th className='border border-slate-600' rowSpan={3}>Weight</th>
            </tr>
            <tr>
              <th className='border border-slate-600' colSpan={2}>Location</th>
              <th className='border border-slate-600' colSpan={3}>Notes</th>
            </tr>
            <tr>
              <th className='border border-slate-600' colSpan={2}>Quantity</th>
              <th className='border border-slate-600'>Part Number</th>
              <th className='border border-slate-600'>Model</th>
              <th className='border border-slate-600'>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-600 p-5 text-sm' colSpan={2}>1 box US-LOC</td>
              <td className='border border-slate-600 p-5 text-sm' colSpan={3}>
                {receiptData.description}
              </td>
              <td className='border border-slate-600 p-5 text-sm'>{receiptData.weight}</td>
            </tr>
            <tr>
              <td colSpan={5} className='p-10'>
                Received by
                <br />
                Signature: _______________________________
              </td>
              <td colSpan={3} className='p-10'>
                <table>
                  <thead>
                    <tr className='border border-slate-600 '>
                      <th className='p-2 border border-slate-600'>Pieces</th>
                      <th className='p-2 border border-slate-600'>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border border-slate-600 p-5'>
                      <td className='p-2 border border-slate-600'>1</td>
                      <td className='p-2 border border-slate-600'>{receiptData.weight}</td>
                    </tr>
                  </tbody>
                </table>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WarehouseReceipt