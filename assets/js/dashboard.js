document.addEventListener('DOMContentLoaded', () => {
 
	const productsList = document.getElementsByClassName('product-list')[0];

	function productsToDOM(products) {
  
	  let li;
	  let divProduct;
	  let divProductName;
	  let divProductPrice;

	  products.forEach(product => {
		li = document.createElement("li");

		divProductName = document.createElement("div");
		divProductName.setAttribute('class', 'product-name');

		divProductPrice = document.createElement("div");
		divProductPrice.setAttribute('class', 'product-price');

		divProduct = document.createElement("div");
		divProduct.setAttribute('class', 'product-info');

		setNomeToDOM(product.nome);
		setPrecoToDOM(product.preco);

		li.append(divProduct);
		productsList.appendChild(li);
	  });
  
	  function setNomeToDOM(nome) {
		const span = document.createElement("span");
		span.innerHTML = nome;
		divProductName.append(span);
		divProduct.append(divProductName);
	  }
	

	  function setPrecoToDOM(preco) {
		const span = document.createElement("span");
		span.innerHTML = `R$\n ${preco}`;
		divProductPrice.append(span);
		divProduct.append(divProductPrice);
	  }
  
	}
  
	(() => {
	  const url = 'http://127.0.0.1:3000/products/fetch';
	  fetch(url, { method: 'GET' })
	  .then(async (response) => await response.json())
	  .then(async ({ products }) => productsToDOM(products));
	})();
  
});