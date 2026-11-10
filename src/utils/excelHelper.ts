import * as XLSX from 'xlsx';
import { generateStudentId } from './studentId';
import { Student } from '../types';

export interface ParsedStudentRow {
  fullName: string;
  dob: string;
  grade: string;
  stream: 'Science' | 'Arts' | 'General';
  fatherName: string;
  guardianMobile: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  generatedId: string;
}

// Fuzzy header matching map
function normalizeHeader(header: string): string {
  const clean = header.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.includes('name') && !clean.includes('father') && !clean.includes('mother')) return 'fullName';
  if (clean.includes('dob') || clean.includes('birth')) return 'dob';
  if (clean.includes('class') || clean.includes('grade') || clean.includes('standard')) return 'grade';
  if (clean.includes('stream') || clean.includes('branch')) return 'stream';
  if (clean.includes('father') || clean.includes('parent') || clean.includes('guardian')) return 'fatherName';
  if (clean.includes('mobile') || clean.includes('phone') || clean.includes('contact')) return 'guardianMobile';
  if (clean.includes('fee') || clean.includes('dues') || clean.includes('status')) return 'feeStatus';
  return header;
}

export function parseStudentExcelFile(fileData: ArrayBuffer): ParsedStudentRow[] {
  const workbook = XLSX.read(fileData, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const parsedStudents: ParsedStudentRow[] = [];

  for (const row of rawRows) {
    const normalizedRow: Record<string, any> = {};
    for (const [key, value] of Object.entries(row)) {
      normalizedRow[normalizeHeader(key)] = String(value).trim();
    }

    const fullName = normalizedRow['fullName'] || 'New Student';
    // Handle Excel serial date numbers or string dates
    let rawDob = normalizedRow['dob'] || '2012-05-14';
    if (!isNaN(Number(rawDob)) && Number(rawDob) > 20000) {
      // Excel serial date to JS Date
      const excelEpoch = new Date(1899, 11, 30);
      const jsDate = new Date(excelEpoch.getTime() + Number(rawDob) * 86400000);
      rawDob = jsDate.toISOString().split('T')[0];
    }

    const grade = normalizedRow['grade'] || 'Class 11th';
    let streamRaw = (normalizedRow['stream'] || 'Science').toLowerCase();
    let stream: 'Science' | 'Arts' | 'General' = 'Science';
    if (streamRaw.includes('art')) stream = 'Arts';
    else if (streamRaw.includes('gen')) stream = 'General';

    const fatherName = normalizedRow['fatherName'] || 'Guardian';
    const guardianMobile = normalizedRow['guardianMobile'] || '9452000000';
    let feeStatusRaw = (normalizedRow['feeStatus'] || 'Paid').toLowerCase();
    let feeStatus: 'Paid' | 'Pending' | 'Overdue' = 'Paid';
    if (feeStatusRaw.includes('pend')) feeStatus = 'Pending';
    else if (feeStatusRaw.includes('over') || feeStatusRaw.includes('due')) feeStatus = 'Overdue';

    const generatedId = generateStudentId(fullName, rawDob);

    parsedStudents.push({
      fullName,
      dob: rawDob,
      grade,
      stream,
      fatherName,
      guardianMobile,
      feeStatus,
      generatedId
    });
  }

  return parsedStudents;
}

export function downloadSampleExcelTemplate() {
  const sampleData = [
    {
      "Student Name": "Aarav Sharma",
      "Date of Birth": "2010-08-15",
      "Class / Grade": "Class 11th",
      "Stream": "Science",
      "Father Name": "Rajesh Sharma",
      "Guardian Mobile": "9876543210",
      "Fee Status": "Paid"
    },
    {
      "Student Name": "Priya Singh",
      "Date of Birth": "2011-03-22",
      "Class / Grade": "Class 10th",
      "Stream": "General",
      "Father Name": "Manoj Singh",
      "Guardian Mobile": "9452098765",
      "Fee Status": "Pending"
    },
    {
      "Student Name": "Mohd Zaid",
      "Date of Birth": "2009-11-05",
      "Class / Grade": "Class 12th",
      "Stream": "Arts",
      "Father Name": "Anwar Khan",
      "Guardian Mobile": "9123456789",
      "Fee Status": "Paid"
    },
    {
      "Student Name": "Ananya Mishra",
      "Date of Birth": "2012-07-19",
      "Class / Grade": "Class 9th",
      "Stream": "General",
      "Father Name": "Suresh Mishra",
      "Guardian Mobile": "9789012345",
      "Fee Status": "Paid"
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students_Enrollment");

  // Write file to trigger download in browser
  XLSX.writeFile(workbook, "St_John_School_Amethi_Student_Upload_Template.xlsx");
}
