+document.addEventListener('DOMContentLoaded', () => {
  const divButton = document.getElementsByClassName("actions-form");
  const button = divButton[0].children[1];
  const inputSku = document.getElementById("sku");
  const resultMessage = document.getElementById("result-message");
  const resultPanel = document.getElementById("result-panel");

  button.onclick = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:3000/product/delete';
    
    fetch(url, {
      method: 'DELETE', 
      body: JSON.stringify({
        sku: inputSku.value
      })
    })
    .then(async (response) => {
        const result = await response.json();
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