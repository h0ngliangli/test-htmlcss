const toggleBtn = document.querySelector("#toggle-btn")
toggleBtn.addEventListener("click", function () {
  const body = document.querySelector("body")
  body.classList.toggle("dark-mode")
})

const categoryItems = document.querySelectorAll("#ul-category-area li")
const contentArea = document.querySelector("#section-content-area")
categoryItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    const url = item.children[0].href
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        contentArea.innerHTML = html
      })
  })
})
