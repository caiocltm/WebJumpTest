const fs = require('fs');

module.exports = new class ValidateCLI {

    answer(input) {
        const pathSplited = input.split('\\');

        // Validating the CSV file path informed by the user.
        return fs.existsSync(input) && 
        // Validating if the file path informed by the user, is a file.
               fs.statSync(input).isFile() &&
        // Validating if the file path informed by the user, is a csv file.
               pathSplited[pathSplited.length - 1].split('.')[1].trim().toLowerCase() === 'csv';
    }
}