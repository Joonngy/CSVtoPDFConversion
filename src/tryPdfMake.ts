import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const inputFile = "./addresses.csv";
const outputFile = "./document2.pdf";

const data: any[] = [];
const table: any[] = [];

fs.createReadStream(inputFile)
  .pipe(csv.default())
  .on('data', (row) => {
    data.push([row['First'], row['Last'], row['Number'], row['Street'], row['City'], row['Postcode']]);
  })
  .on('end', () => {
    table.push([{ text: 'First', bold: true }, { text: 'Last', bold: true }, { text: 'Number', bold: true },
    { text: 'Street', bold: true }, { text: 'City', bold: true },{ text: 'Postcode', bold: true }]);

    table.push(...data);

    // const fonts = {
    //     FONTNAME: {
    //       normal: 'FONTNAME-Regular.ttf',
    //       bold: 'FONTNAME-Bold.ttf',
    //       italics: 'FONTNAME-Regular.ttf',
    //       bolditalics: 'FONTNAME-Regular.ttf'
    //     }
    //   };

    const documentDefinition = {
      content: [
        { text: 'CSV to PDF Table', style: 'header' },
        { table: { body: table } },
      ]
    };
    

    const pdfDoc = pdfMake.createPdf(documentDefinition).download(outputFile);

    console.log('PDF file created successfully.');
  })
  .on('error', () =>{

  });

  //First,Last,Number,Street,City,Postcode