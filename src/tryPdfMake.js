"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv = require("csv-parser");
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var inputFile = "./addresses.csv";
var outputFile = "./document2.pdf";
var data = [];
var table = [];
fs.createReadStream(inputFile)
    .pipe(csv.default())
    .on('data', function (row) {
    data.push([row['First'], row['Last'], row['Number'], row['Street'], row['City'], row['Postcode']]);
})
    .on('end', function () {
    table.push([{ text: 'First', bold: true }, { text: 'Last', bold: true }, { text: 'Number', bold: true },
        { text: 'Street', bold: true }, { text: 'City', bold: true }, { text: 'Postcode', bold: true }]);
    table.push.apply(table, data);
    // const fonts = {
    //     FONTNAME: {
    //       normal: 'FONTNAME-Regular.ttf',
    //       bold: 'FONTNAME-Bold.ttf',
    //       italics: 'FONTNAME-Regular.ttf',
    //       bolditalics: 'FONTNAME-Regular.ttf'
    //     }
    //   };
    var documentDefinition = {
        content: [
            { text: 'CSV to PDF Table', style: 'header' },
            { table: { body: table } },
        ]
    };
    var pdfDoc = pdfMake.createPdf(documentDefinition).download(outputFile);
    console.log('PDF file created successfully.');
})
    .on('error', function () {
});
//First,Last,Number,Street,City,Postcode
