const readline = require('readline');
const fs = require('fs');

module.exports = new class ReadFile {

    csv(filePath, separator) {
        return new Promise((resolve, reject) => {
            let products = [];
            const productCSV = readline.createInterface({
                input: fs.createReadStream(filePath, { encoding: 'utf8' })
            });
            productCSV
            .on('line', product => products.push(product.split(separator)))
            .on('error', error => reject(error))
            .on('close', _ => resolve(products));
        });
    }
}