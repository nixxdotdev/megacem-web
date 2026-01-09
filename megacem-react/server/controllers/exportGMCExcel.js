import ExcelJS from "exceljs";
import path from "path";
import GMCHolcim from "../models/GMCHolcim.js";

export async function exportGMCHExcel(req, res) {
  try {
    const workbook = new ExcelJS.Workbook();

    // Load template
    const templatePath = path.resolve(
      "templates",
      "GMC-Holcim.Template.xlsx"
    );

    await workbook.xlsx.readFile(templatePath);

    const sheet = workbook.getWorksheet("GMC HOLCIM BILLING");

    // Fetch data
    const data = await GMCHolcim.find().sort({ drdate: 1 });

    let startRow = 11; // where your table starts
    let rowIndex = 1;

    data.forEach((item) => {
      const row = sheet.getRow(startRow++);

      row.getCell(1).value = rowIndex++;
      row.getCell(2).value = new Date(item.drdate);
      row.getCell(3).value = item.drnumber;
      row.getCell(4).value = item.weighslip;
      row.getCell(5).value = item.ponumber;
      row.getCell(6).value = item.thnumber;
      row.getCell(7).value = item.rate;

      // If VAT & Gross are formula-based in Excel:
      // leave cells empty, formulas auto-calc

      row.commit();
    });

    // Send file
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
    res.status(500).json({ success: false, message: err.message });
  }
}
