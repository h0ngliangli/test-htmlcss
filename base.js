const body = document.querySelector("body")

// Pick up the theme from the local storage
const theme = localStorage.getItem("theme")
if (theme === "dark") {
  body.classList.add("dark-mode")
  loadCSS("lib/highlightjs.dark.css")
} else {
  body.classList.remove("dark-mode")
  loadCSS("lib/highlightjs.light.css")
}

const btnToggleTheme = document.querySelector("#button-toggle-theme")
btnToggleTheme.addEventListener("click", function () {
  body.classList.toggle("dark-mode")

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
    unloadCSS("lib/highlightjs.light.css")
    loadCSS("lib/highlightjs.dark.css")
  } else {
    localStorage.setItem("theme", "light")
    unloadCSS("lib/highlightjs.dark.css")
    loadCSS("lib/highlightjs.light.css")
  }
})

const liPages = document.querySelectorAll("main nav ul li")
const secContentArea = document.querySelector("#section-content-area")
const lastAccessPage = localStorage.getItem("lastAccessPage")
liPages.forEach((liPage) => {
  liPage.addEventListener("click", function (event) {
    event.preventDefault()
    const url = liPage.children[0].href
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        secContentArea.innerHTML = html
        localStorage.setItem("lastAccessPage", url)
        hljs.highlightAll()
      })
  })
  if (lastAccessPage && liPage.children[0].href === lastAccessPage) {
    liPage.click()
  }
})

const inputSearch = document.querySelector("main > nav > input")
inputSearch.addEventListener("input", function () {
  const searchText = inputSearch.value.toLowerCase()
  liPages.forEach((liPage) => {
    const text = liPage.textContent.toLowerCase()
    if (text.includes(searchText)) {
      liPage.style.display = "block"
    } else {
      liPage.style.display = "none"
    }
  })
})
inputSearch.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    inputSearch.value = ""
  }
    liPages.forEach((liPage) => { 
        liPage.style.display = "block"
    })
})
inputSearch.addEventListener("focus", function () {
  inputSearch.select()
})

function loadCSS(url) {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = url
  document.head.appendChild(link)
  console.log(`CSS loaded: ${url}`)
}

function unloadCSS(url) {
  const link = document.querySelector(`link[href="${url}"]`)
  if (link) {
    link.remove()
    console.log(`CSS unloaded: ${url}`)
  } else {
    console.log(`CSS not found: ${url}`)
  }
}
