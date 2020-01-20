document.addEventListener('DOMContentLoaded', () => {
  let adviceBtn = document.querySelector("#gotchu");
  let adviceCollection = document.querySelector(".advice-collection");
  let submitBtn = document.querySelector('#submit');
  let adviceForm = document.querySelector('#adviceForm');
  let saveAdvices = null;
  let saveAllAdvices = null;
  let saveTypes = null;
  const typesRow = document.querySelector('#types');
  let typeCollection = document.querySelector('.type-collection');
  let currentType = null;
  
  fetch("http://localhost:3000/advices")
    .then(resp => resp.json())
    .then(arrayOfQuotes => {
      saveAllAdvices = arrayOfQuotes;
    })
  
  function noAdviceDom() {
    const noAdviceDiv = document.createElement("div");
    {
      const c = document.createElement("h3");
      c.appendChild(document.createTextNode("Thug cannot help you"));
      noAdviceDiv.appendChild(c);
    }
    {
      const c = document.createElement("p");
      c.appendChild(document.createTextNode("Got no advice, dawg."));
      noAdviceDiv.appendChild(c);
    }
    return noAdviceDiv;
  }
  
  function adviceDom(advice) {
    const adviceDiv = document.createElement("div");
    adviceDiv.setAttribute("class", "advice-card");
    adviceDiv.innerHTML = `<h1>${advice.quote}</h1>`;
    return adviceDiv;
  }
  
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
                if (arrayOfQuotes.length == 0) {
                  typeCollection.appendChild(noAdviceDom());
                }
                for (const advice of arrayOfQuotes) {
                  typeCollection.appendChild(adviceDom(advice));
                }
              }) 
          })
          typesRow.appendChild(b);
        }
      })
  }
        
  if (adviceBtn != null) {
    adviceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (saveAllAdvices == null)
        return;
      adviceCollection.innerHTML = '';
      let card;
      if (saveAllAdvices.length == 0) {
        card = noAdviceDom();
      } else {
        const advice = saveAllAdvices[Math.floor(Math.random() * saveAllAdvices.length)];
        card = adviceDom(advice);
        const h3 = document.createElement("h3");
        h3.innerHTML = `Advice for <u>${advice.user.name_type}</u>`;
        card.appendChild(h3);
      }
      adviceCollection.appendChild(card);
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




  



