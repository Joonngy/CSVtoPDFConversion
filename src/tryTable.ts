import * as fs from "fs";
import * as csv from "csv-parser";
import PDFDocument from "pdfkit-table";

const inputFile = "./addresses.csv";
const outputFile = "./document.pdf";

const doc = new PDFDocument();
const stream = fs.createWriteStream(outputFile);
const table = {
  title: "",
  headers: ["First", "Last", "Number", "Street", "City", "Postcode"],
  rows: [[""]],
};

const options:object = {
    width: 300,
    x: 150,
    y: 100,
    padding: {
      top: 1,
      bottom: 1,
      left: 5,
      right: 5,
    },
  };

function ReadStream(){
    fs.createReadStream(inputFile)
    .pipe(csv.default())
    .on("data", (row) => {
      table.rows.push([row["First"], row["Last"], row["Number"], row["Street"], row["City"], row["Postcode"]]);
    })
    .on("end", () => {
      MakeTable(table, options);
    });
}

function MakeTable(table:object, option:object){
    doc.table(table, option);
    doc.end();
    console.log("Success");
}

doc.pipe(stream);
table.rows.pop();  
console.log(table);
ReadStream();