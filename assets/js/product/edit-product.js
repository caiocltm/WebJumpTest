document.addEventListener('DOMContentLoaded', () => {
  const divButton = document.getElementsByClassName("actions-form");
  const button = divButton[0].children[1];
  const inputSku = document.getElementById("sku");
  const inputName = document.getElementById("name");
  const inputPrice = document.getElementById("price");
  const inputQuantity = document.getElementById("quantity");
  const inputCategory = document.getElementById("category");
  const inputDescription = document.getElementById("description");
  const resultMessage = document.getElementById("result-message");
  const resultPanel = document.getElementById("result-panel");
  let categoriesFetched;

  const selectFileButton = document.getElementById('select-file-button');
  const selectFileInput = document.getElementById('product-image');
  const imageUploaded = document.getElementById('image-uploaded');
  const reader = new FileReader();
  let productImageFile; // Image uploaded reference.


  // Pick image uploaded to preview.
  function readImageUploaded(input) {
      reader.onload = function (e) {
        imageUploaded.setAttribute('src', e.target.result);
        imageUploaded.style.width = 150;
        imageUploaded.style.height = 200;
        imageUploaded.style.display = "block";
      };
      reader.readAsDataURL(input);
  }

  // Set click on input file.
  selectFileButton.onclick = (e) => {
    e.preventDefault();
    selectFileInput.click();
  };

  // Set onchange event.
  selectFileInput.onchange = (e) => {
    e.preventDefault();
    e.target.files && e.target.files[0] && (
      productImageFile = e.target.files[0],
      readImageUploaded(productImageFile)
    );
  };

  fetch('http://127.0.0.1:3000/categories/fetch', { method: 'GET' })
  .then(async (response) => await response.text())
  .then(async (response) => {
    categoriesFetched = JSON.parse(response).categories;
    categoriesFetched.forEach(category => {
      let option = document.createElement("option");
      option.text = category.nome.trim();
      option.value = category.nome.trim();
      inputCategory.appendChild(option);
    });
  });

  button.onclick = (e) => {
    e.preventDefault();

    let categoriesSelected = []; 
    if(inputCategory.selectedOptions.length > 1) {
      [...inputCategory.selectedOptions].forEach(category => {
        categoriesFetched.map(cat => {
          cat.nome === category.value && categoriesSelected.push(cat._id);
        });
      });
    } else {
      categoriesFetched.map(cat => {
        cat.nome === inputCategory.value && categoriesSelected.push(cat._id);
      });
    }

    const url = 'http://127.0.0.1:3000/product/update';
    
    const productData = new FormData();
    
    productData.append('nome', inputName.value);
    productData.append('sku', inputSku.value);
    productData.append('preco', inputPrice.value);
    productData.append('quantidade', inputQuantity.value);
    productData.append('descricao', inputDescription.value);
    productData.append('image', productImageFile, productImageFile.name.toString());
    productData.append('categoria', categoriesSelected);
    
    fetch(url, {
      method: 'PUT', 
      body: productData
    })
    .then(async (response) => await response.json())
    .then(async (result) => {
      result.product ? resultPanel.style.backgroundColor = 'green' : resultPanel.style.backgroundColor = 'red';
      resultPanel.style.display = 'block';
      resultMessage.innerHTML = result.message;
      setTimeout(() => {
        resultPanel.style.display = 'none';
        resultMessage.innerHTML = '';
      }, 5000);
    });
  };
})