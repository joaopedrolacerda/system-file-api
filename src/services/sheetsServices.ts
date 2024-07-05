import xlsx from 'xlsx';
import fs from 'fs';

function readSheet({fileBuffer}: any){
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

  const sheetNames = workbook.SheetNames;
  const results = sheetNames.map((sheetName: any) => {
    const worksheet = workbook.Sheets[sheetName];

    return {
      sheetName,
      data: xlsx.utils.sheet_to_json(worksheet),
    };
  });
  //@ts-ignore
 
  return results
}

export default readSheet