import * as fs from "fs";
import * as csv from 'csv-parser';
import PDFDocument from "pdfkit-table";

const inputFile = "./addresses.csv";
const outputFile = "./document1.pdf";

const doc = new PDFDocument();
const stream = fs.createWriteStream(outputFile);

const options = {
  width: 300,
  x: 150,
  y: 100,
  padding: {
    top: 1, bottom: 1, left: 5, right: 5, 
  },
};

fs.createReadStream(inputFile)
  .pipe(csv.default())
  .on("data", (row) => {

    const cell1 = row["First"];
    const cell2 = row["Last"];
    const cell3 = row["Number"];
    const cell4 = row["Street"];
    const cell5 = row["City"];
    const cell6 = row["Postcode"];

    // const str:string = '${cell1}\t|\t${cell2}\t|\t${cell3}\t|\t${cell4}\t|\t${cell5}\t|\t${cell6}'
    // doc.text(str);
    doc.text(cell1 + " | " + cell2 + " | " + cell3 + " | " + cell4 + " | " + cell5 + " | " + cell6);
  })
  .on("end", () => {
    doc.pipe(stream);
    // doc.table(table, options);
    doc.end();
    console.log("Success");
  });


