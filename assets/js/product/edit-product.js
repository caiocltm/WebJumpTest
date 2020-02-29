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
    
    const query = JSON.stringify({
      nome: inputName.value.trim(),
      sku: inputSku.value.trim(),
      preco: inputPrice.value.trim(),
      quantidade: inputQuantity.value.trim(),
      descricao: inputDescription.value.trim(),
      categoria: categoriesSelected
    });
    
    fetch(url, {
      method: 'PUT', 
      body: query
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