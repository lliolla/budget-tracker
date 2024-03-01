const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const Transaction = require('../models/Transaction');
const upload = require('../middleware/multerExcel');
const path = require('path');
const filePath = path.join(__dirname, '../uploads/import.csv');

// convert number in decimal number with 2 number after point
const formatNumberWithCommas = (number) => {
    // Convertir le nombre en string
    const numberString = number.toString();
    // Vérifier si le nombre est négatif
    const isNegative = numberString.startsWith('-');
    // Supprimer le signe négatif si présent pour la manipulation
    const numberWithoutSign = isNegative ? numberString.slice(1) : numberString;
    // Formater le nombre avec un point après les deux chiffres à partir de la droite
    const formattedNumber = numberWithoutSign.replace(
      /^(-?\d+)(\d{2})$/,
      (match, integerPart, decimalPart) => (isNegative ? '-' : '') + integerPart + '.' + decimalPart
    );
    return formattedNumber;
    
};

const processFile =  (wb,SheetName) => {
  //read csv file
    const ws = wb.Sheets[SheetName];
  // transform csv to json
    const json = xlsx.utils.sheet_to_json(ws);
    //in sheet map row and transform amountin number with ,
    console.log("SheetNames",json);
    json.forEach(element => {
      const formattedAmount = formatNumberWithCommas(element.Montant);
      element.Montant = formattedAmount;
      console.log("element", { ...element});
    });
    return json
}

const importTransactions = (filePath) => {

    const wb = xlsx.readFile(filePath);
    let datas =[];
    
    wb.SheetNames.forEach((sheetName) => {
      const convertFile = processFile(wb,sheetName)
      console.log("nb d'array ds convertFile", convertFile.length);
    datas = datas.concat(convertFile)
    
    })
return datas
}

module.exports = { importTransactions };