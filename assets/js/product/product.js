document.addEventListener('DOMContentLoaded', () => {
 
  function productsToDOM(products) {

    let tr;
    let lastParent;
    products.forEach(product => {
      tr = document.createElement("tr");
      tr.setAttribute("class", "data-row");
      lastParent = document.getElementsByTagName("tbody")[0];
  
      setNomeToDOM(product.nome);
      setSkuToDOM(product.sku);
      setPrecoToDOM(product.preco);
      setQuantidadeToDOM(product.quantidade);
      setCategoriasToDOM(product.categoria);
      setActionsToDOM();
      lastParent.append(tr);
    });

    function setNomeToDOM(nome) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = nome;
  
      td.append(span);
      tr.append(td);
    }
  
    function setSkuToDOM(sku) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = sku;
  
      td.append(span);
      tr.append(td);
    }

    function setPrecoToDOM(preco) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = `R$\n ${preco}`;
  
      td.append(span);
      tr.append(td);
    }

    function setQuantidadeToDOM(quantidade) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = quantidade;
  
      td.append(span);
      tr.append(td);
    }
  
    function setCategoriasToDOM(categorias) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");

      categorias.length > 1 ? 
      categorias.map((categoria, index) => {
        if(index < categorias.length - 1) span.innerHTML += categoria.nome + ' | ';
        else span.innerHTML += categoria.nome
      }) : 
      span.innerHTML += categorias[0];
  
      td.append(span);
      tr.append(td);
    }

    function setActionsToDOM() {
      const td = document.createElement("td");
      const a = document.createElement("a");
      const aTwo = document.createElement("a");
      const divOne = document.createElement("div");
      const divTwo = document.createElement("div");
      const divThree = document.createElement("div");
  
      td.setAttribute("class", "data-grid-td");
      divOne.setAttribute("class", "actions");
      td.append(divOne);
      
      divTwo.setAttribute("class", "action edit");
      a.setAttribute("href", "/editProduct");
      a.innerHTML = "Edit";
      divTwo.append(a);
      divOne.append(divTwo);
  
      divThree.setAttribute("class", "action delete");
      aTwo.setAttribute("href", "/deleteProduct");
      aTwo.innerHTML = "Delete";
      divThree.append(aTwo);
      divOne.append(divThree);
      tr.append(td);
    }
  }

  (() => {
    const url = 'http://127.0.0.1:3000/products/fetch';
    fetch(url, { method: 'GET' })
    .then(async (response) => await response.json())
    .then(async ({ products }) => productsToDOM(products));
  })();

});