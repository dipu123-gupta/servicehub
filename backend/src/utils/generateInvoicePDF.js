import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateInvoicePDF = (invoice) => {
  return new Promise((resolve) => {
    const invoicesDir = path.join("invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    const filePath = `${invoicesDir}/invoice-${invoice.invoiceNumber}.pdf`;

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("LocalServesHub Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice No: ${invoice.invoiceNumber}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Total Amount: ₹${invoice.amount}`);
    doc.text(`Platform Commission: ₹${invoice.commission}`);
    doc.text(`Provider Earnings: ₹${invoice.providerAmount}`);

    doc.moveDown();
    doc.text("Thank you for using LocalServesHub!");

    doc.end();

    resolve(filePath);
  });
};

export default generateInvoicePDF;
