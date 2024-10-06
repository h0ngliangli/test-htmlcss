const toggleBtn = document.querySelector('#toggle-btn');
toggleBtn.addEventListener('click', function (){
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
})