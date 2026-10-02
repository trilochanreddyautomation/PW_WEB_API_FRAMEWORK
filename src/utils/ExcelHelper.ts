import XLSX from 'xlsx';
import fs from 'fs';
export class ExcelHelper {
    static readExcel(filPath: string, sheetName: string): Record<string, string>[] {
        const workbook = XLSX.readFile(filPath);
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
    }
}