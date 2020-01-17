document.addEventListener('DOMContentLoaded', () => {
  let adviceBtn = document.querySelector("#gotchu");
  let adviceCollection = document.querySelector(".advice-collection");
  let submitBtn = document.querySelector('#submit');
  let adviceForm = document.querySelector('#adviceForm')
  let saveAdvices = null;
 
  fetch('http://localhost:3000/advices')
        .then(resp => resp.json())
        .then(arrayOfQuotes => {
           saveAdvices = arrayOfQuotes;
  })
        
  if (adviceBtn != null) {
    adviceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let advice = saveAdvices[Math.floor(Math.random() * saveAdvices.length)]
      adviceCollection.innerHTML =
        `<div class="advice-card">
    <h1>${advice.quote}</h1>
    <h3>Advice for <u>${advice.user.name_type}</u></h3>
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
            'quote':
            'user_id'
          })
        }).then(response => response.json())
        alert('You just submitted!')
        .then((responseJson) => console.log(responseJson))
      });
    }
  }
    
})




  



