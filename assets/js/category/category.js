document.addEventListener('DOMContentLoaded', () => {
 
  function setCategoryDOM(nome, codigo) {
    const tr = document.createElement("tr");
    tr.setAttribute("class", "data-row");
    const lastParent = document.getElementsByTagName("tbody")[0];

    function setNomeToDOM() {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = nome;
  
      td.append(span);
      tr.append(td);
    }
  
    function setCodigoToDOM() {
      const td = document.createElement("td");
      const span = document.createElement("span");
      
      td.setAttribute("class", "data-grid-td");
      span.setAttribute("class", "data-grid-cell-content");
      span.innerHTML = codigo;
  
      td.append(span);
      tr.append(td);
    }
  
    function categoryActions() {
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
      a.setAttribute("href", "/editCategory");
      a.innerHTML = "Edit";
      divTwo.append(a);
      divOne.append(divTwo);
  
      divThree.setAttribute("class", "action delete");
      aTwo.setAttribute("href", "/deleteCategory");
      aTwo.innerHTML = "Delete";
      divThree.append(aTwo);
      divOne.append(divThree);
      
      tr.append(td);
    }

    setNomeToDOM();
    setCodigoToDOM();
    categoryActions();
    lastParent.append(tr);
  }

  function callApi() {    
    fetch('http://127.0.0.1:3000/categories/fetch', { method: 'GET' })
    .then(async (response) => {
        const { categories } = await response.json();
        categories.forEach((s) => setCategoryDOM(s.nome, s.codigo));
    });
  }

  callApi(); 
});