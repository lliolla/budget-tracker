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
const mapFields = (element) => {
  
  return {
      date: new Date(element.Date),
      libelle: element['Libellé'],
      montant: element.Montant,
      type: element.Type,
      createdAt: new Date(),
      updatedAt: new Date()
  };
};

const processFile =  (wb,SheetName) => {
  //read csv file
  const ws = wb.Sheets[SheetName];
  // transform csv to json
  const json = xlsx.utils.sheet_to_json(ws);
  //in sheet map row and transform amountin number with ,
  console.log("SheetNames", json);
  json.forEach(element => {
    // Vérifier si la date est un nombre
    if (typeof element.Date === 'number') {
      // Convertir le nombre en date
      const date = new Date(Math.floor((element.Date - 25569) * 86400 * 1000));
      // Formater la date selon le format souhaité (à adapter)
      const formattedDate = date.toLocaleDateString('fr-FR');
      element.Date = formattedDate;
    }
    const formattedAmount = formatNumberWithCommas(element.Montant);
    element.Montant = formattedAmount;
    console.log("element", element);
  });
  return json;
};



const importTransactions = (filePath) => {

    const wb = xlsx.readFile(filePath);
    let datas =[];
    
    wb.SheetNames.forEach((sheetName) => {
      const convertFile = processFile(wb,sheetName)
      console.log("nb d'array ds convertFile", convertFile.length,convertFile[50]);
      datas = datas.concat(convertFile);
    console.log("datas avant insertion", datas[50]);

    // Transaction.insertMany(datas)
    // .then(() => {
    //   console.log("insertion reussie");
    // })
    // .catch((err) => {
    //   console.error("Erreur lors de l'insertion :", err);
    // })
    })
return datas
}



module.exports = { importTransactions};