const body = document.querySelector("body")

// Pick up the theme from the local storage
const theme = localStorage.getItem("theme")
if (theme === "dark") {
  body.classList.add("dark-mode")
} else {
  body.classList.remove("dark-mode")
}

const btnToggleTheme = document.querySelector("#button-toggle-theme")
btnToggleTheme.addEventListener("click", function () {
  body.classList.toggle("dark-mode")
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

const liPages = document.querySelectorAll("#ul-table-of-content li")
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
      })
  })
  if (lastAccessPage && liPage.children[0].href === lastAccessPage) {
    liPage.click()
  }
})
