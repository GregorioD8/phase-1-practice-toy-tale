

let addToy = false;
let lastId = 0

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('form')
  
  //event listeners
 toyFormContainer.addEventListener('submit', handleSubmit)

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


//DOM render function
function renderOneToy(toy){
  //build toy
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar"<img>
  <p>${toy.likes} likes</p>
  <button class="like-btn" id="${toy.id}">Like ♥</button> 
  `
  //logs a new like
  card.querySelector(`.like-btn`).addEventListener('click', () => {
    toy.likes+=1
    card.querySelector('p').textContent = `${toy.likes} likes`
    updateLikes(toy)
  })
  toyDiv = document.querySelector('#toy-collection').append(card)
  lastId = toy.id
}

//gets all toys already on the server
function getAlltoys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toys => renderOneToy(toys)))
}


//event handlers
function handleSubmit(e){
  e.preventDefault()
let newId = lastId +1
  let toyObj = {
    id: newId,
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  addNewToy(toyObj)
  renderOneToy(toyObj)
  form.reset()
}


//adds a new toy 
function addNewToy(toyObj) {
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
 
  .then(res => res.json())
  .then(toy => console.log(toy))
}


//updates the number of likes
function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
  method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
} 


function initialize(){
  getAlltoys()
}
initialize()

