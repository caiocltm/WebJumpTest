const categoryCode = require('uuid').v1;

module.exports = new class Transform {
    
    toObject(products) {
        let productObject = {};
        let productsArray = [];
        let categoriesArray = [];
        const headers = products[0];
        products.map(prod => {
            productObject[headers[0].trim()] = prod[0].trim();
            productObject[headers[1].trim()] = prod[1].trim();
            productObject[headers[2].trim()] = prod[2].trim();
            productObject[headers[3].trim()] = prod[3].trim();
            productObject[headers[4].trim()] = prod[4].trim();
            productObject['image'] = '/images/menu-go-jumpers.png';

            let categories = [...prod[5].split('|')];
            productObject[headers[5].trim()] = categories;

            categoriesArray.push(...categories);
            productsArray.push(Object.assign({}, productObject));
        });
        return {
            transformedProducts: productsArray.slice(1, productsArray.length), // Retornando todos os produtos, exceto o header.;
            categories: [
                ...new Set(
                    categoriesArray
                    .slice(1, categoriesArray.length)
                    .filter(category => category.length > 1)
                )
            ]
        } 
    }

    toCategoriesObject(categories) {
        let categoryModel = {};
        let categoriesArray = [];
        categories.map(category => {
            categoryModel['nome'] = category;
            categoryModel['codigo'] = categoryCode();
            categoriesArray.push(Object.assign({}, categoryModel));
        });
        return categoriesArray;
    }

    categoriesIdToProduct(products, categories) {
        products.forEach(product => {
            let categoriesTransformed = [];
            product.categoria.forEach((cat) => {
                let curId = categories[categories.findIndex(c => c.nome === cat)];
                curId ? categoriesTransformed.push(curId._id.toString()) : categoriesTransformed.push('');
            });
            product.categoria = categoriesTransformed.filter(category => category !== '' || category.length > 1);
        });
        return products;
    }

};