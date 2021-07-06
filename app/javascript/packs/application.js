/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

console.log('Hello World from Webpacker')

import { Advice } from './advice.js';
import { User } from './user.js';

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
  fetch("/advices")
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
    fetch('/users')
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
            fetch(`/advices?user_id=${type.id}`)
              .then(resp => resp.json())
              .then(arrayOfQuotes => {
                if (arrayOfQuotes.length == 0) {
                  typeCollection.appendChild(Advice.noAdviceDom());
                }
                for (const advice of arrayOfQuotes.map(x => new Advice(x))) {
                  typeCollection.appendChild(advice.renderDom());
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
    fetch("/users")
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
      fetch('/advices', {
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








