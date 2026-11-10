/**
 * Deterministic Student Login ID generator function for St. John Public School:
 * [First 3 alphabetic characters of fullName in UPPERCASE] + [2-digit Month: MM] + [4-digit Year: YYYY]
 * Example: "Rahul Verma" born "2012-05-14" -> "RAH052012"
 */
export function generateStudentId(fullName: string, dob: string): string {
  if (!fullName) return 'STU012010';

  // Extract only alphabetic letters
  const lettersOnly = fullName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const namePart = (lettersOnly + 'XXX').slice(0, 3);

  // Parse Month and Year from various date formats (YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY)
  let month = '01';
  let year = '2012';

  if (dob) {
    // If standard ISO: YYYY-MM-DD
    const isoMatch = dob.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
      year = isoMatch[1];
      month = isoMatch[2].padStart(2, '0');
    } else {
      // If Indian format: DD-MM-YYYY or DD/MM/YYYY
      const indianMatch = dob.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
      if (indianMatch) {
        month = indianMatch[2].padStart(2, '0');
        year = indianMatch[3];
      } else {
        const dateObj = new Date(dob);
        if (!isNaN(dateObj.getTime())) {
          month = String(dateObj.getMonth() + 1).padStart(2, '0');
          year = String(dateObj.getFullYear());
        }
      }
    }
  }

  // Ensure 2-digit month and 4-digit year
  month = month.padStart(2, '0').slice(-2);
  year = year.padStart(4, '0').slice(-4);

  return `${namePart}${month}${year}`;
}

export function isValidStudentId(id: string): boolean {
  if (!id) return false;
  const cleanId = id.trim().toUpperCase();
  // Format: 3 letters + 2 digits (01-12) + 4 digits (1900-2099)
  return /^[A-Z]{3}(0[1-9]|1[0-2])(19|20)\d{2}$/.test(cleanId);
}
