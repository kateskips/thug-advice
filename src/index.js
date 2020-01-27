document.addEventListener('DOMContentLoaded', () => {
  const adviceBtn = document.querySelector("#gotchu");
  const adviceCollection = document.querySelector(".advice-collection");
  const adviceForm = document.querySelector('#adviceForm');
  const typesRow = document.querySelector('#types');
  const typeCollection = document.querySelector('.type-collection');

  let saveAdvices = null;
  let saveAllAdvices = null;
  let saveTypes = null;
  let currentType = null;

  // fetch all the advice from the backend, regardless of category.
  // Returns a promise.
  fetch("http://localhost:3000/advices")
    // parse the response if/when it arrives as json.
    .then(resp => resp.json())
    // stores it in variable called arrayOfQuotes
    .then(arrayOfQuotes => {
      // when then is transfered into saveAllAdvices, which is null(empty)
      saveAllAdvices = arrayOfQuotes;
    })

  //created function called noAdviceDom 
  function noAdviceDom() {
    //Created an instance of the element for the specified tag + created a variable noAdviceDiv
    const noAdviceDiv = document.createElement("div");
    // creating a block with curly brackets(this limits the scope)
    // In this case, create an element and appendchild to that element with a TEXT.  
    {
      const c = document.createElement("h1");
      c.appendChild(document.createTextNode("Thug cannot help you."));
      noAdviceDiv.appendChild(c);
    }
    {
      const c = document.createElement("h3");
      c.appendChild(document.createTextNode("Got no advice, dawg."));
      noAdviceDiv.appendChild(c);
    }
    return noAdviceDiv;
  }

  // created a function called adviceDom. The same as noAdviceDom but with this it takes in advice in the parameters.
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
              <h1><u>${type.name_type} Advices</u></h1></div>`;
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
  }

  if (adviceForm != null) {
    const submitBtn = document.createElement("button");
    {
      submitBtn.setAttribute("class", "btn waves-effect waves-light");
      submitBtn.setAttribute("id", "submit");
      submitBtn.setAttribute("type", "submit");
      submitBtn.appendChild(document.createTextNode("submit"));
    }
    {
      const textLabel = document.createElement("label");
      const textInput = document.createElement("input");
      textInput.setAttribute("type", "text");
      textInput.setAttribute("name", "quote");
      textInput.setAttribute("id", "quote");
      textLabel.appendChild(document.createTextNode("Advice"));
      textLabel.appendChild(textInput);
      adviceForm.appendChild(textLabel);
    }
    fetch("http://localhost:3000/users")
      .then(resp => resp.json())
      .then(arrayOfTypes => {
        for (const type of arrayOfTypes) {
          const radioLabel = document.createElement("label");
          const radioButton = document.createElement("input");
          const span = document.createElement("span");
          const p = document.createElement("p");
          radioButton.setAttribute("name", "create-advice-type");
          radioButton.setAttribute("class", "with-gap");
          radioButton.setAttribute("type", "radio");
          adviceForm.appendChild(p);
          p.appendChild(radioLabel);
          radioLabel.appendChild(radioButton);
          span.appendChild(document.createTextNode(type.name_type));
          radioLabel.appendChild(span);
          adviceForm.appendChild(radioLabel);
        }
      })
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
        .then((responseJson) => {
          alert('You just submitted!');
          console.log(responseJson);
        })
    });
  }
})








