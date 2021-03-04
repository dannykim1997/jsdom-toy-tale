document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

fetchToys();

function fetchToys() {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => renderOneToy(toy)))
    .catch(error => console.log("error"))
}

const container = document.querySelector("#toy-collection")

function renderOneToy(toy) {
  const card = document.createElement("div")
  card.className = "card"
  card.id = toy.id

  //innerHTML Method
  // card.innerHTML = 
  // `<h2>Woody</h2>
  // <img src=toy_image_url class="toy-avatar" />
  // <p>4 Likes </p>
  // <button class="like-btn">Like <3</button>`

  const toyName = document.createElement("h2")
  const img = document.createElement("img")
  img.className = "toy-avatar"
  const p = document.createElement("p")
  const button = document.createElement("button")
  button.className = "like-btn"

  toyName.textContent = toy.name
  img.src = toy.image
  p.textContent = toy.likes
  button.textContent = "Like"

  // card.appendChild(toyName, img, p, button)
  
  card.appendChild(toyName)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)

  container.appendChild(card)

  card.querySelector(".like-btn").addEventListener("click", handleClick)
}

const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let toyObj = {
  name: e.target.name.value,
  image: e.target.image.value,
  likes: 0
  } 
  addToys(toyObj);
})

function addToys(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj),
    })
    .then(response => response.json())
    .then(toy => renderOneToy(toy))
    .catch(errors => console.log(errors))
  }

function handleClick(e) {
  let like = e.target.previousElementSibling.innerText
  let id = e.target.parentElement.id
  let newLike = parseInt(like) + 1
  let toyLikeObj = {
    likes: newLike
  }
  updateLikes(toyLikeObj, id)
}

function updateLikes(toyLikeObj, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyLikeObj),
  }) 
  .then(response => response.json())
  // .then(toy => updateDomLikes(toy.id, toy.likes))
  .then(toy => updateDomLikes(toy.id, toy.likes))
  .catch(error => console.log(error))
}

function updateDomLikes(id, likes) {
  let card = document.getElementById(id);
  card.querySelector("p").innerText = likes
}

});