import jsPDF from "jspdf";
import { LoanSchedule, formatKES } from "./loan-calc";
import { LOAN_FEES, LOAN_PROCESSING_FEE_PERCENTAGE } from "./loan-config";

export async function generatePDF(schedule: LoanSchedule): Promise<void> {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;

  // Helper function to add text
  const addText = (
    text: string,
    x: number,
    y: number,
    options: { fontSize?: number; fontStyle?: string; color?: number[] } = {}
  ) => {
    if (options.fontSize) doc.setFontSize(options.fontSize);
    if (options.fontStyle) doc.setFont("helvetica", options.fontStyle as "normal" | "bold" | "italic" | "bolditalic");
    if (options.color) doc.setTextColor(options.color[0], options.color[1], options.color[2]);
    doc.text(text, x, y);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
  };

  // Helper function to add a line
  const addLine = (y: number, color: number[] = [200, 200, 200]) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.line(10, y, pageWidth - 10, y);
  };

  // Title
  addText("ABZ CAPITAL LIMITED", 15, yPosition, {
    fontSize: 16,
    fontStyle: "bold",
  });
  yPosition += 8;
  addText("Loan Repayment Schedule", 15, yPosition, {
    fontSize: 14,
    fontStyle: "bold",
  });
  yPosition += 12;

  // Loan Summary Section
  addText("Loan Summary", 15, yPosition, {
    fontSize: 11,
    fontStyle: "bold",
    color: [24, 0, 173],
  });
  yPosition += 8;

  const summaryData = [
    ["Amount to Take Home", formatKES(schedule.takeHome)],
    ["Comprehensive Insurance Premium", formatKES(schedule.insurancePremium)],
    ["Total Charges", formatKES(schedule.feesTotal)],
    ["Net Loan Amount (Principal)", formatKES(schedule.principal)],
    ["Loan Period", `${schedule.months} months`],
    ["Interest Rate", "6% per month (Reducing Balance)"],
    ["Total Interest Payable", formatKES(schedule.totalInterest)],
    ["Total Repayment", formatKES(schedule.totalRepayment)],
  ];

  let summaryYPosition = yPosition;
  const colWidth = (pageWidth - 30) / 2;

  summaryData.forEach((row, idx) => {
    const x1 = 15;
    const x2 = 15 + colWidth;

    if (idx % 2 === 0) {
      if (idx > 0) summaryYPosition += 6;
      addText(row[0], x1, summaryYPosition, { fontSize: 10 });
      addText(row[1], x1 + 70, summaryYPosition, {
        fontSize: 10,
        fontStyle: "bold",
      });
    } else {
      addText(row[0], x2, summaryYPosition, { fontSize: 10 });
      addText(row[1], x2 + 70, summaryYPosition, {
        fontSize: 10,
        fontStyle: "bold",
      });
    }
  });

  yPosition = summaryYPosition + 12;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = 15;
  }

  // Amortization Schedule Section
  addLine(yPosition - 2);
  yPosition += 4;

  addText("Payment Schedule Details", 15, yPosition, {
    fontSize: 11,
    fontStyle: "bold",
    color: [24, 0, 173],
  });
  yPosition += 8;

  // Table headers
  const headers = [
    "Month",
    "Outstanding Balance",
    "Interest (6%)",
    "Principal",
    "Monthly Payment",
    "New Balance",
  ];

  const columnWidths = [12, 32, 28, 28, 32, 32];
  const headerHeight = 6;

  // Draw header background
  doc.setFillColor(24, 0, 173);
  let xPos = 10;
  headers.forEach((header, idx) => {
    doc.rect(xPos, yPosition, columnWidths[idx], headerHeight, "F");
    addText(header, xPos + 1, yPosition + 5, {
      fontSize: 8,
      fontStyle: "bold",
      color: [255, 255, 255],
    });
    xPos += columnWidths[idx];
  });

  yPosition += headerHeight;
  let dataYPosition = yPosition;

  // Table data
  schedule.rows.forEach((row, rowIdx) => {
    // Check if we need a new page
    if (dataYPosition > pageHeight - 15) {
      doc.addPage();
      dataYPosition = 15;

      // Redraw headers on new page
      doc.setFillColor(24, 0, 173);
      let headerXPos = 10;
      headers.forEach((header, idx) => {
        doc.rect(headerXPos, dataYPosition, columnWidths[idx], headerHeight, "F");
        addText(header, headerXPos + 1, dataYPosition + 5, {
          fontSize: 8,
          fontStyle: "bold",
          color: [255, 255, 255],
        });
        headerXPos += columnWidths[idx];
      });
      dataYPosition += headerHeight;
    }

    // Alternate row colors
    if (rowIdx % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(10, dataYPosition, pageWidth - 20, 5, "F");
    }

    const rowData = [
      row.month.toString(),
      formatKES(row.outstandingBalance),
      formatKES(row.interest),
      formatKES(row.principal),
      formatKES(row.monthlyPayment),
      formatKES(row.newBalance),
    ];

    xPos = 10;
    rowData.forEach((data, idx) => {
      const align = idx === 0 ? "center" : "right";
      const xOffset =
        align === "center"
          ? columnWidths[idx] / 2 - 2
          : columnWidths[idx] - 2;

      addText(data, xPos + xOffset, dataYPosition + 4, {
        fontSize: 8,
      });

      xPos += columnWidths[idx];
    });

    dataYPosition += 5;
  });

  // Footer
  const footerY = pageHeight - 10;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated by ABZ Capital - ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  // Save PDF
  doc.save(`loan-schedule-${schedule.months}months.pdf`);
}
