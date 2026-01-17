import ExcelJS from "exceljs";
import GMCHolcim from "../models/GMCHolcim.js";

export async function exportGMCHExcel(req, res) {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("GMC HOLCIM BILLING");

    // =====================
    // COLUMN WIDTHS
    // =====================
    sheet.columns = [
      { width: 18 }, // A
      { width: 15 }, // B
      { width: 18 }, // C
      { width: 28 }, // D
      { width: 18 }, // E
      { width: 15 }, // F
      { width: 12 }, // G
      { width: 12 }, // H
      { width: 15 }, // I
      { width: 20 }, // J
      { width: 20 }, // K
    ];

    // =====================
    // HEADER / BILL TO
    // =====================
    sheet.mergeCells("A2:D5");
    sheet.getCell("A2").value = "MEGATRANSPORT";
    sheet.getCell("A2").font = { bold: true, size: 16 };
    sheet.getCell("A2").alignment = { vertical: "middle" };

    sheet.getCell("A7").value = "Bill To:";
    sheet.getCell("A8").value = "Customer:";
    sheet.getCell("A9").value = "GREEN MEGACYCLE CORP.";
    sheet.getCell("A9").font = { bold: true };

    sheet.getCell("A10").value = "Address:";
    sheet.getCell("A11").value =
      "15 Sunrise Street, North Rim View Park, Concepcion Dos, City of Marikina";

    sheet.getCell("A12").value = "TIN No.";
    sheet.getCell("A13").value = "618-117-819-0000";

    // =====================
    // BILLING INFO (RIGHT)
    // =====================
    sheet.mergeCells("H2:J2");
    sheet.getCell("H2").value = "Billing Statement";
    sheet.getCell("H2").font = { bold: true };
    sheet.getCell("H2").alignment = { horizontal: "center" };

    sheet.getCell("H4").value = "Date:";
    sheet.getCell("I4").value = new Date();

    sheet.getCell("H5").value = "PO Number:";
    sheet.getCell("H6").value = "Period:";
    sheet.getCell("I6").value = "December 5, 2025";

    sheet.getCell("H7").value = "Billing Invoice:";

    // =====================
    // TABLE HEADER
    // =====================
    const headerRow = sheet.addRow([
      "Plant Source / Delivery Site",
      "Date of Delivery",
      "Delivery Receipt",
      "Holcim Acknowledgement Receipt / Weigh Slip",
      "P.O. No.",
      "TH Number",
      "Rate",
      "VAT",
      "Gross Amount",
      "Truck Type / Remarks",
      "Driver's Report",
    ]);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF3F0E6" },
      };
    });

    // =====================
    // DATA ROWS
    // =====================
    const data = await GMCHolcim.find().sort({ drdate: 1 });

    let totalRate = 0;
    let totalVat = 0;
    let totalGross = 0;

    data.forEach((item) => {
      const vat = item.rate * 0.12;
      const gross = item.rate + vat;

      totalRate += item.rate;
      totalVat += vat;
      totalGross += gross;

      const row = sheet.addRow([
        item.plantsource || "",
        new Date(item.drdate),
        item.drnumber,
        item.weighslip,
        item.ponumber,
        item.thnumber,
        item.rate,
        vat,
        gross,
        item.trucktype || "",
        item.driversreport || "",
      ]);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // =====================
    // TOTAL ROW
    // =====================
    const totalRow = sheet.addRow([
      "TOTAL",
      "",
      "",
      "",
      "",
      "",
      totalRate,
      totalVat,
      totalGross,
      "",
      "",
    ]);

    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // =====================
    // SIGNATORIES
    // =====================
    sheet.addRow([]);
    sheet.addRow([
      "Prepared by:",
      "",
      "Checked by:",
      "",
      "Noted by:",
      "",
      "Approved by:",
    ]);

    sheet.addRow([
      "Arq Veloso / Earl Gierald Verzon",
      "",
      "Angel Borja",
      "",
      "John Brix Castillo",
      "",
      "Marizen Salazar",
    ]);

    // =====================
    // DOWNLOAD
    // =====================
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=GMC-Holcim-Billing.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
