const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', ()=> {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});


const navBar = document.querySelector('.navbar');

document.addEventListener("scroll", (e) => {
    const scrolled = document.scrollingElement.scrollTop;

    if(scrolled > 50){
        navBar.classList.add('scrolled');
    } else{
        navBar.classList.remove('scrolled');
    }
});