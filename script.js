// /*=============== SHOW MENU ===============*/
// const navMenu = document.getElementById("nav-menu"),
//   navToggle = document.getElementById("nav-toggle"),
//   navClose = document.getElementById("nav-close");

// /* Menu show */
// navToggle.addEventListener("click", () => {
//   navMenu.classList.add("show-menu");
// });

// /* Menu hidden */
// navClose.addEventListener("click", () => {
//   navMenu.classList.remove("show-menu");
// });

// /*=============== SEARCH ===============*/
// const search = document.getElementById("search"),
//   searchBtn = document.getElementById("search-btn"),
//   searchClose = document.getElementById("search-close");

// /* Search show */
// searchBtn.addEventListener("click", () => {
//   search.classList.add("show-search");
// });

// /* Search hidden */
// searchClose.addEventListener("click", () => {
//   search.classList.remove("show-search");
// });

// /*=============== LOGIN ===============*/
// const login = document.getElementById("login"),
//   loginBtn = document.getElementById("login-btn"),
//   loginClose = document.getElementById("login-close");

// /* Login show */
// loginBtn.addEventListener("click", () => {
//   login.classList.add("show-login");
// });

// /* Login hidden */
// loginClose.addEventListener("click", () => {
//   login.classList.remove("show-login");
// });

function scrollToDirection(event) {
  const gallery = event.currentTarget.parentNode;
  const scrollAmount = gallery.clientWidth; // Ancho de un elemento, asumiendo que todos son iguales
  const totalWidth = gallery.scrollWidth;

  // Obtiene la posición del clic en relación con la imagen
  const clickX = event.clientX - event.target.getBoundingClientRect().left;
  
  // Calcula el nuevo desplazamiento considerando la posición del clic
  const newScrollLeft = gallery.scrollLeft + (clickX > event.target.clientWidth / 2 ? scrollAmount : -scrollAmount);

  // Si el nuevo desplazamiento es mayor que el ancho total, vuelve al principio
  const finalScroll = newScrollLeft >= totalWidth ? 0 : newScrollLeft;

  // Desplaza suavemente al nuevo punto
  gallery.scrollTo({
    left: finalScroll,
    behavior: 'smooth'
  });


 
}