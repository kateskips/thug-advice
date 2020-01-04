document.addEventListener('DOMContentLoaded', () => {
  let adviceBtn = document.querySelector("#gotchu");
  let adviceCollection = document.querySelector(".advice-collection");
  let submitBtn = document.querySelector('#submit');
  let saveAdvices = null;
 
  fetch('http://localhost:3000/advices')
        .then(resp => resp.json())
        .then(arrayOfQuotes => {
           saveAdvices = arrayOfQuotes;
  })
        
  adviceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let advice = saveAdvices[Math.floor(Math.random() * saveAdvices.length)]
    adviceCollection.innerHTML =
      `<div class="advice-card">
    <h1>${advice.quote}</h1>
    </div>`;
  })
 
  if (submitBtn != null) {
    submitBtn.addEventListener('submit', (event) => {
      event.preventDefault();
      fetch('http://localhost:3000/advices', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          quote: quote,
          user_id: 5
        })
      }).then(response => response.json())
        .then((responseJson) => console.log(responseJson))
    });
  }
})

  



