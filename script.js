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
window.onload = function () {
  $("#loader").fadeOut();
  $("body").removeClass("hidden");
};
document.addEventListener("DOMContentLoaded", function () {
  const houseImages = document.querySelectorAll(".house-img");

  houseImages.forEach((image) => {
    image.addEventListener("click", function () {
      const relatedData = this.getAttribute("data-related").split("|");
      const relatedContainer = document.getElementById("related-images");
      relatedContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevas imágenes y texto

      for (let i = 0; i < relatedData.length; i += 2) {
        const container = document.createElement("div");
        container.classList.add("related-container");

        const imgElement = document.createElement("img");
        imgElement.src = relatedData[i];
        imgElement.alt = "Related Image";
        imgElement.classList.add("related-img");

        container.appendChild(imgElement);

        // Verificar si hay texto disponible
        if (relatedData[i + 1]) {
          const textElement = document.createElement("p");
          textElement.textContent = relatedData[i + 1];
          textElement.classList.add("related-text");
          container.appendChild(textElement);
        }

        relatedContainer.appendChild(container);
      }

      // Desplazar la página hacia arriba hasta el elemento con el ID related_img
      const relatedImgContainer = document.getElementById("related_img");
      relatedImgContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
