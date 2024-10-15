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
        // 不用 innerHTML 是因為裡面有 script 標籤，
        // 默认情况下浏览器不会执行其中的script标签
        setInnerHTML(secContentArea, html)
        localStorage.setItem("lastAccessPage", url)
        hljs.highlightAll()
        console.log(`Page loaded: ${url}`)
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

document.addEventListener("keydown", function (event) {
  if (event.key == "/") {
    inputSearch.focus()
    event.preventDefault()
  }
  if (event.key == "Tab") {
    divFoldNav.click()
    event.preventDefault()
  }
})

const nav = document.querySelector("main > nav")
console.log(nav.offsetWidth)
// set --nav-width
// nav.style.setProperty("--nav-width", `${nav.offsetWidth}px`)
const divFoldNav = document.getElementById("div-fold-nav")
document.getElementById("div-fold-nav").addEventListener("click", function () {
  if (nav.classList.contains("fold")) {
    divFoldNav.textContent = ">"
    nav.classList.remove("fold")
    nav.classList.add("unfold")
  } else {
    divFoldNav.textContent = "<"
    nav.classList.remove("unfold")
    nav.classList.add("fold")
  }
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
// copied from: https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml
function setInnerHTML(elm, html) {
  elm.innerHTML = html

  Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
    const newScriptEl = document.createElement("script")

    Array.from(oldScriptEl.attributes).forEach((attr) => {
      newScriptEl.setAttribute(attr.name, attr.value)
    })

    const scriptText = document.createTextNode(oldScriptEl.innerHTML)
    newScriptEl.appendChild(scriptText)

    oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl)
  })
}
