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
      { width: 18 }, // D
      { width: 18 }, // E
      { width: 15 }, // F
      { width: 12 }, // G
      { width: 12 }, // H
      { width: 12 }, // I
      { width: 13 }, // J
      { width: 15  }, // K
    ];

    // =====================
    // HEADER / BILL TO
    // =====================
    sheet.mergeCells("B2:D5");
    sheet.getCell("B2").value = "MEGATRANSPORT";
    sheet.getCell("B2").font = { bold: true, size: 16 };
    sheet.getCell("A2").alignment = { vertical: "middle" };

    sheet.getCell("B6").value = "Bill To:";
    sheet.getCell("B7").value = "Customer:";
    sheet.getCell("B8").value = "GREEN MEGACYCLE CORP.";
    sheet.getCell("B8").font = { bold: true };

    sheet.getCell("B9").value = "Address:";
    sheet.getCell("B10").value =
      "15 Sunrise Street, North Rim View Park, Concepcion Dos, City of Marikina";

    sheet.getCell("B11").value = "TIN No.";
    sheet.getCell("B12").value = "618-117-819-0000";

    // =====================
    // BILLING INFO (RIGHT)
    // =====================
    sheet.mergeCells("H2:K2");
    sheet.getCell("H2").value = "Billing Statement";
    sheet.getCell("H2").font = { bold: true };
    sheet.getCell("H2").alignment = { horizontal: "center" };

    sheet.getCell("H4").value = "Date:";
    sheet.mergeCells("I4:K4");
    sheet.getCell("I4").value = new Date();
    sheet.getCell("I4").alignment = { horizontal: "center" };

    sheet.getCell("H5").value = "PO Number:";
    sheet.mergeCells("I5:K5");
    sheet.getCell("H6").value = "Period:";
    sheet.mergeCells("I6:K6");
    sheet.getCell("I6").value = "December 5, 2025";
    sheet.getCell("I6").alignment = { horizontal: "center" };

    sheet.mergeCells("I7:K7");
    sheet.getCell("H7").value = "Billing Invoice:";

    sheet.getCell("H9").value = "Account Summary:";
    sheet.getCell("H10").value = "Terms:";
    sheet.getCell("H11").value = "Credits:";
    sheet.getCell("H12").value = "New Charges:";
    sheet.getCell("H13").value = "Total Balance Due:";

    sheet.getCell("K12").value = "30000";
    sheet.getCell("K13").value = "30000";

    // =====================
    // TABLE HEADER (start at B14)
    // =====================
    const headerRow = sheet.getRow(15);
    headerRow.values = [
      null,
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
    ];

    // increase header row height and enable wrapping
    headerRow.height = 30;

    headerRow.eachCell({ includeEmpty: false }, (cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
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
        null,
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
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
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
      null,
      "TOTAL",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
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
      null,
      "Prepared by:",
      "",
      "Checked by:",
      "",
      "Noted by:",
      "",
      "Approved by:",
    ]);

    sheet.addRow([
      null,
      "Ara Veloso / Earl Gierald Verzon",
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
