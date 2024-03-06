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
 
  json.forEach(element => {
    // Convertir la date si nécessaire
    if (typeof element.Date === 'number') {
        const date = new Date(Math.floor((element.Date - 25569) * 86400 * 1000));
        const formattedDate = date.toLocaleDateString('fr-FR'); // Adapter au format de date souhaité
        element.Date = formattedDate;
    }
    const formattedAmount = formatNumberWithCommas(element.Montant);
    element.Montant = formattedAmount;
  
  });

  return json;
};

const importTransactions = async() => {
  const wb = xlsx.readFile(filePath);
  let datas = [];

  wb.SheetNames.forEach((sheetName) => {
      const convertFile = processFile(wb, sheetName);
      datas = datas.concat(convertFile);
  });
  let duplicateCount = 0 // counter for duplicate transactions
try {
  for (const data of datas) {
    // Convertir la chaîne de caractères représentant la date en objet Date
    const dateParts = data.Date.split('/');
    const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    console.log("date:", date, "description:", data.Description, "montant:", data.Montant); // Vérifier les valeurs avant de créer la transa
    
    // Vérifier si une transaction avec la même date et le même montant existe déjà
    const existingTransaction = await Transaction.findOne({ date: date, montant: parseFloat(data.Montant.replace(',', '.')) });

    // Si une transaction existe, incrémenter le compteur de doublons et passer à l'itération suivante
    if (existingTransaction) {
      console.log("Transaction en double :", existingTransaction);
      duplicateCount++;
      continue;
    }

    // Créer une instance de Transaction avec les données correctes
    const newTransaction = new Transaction({
      date: date,
      description: data.Description,
      montant: parseFloat(data.Montant.replace(',', '.')) // Remplacer les virgules par des points pour les montants décimaux
    });
    console.log("new transaction : ", newTransaction);
    // Enregistrer la transaction
    await newTransaction.save();

  }
  console.log('Nombre de doublons non importés :', duplicateCount);
} catch (error) {
  console.error('Erreur lors de l\'importation des transactions :', error);
} 
 
};

module.exports = { importTransactions };