document.addEventListener('DOMContentLoaded', () => {
  let adviceBtn = document.querySelector("#gotchu");
  let adviceCollection = document.querySelector(".advice-collection");
  let submitBtn = document.querySelector('#submit');
  let adviceForm = document.querySelector('#adviceForm');
  let saveAdvices = null;
  let saveTypes = null;
  const typesRow = document.querySelector('#types');
  let typeCollection = document.querySelector('.type-collection');
  let currentType = null;
  
  if (typesRow != null) {
    fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(arrayOfTypes => {
        for (const type of arrayOfTypes) {
          const b = document.createElement("button")
          b.setAttribute("class", "waves-effect waves-light btn-large");
          b.appendChild(document.createTextNode(type.name_type));
          b.addEventListener('click', (e) => {
            e.preventDefault();
            typeCollection.innerHTML =
              `<div class="type-card">
              <h1>${type.name_type}</h1></div>`;
            fetch(`http://localhost:3000/advices?user_id=${type.id}`)
              .then(resp => resp.json())
              .then(arrayOfQuotes => {
                saveAdvices = arrayOfQuotes;
              })
          })
          typesRow.appendChild(b);
        }
      })
  }
        
  if (adviceBtn != null) {
    adviceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (saveAdvices == null)
        return;
      if (saveAdvices.length == 0) {
        adviceCollection.innerHTML = '';
        {
          const c = document.createElement("h3");
          c.appendChild(document.createTextNode("Thug cannot help you"));
          adviceCollection.appendChild(c);
        }
        {
          const c = document.createElement("p");
          c.appendChild(document.createTextNode("Got no advice, dawg."));
          adviceCollection.appendChild(c);
        }
      } else {
        let advice = saveAdvices[Math.floor(Math.random() * saveAdvices.length)]
        adviceCollection.innerHTML =
          `<div class="advice-card">
    <h1>${advice.quote}</h1>
    <h3>Advice for <u>${advice.user.name_type}</u></h3>
    </div>`;
      }
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




  



