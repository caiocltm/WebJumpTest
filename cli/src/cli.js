#!/usr/bin/env node

const inquirer = require('inquirer');

// Helpers Modules.
const ReadFile = require('./read');
const validate = require('./validate_cli')
const Transform = require('./transform');

// Database Initialization.
const database = require('../../database/database');

// Models
const Product = require('../../database/models/product.model');
const Category = require('../../database/models/category.model');

module.exports = new class CLI {

    constructor() {
        database.connect('mongodb://127.0.0.1:27017/webjump')
        .then(_ => this.makeTheQuestion())
        .catch(err => console.log(error));
    }

    async readFile(filePath) {
        try{         

            console.time('\n* Initializing read process...');
            const products = await ReadFile.csv(filePath, ';');
            
            if(products && products.length > 0) {

                console.timeEnd('\n* Initializing read process...');

                let categories = {};
                let transformedProducts = {};
                let transformedCategories = {};
                
                console.time('\n* Initializing products and categories transformation (spliting)...');
                ({ transformedProducts, categories } = Transform.toObject(products));
                console.timeEnd('\n* Initializing products and categories transformation (spliting)...');

                console.time('\n* Initializing categories transformation (to model pattern)...');
                transformedCategories = Transform.toCategoriesObject(categories);
                console.timeEnd('\n* Initializing categories transformation (to model pattern)...');


                console.time('\n* Deleting all data from Products and Categories database...');
                // Deleting all data.                
                await Product.deleteMany();
                await Category.deleteMany();
                console.timeEnd('\n* Deleting all data from Products and Categories database...');

                console.time('\n* Inserting all Category data readed to Categories database...');
                let categoriesInserted = await Category.insertMany(transformedCategories);
                console.timeEnd('\n* Inserting all Category data readed to Categories database...');

                console.time('\n* Transforming categories on products to valid _id attribute...');
                let productsValidated = Transform.categoriesIdToProduct(transformedProducts, categoriesInserted);
                console.timeEnd('\n* Transforming categories on products to valid _id attribute...');

                console.time('\n* Inserting all Product data readed to Products database...');
                await Product.insertMany(productsValidated);
                console.timeEnd('\n* Inserting all Product data readed to Products database...');

                console.info(`\n** Categories inserted -> ${transformedCategories.length}`)
                console.info(`** Products inserted -> ${productsValidated.length}`)
                process.exit(0);
            } else {
                this.fileIsEmpty();
            }
        } catch(error) {
            console.log('Error: ', error);
            process.exit(0);
        }
    }

    invalidPath() {
        inquirer
        .prompt([
            { 
                type: 'input', 
                message: 'Informed path doesn\'t exist, please inform a valid path => ', 
                name: 'filePath' 
            }
        ])
        .then(async ({ filePath }) => validate.answer(filePath) ? this.readFile(filePath) : this.invalidPath());
    }

    fileIsEmpty() {
        inquirer
        .prompt([
            { 
                type: 'input', 
                message: 'Provided CSV file is empty, please inform a valid file => ', 
                name: 'filePath' 
            }
        ])
        .then(async ({ filePath }) => validate.answer(filePath) ? this.readFile(filePath) : this.invalidPath());
    }

    makeTheQuestion() {
        inquirer
        .prompt([
            { 
                type: 'input', 
                message: 'Inform the .csv file path to import => ', 
                name: 'filePath' 
            }
        ])
        .then(async ({ filePath }) => validate.answer(filePath) ? this.readFile(filePath) : this.invalidPath());
    }

}

