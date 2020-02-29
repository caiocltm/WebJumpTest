document.addEventListener('DOMContentLoaded', () => {
 
	const productsList = document.getElementsByClassName('product-list')[0];
	const infor = document.getElementsByClassName('infor')[0];
	
	function productsToDOM(products) {
  
	  let li;
	  let divProduct;
	  let divProductName;
	  let divProductPrice;
	  let divProductImage;

	  products.forEach(product => {
		li = document.createElement("li");
		divProduct = document.createElement("div");
		divProduct.setAttribute('class', 'product-info');

		divProductName = document.createElement("div");
		divProductName.setAttribute('class', 'product-name');

		divProductPrice = document.createElement("div");
		divProductPrice.setAttribute('class', 'product-price');

		divProductPrice = document.createElement("div");
		divProductPrice.setAttribute('class', 'product-price');
		
		divProductImage = document.createElement("div");
		divProductImage.setAttribute('class', 'product-image');

		setNomeToDOM(product.nome);
		setPrecoToDOM(product.preco);
		setQuantidadeToDOM(products.length, product.quantidade);
		setImageToDOM(product.image);

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

	  function setQuantidadeToDOM(quantidadeTotal, quantidadeProduto) {
		const span = document.createElement("span");
		span.setAttribute('class', 'special-price');
		span.innerHTML = ` ${quantidadeProduto} available`;
		infor.innerHTML = `You have ${quantidadeTotal} products added on this store: 
							<a href="/addProduct" class="btn-action">Add new Product</a>`;
		divProductPrice.append(span);
		divProduct.append(divProductPrice);
	  }

	  function setImageToDOM(image) {
		const imgProduct = document.createElement("img");
		imgProduct.setAttribute('layout', 'responsive');
		imgProduct.setAttribute('width', '164');
		imgProduct.setAttribute('heigth', '145');
		imgProduct.setAttribute('src', image);
		divProductImage.append(imgProduct);
		li.append(divProductImage);
	  }
	}
  
	(() => {
	  const url = 'http://127.0.0.1:3000/products/fetch';
	  fetch(url, { method: 'GET' })
	  .then(async (response) => await response.json())
	  .then(async ({ products }) => productsToDOM(products));
	})();
  
});