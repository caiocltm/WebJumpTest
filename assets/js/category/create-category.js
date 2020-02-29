document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementsByClassName("actions-form")[0].children[1];
  const inputName = document.getElementById("category-name");
  const inputCode = document.getElementById("category-code");
  const resultMessage = document.getElementById("result-message");
  const resultPanel = document.getElementById("result-panel");
  
  button.onclick = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:3000/category/add';

    fetch(url, { 
      method: 'POST', 
      body: JSON.stringify({
        nome: inputName.value,
        codigo: inputCode.value
      }) 
    })
    .then((response) => response.text())
    .then((body) => {
      let result = JSON.parse(body);
      result.category ? resultPanel.style.backgroundColor = 'green' : resultPanel.style.backgroundColor = 'red';
      resultPanel.style.display = 'block';
      resultMessage.innerHTML = result.message;
      setTimeout(() => {
        resultPanel.style.display = 'none';
        resultMessage.innerHTML = '';
      }, 5000);
    });
  };
});