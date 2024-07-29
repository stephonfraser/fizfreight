import React from 'react';
import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf-node';

export async function convertComponentToPDF(Component: any) {
  const componentHtml = ReactDOMServer.renderToStaticMarkup(<Component />);
  const file = { content: componentHtml };

  const pdfBuffer = await pdf.generatePdf(file, { format: 'A4' });
  return pdfBuffer;
}