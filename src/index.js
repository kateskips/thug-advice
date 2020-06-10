document.addEventListener('DOMContentLoaded', () => {
  const adviceBtn = document.querySelector("#gotchu");
  const adviceCollection = document.querySelector(".advice-collection");
  const adviceForm = document.querySelector('#adviceForm');
  const typesRow = document.querySelector('#types');
  const typeCollection = document.querySelector('.type-collection');
  const sorting = document.querySelector('#sorting')
  const sortedCollection = document.querySelector(".sorted-collection")

  let saveAdvices = null;
  let saveAllAdvices = null;
  let saveTypes = null;
  let currentType = null;
  
  // temporary coding exercise
  sorting.addEventListener('click', (event) => {
    //console.log('hell yeah');
    fetch("http://localhost:3000/advices")
      .then(resp => resp.json())
      .then(quotes => {
        quotes = quotes.map(x => new Advice(x))
        quotes.sort((a, b) => {
          var quoteA = a.quote.toUpperCase(); // ignore upper and lowercase
          var quoteB = b.quote.toUpperCase(); // ignore upper and lowercase
          if (quoteA < quoteB) {
            return -1;
          }
          if (quoteA > quoteB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        // console.log(quotes);
        for (const quote of quotes) {
          sortedCollection.innerHTML +=
            `<div class="sorting-card">
          <h1>${quote.quote}</h1></div>`;
          console.log(quote);
        }
      })
  }) 




  // fetch all the advice from the backend, regardless of category.
  // Returns a promise.
  fetch("http://localhost:3000/advices")
    // parse the response if/when it arrives as json.
    .then(resp => resp.json())
    // stores it in variable called arrayOfQuotes
    .then(arrayOfQuotes => {
      // when then is transfered into saveAllAdvices, which is null(empty)
      saveAllAdvices = arrayOfQuotes.map(x => new Advice(x));
    })

  // fetch all the users from the backend
  // Returns a promise.
  if (typesRow != null) {
    fetch('http://localhost:3000/users')
      // parse the response if/when it arrives as json.
      .then(resp => resp.json())
      // stores it in a variable called arrayOfTypes
      .then(arrayOfTypes => {
        //which is then transfered in a for/of loop
        for (const type of arrayOfTypes) {
          // This involves the DOM which we create data types -- in this case creating an element name 'button'
          const b = document.createElement("button")
          b.setAttribute("class", "waves-effect waves-light btn-large");
          b.appendChild(document.createTextNode(type.name_type));
          //After setting the button's attributes, we appendChild it onto the DOM with a text which goes into the backend table of name_type
          b.addEventListener('click', (e) => {
            e.preventDefault();
            typeCollection.innerHTML =
              `<div class="type-card">
              <h1><u>${type.name_type} Advices</u></h1></div>`;
            fetch(`http://localhost:3000/advices?user_id=${type.id}`)
              .then(resp => resp.json())
              .then(arrayOfQuotes => {
                if (arrayOfQuotes.length == 0) {
                  typeCollection.appendChild(Advice.noAdviceDom());
                }
                for (const advice of arrayOfQuotes.map(x => new Advice(x))) {
                  typeCollection.appendChild(advice.renderDom());
                  console.log(advice.renderDom())
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
        card = Advice.noAdviceDom();
      } else {
        const advice = saveAllAdvices[Math.floor(Math.random() * saveAllAdvices.length)];
        card = advice.renderDom();
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
          radioButton.setAttribute("value", type.id);
          adviceForm.appendChild(p);
          p.appendChild(radioLabel);
          radioLabel.appendChild(radioButton);
          span.appendChild(document.createTextNode(type.name_type));
          radioLabel.appendChild(span);
        }
        adviceForm.appendChild(submitBtn);
      });

    adviceForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const adviceFormData = new FormData(adviceForm);
      const quoteVal = adviceFormData.get('quote');
      if (quoteVal == '') {
        alert("quote cannot be empty. C'mon dawg nobody wants to hear that.")
        return
      }
      const typeVal = adviceFormData.get('create-advice-type');
      if (typeVal == null) {
        alert("Need to pick a type")
        return
      }
      fetch('http://localhost:3000/advices', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          quote: quoteVal,
          user_id: typeVal,
        })
      }).then(response => response.json())
        .then((responseJson) => {
          alert('You just submitted!');
          console.log(responseJson);
        })
    });
  }
})








