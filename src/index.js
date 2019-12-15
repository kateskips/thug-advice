document.addEventListener('DOMContentLoaded', () => {
  let adviceBtn = document.querySelector("#gotchu")

  let adviceCollection = document.querySelector(".advice-collection")
  
  
  adviceBtn.addEventListener('click', (e) => {
    //console.log('shit')
    e.preventDefault()
    fetch('http://localhost:3000/advices')
     

  })
});