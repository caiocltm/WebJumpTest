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
      option.text = category.nome;
      option.value = category.nome;
      inputCategory.appendChild(option);
    });
  });
 
  button.onclick = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:3000/product/add';
    
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

    fetch(url, { 
      method: 'POST', 
      body: JSON.stringify({
        nome: inputName.value,
        sku: inputSku.value,
        preco: inputPrice.value,
        quantidade: inputQuantity.value,
        descricao: inputDescription.value,
        categoria: categoriesSelected
      }) 
    })
    .then(async (response) => await response.text())
    .then(async (response) => {
      let result = JSON.parse(response);
      result.product ? resultPanel.style.backgroundColor = 'green' : resultPanel.style.backgroundColor = 'red';
      resultPanel.style.display = 'block';
      resultMessage.innerHTML = result.message;
      setTimeout(() => {
        resultPanel.style.display = 'none';
        resultMessage.innerHTML = '';
      }, 5000);
    });
  };
});