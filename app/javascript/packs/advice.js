class Advice {
  constructor(adviceDataObj) {
    this.id = adviceDataObj.id
    this.quote = adviceDataObj.quote
    this.user = new User(adviceDataObj.user)
  }

  // created a function called adviceDom. The same as noAdviceDom but with this it takes in advice in the parameters.
  renderDom() {
    const adviceDiv = document.createElement("div");
    adviceDiv.setAttribute("class", "advice-card");
    adviceDiv.innerHTML = `<h1>${this.quote}</h1>`;
    return adviceDiv;
  }

  //created function called noAdviceDom 
  static noAdviceDom() {
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
}