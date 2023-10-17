
import csv from 'csv-parse'
const fs = require("fs");
const PDFDocument = require("pdfkit-table");

let doc = new PDFDocument({
  margin: 30, 
});


doc.pipe(fs.createWriteStream("./docment.pdf"));
// -----------------------------------------------------------------------------------------------------
// Simple Table with Array
// -----------------------------------------------------------------------------------------------------
const table = {
  headers: ["Country Country Country", "Conversion rate", "Trend"],
  rows: [
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
    ["England of England of England", "33%", "+4.44%"],
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
    ["England of England of England", "33%", "+4.44%"],
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
    ["England of England of England", "33%", "+4.44%"],
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
    ["England of England of England", "33%", "+4.44%"],
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
  ],
};
const options = {
  width: 300,
  x: 150,
  y: 100,
  padding: {
    top: 1, bottom: 1, left: 5, right: 5, 
  },
};
doc.table(table, options);
doc.end();