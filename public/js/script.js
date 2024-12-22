window.onload = function () {
  // Ocultar el loader y remover la clase 'hidden' del body
  $("#loader").fadeOut(); // Requiere jQuery para funcionar
  $("body").removeClass("hidden");
};

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
// Función para cargar proyectos con paginación
loadProjects();
let proyecto;
async function loadProjects() {
  try {
    const response = await fetch(`http://localhost:5400/api/proyecto`);
    const proyecto_response = await response.json();
    const proyectos = proyecto_response.proyectos;

    // Verificar si hay proyectos disponibles
    if (proyectos.length === 0) {
      console.log("No hay más proyectos.");
      return; // Si no hay proyectos, no hacer nada
    }

    const gallery = document.getElementById("gallery");

    let proyectoCont = 0;
    proyectos.forEach((proyecto) => {
      const projectElement = createProjectElement(proyecto, proyectoCont++);
      gallery.appendChild(projectElement);
    });
  
  } catch (error) {
    console.error("Error al cargar los proyectos:", error);
  }

}

// Función para crear un elemento del proyecto en la galería
function createProjectElement(proyecto, index) {
  const box = document.createElement("div");
  box.className = "box__gallery";

 
  const link = document.createElement("a");
  link.href = "#";

  const img = document.createElement("img");
  img.className = "house-img";
  img.loading = "lazy";
  img.src = `/public${proyecto.imagen}`;
  img.alt = proyecto.nombre;
 // img.setAttribute("data-aos", "fade-up");
  

  img.setAttribute("data-project-id", proyecto.idproyecto);

  // Evento click para cargar detalles del proyecto
  img.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      // Cambia la URL para incluir el ID y el nombre del proyecto

      // Obtiene y muestra los detalles del proyecto por ID
      await loadProjectDetailsById(proyecto);
    } catch (error) {
      console.error("Error al obtener detalles del proyecto:", error);
    }
  });

  link.appendChild(img);
  box.appendChild(link);
 
  return box;
}
async function loadProjectDetailsById(proyecto) {
  const idproyecto = proyecto.idproyecto;
  try {
    const response = await fetch(
      `http://localhost:5400/api/proyectos/proyectos/${idproyecto}`
    );
    const projectDetails = await response.json();
    console.log(projectDetails);
    // Actualiza el nombre del proyecto
    const projectName = document.getElementById("project-name");
    const descriptionProyect = document.getElementById("description__Proyect");
    projectName.textContent = proyecto.nombre;
    descriptionProyect.textContent = proyecto.descripcion;

    // Actualiza el equipo del proyecto
    const projectTeam = document.getElementById("project-team");
    projectTeam.textContent = `Equipo: ${proyecto.equipo}`;

    // Actualiza las imágenes relacionadas
    const relatedImagesContainer = document.getElementById("related-images");
    relatedImagesContainer.innerHTML = ""; // Limpia contenido previo

    projectDetails.proyecto.forEach((imagen, index) => {
      const imageElement = document.createElement("div");
      imageElement.classList.add("image-item");

      // Aplicar patrón cíclico: 0 -> 2 -> 1
      const columnSpanPattern = [2, 2, 1];
      const columnSpan = columnSpanPattern[index % columnSpanPattern.length];
      imageElement.style.gridColumn = `span ${columnSpan || 1}`;

      // Inserta el contenido HTML
      imageElement.innerHTML = `
        <img  loading="lazy"  src="/public${imagen.imagen}" alt="Imagen de ${imagen.nombre}" data-aos="fade-up">
        <p data-aos="fade-up">${imagen.imagen_descripcion}</p>
      `;
      relatedImagesContainer.appendChild(imageElement);
     
    });
  } catch (error) {
    console.error("Error al cargar los detalles del proyecto:", error);
  }

  document.getElementById('related_img').style.display= "flex";
  AOS.init({
    duration: 1200, // Duración de la animación
    easing: "ease", // Efecto de animación
    once: false, // Solo una vez
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   const houseImages = document.querySelectorAll(".house-img");

//   houseImages.forEach((image) => {
//     image.addEventListener("click", function () {
//       const projectName = this.getAttribute("data-project-name");
//       const projectNameId = document.getElementById("project-name");
//       projectNameId.textContent = "";
//       projectNameId.textContent = projectName;
//       const projectTeam = this.getAttribute("data-project-team");
//       const projectTeamId = document.getElementById("project-team");
//       projectTeamId.innerHTML = "<b>Equipo de trabajo<b><br>";
//       projectTeamId.innerHTML += projectTeam;

//       const container = document.querySelector(".container__house__related");
//       container.insertBefore(projectNameId, container.firstChild);

//       const relatedData = this.getAttribute("data-related").split("|");
//       const relatedContainer = document.getElementById("related-images");
//       relatedContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevas imágenes y texto
//       for (let i = 0; i < relatedData.length; i += 2) {
//         const container = document.createElement("div");
//         container.classList.add("related-container");

//         const imgElement = document.createElement("img");
//         imgElement.src = relatedData[i];
//         imgElement.alt = "Related Image";
//         imgElement.classList.add("related-img");
//         imgElement.setAttribute("onclick", "openImage(this)");

//         container.appendChild(imgElement);

//         // Verificar si hay texto disponible
//         if (relatedData[i + 1]) {
//           const textElement = document.createElement("p");
//           textElement.textContent = relatedData[i + 1];
//           textElement.classList.add("related-text");
//           container.appendChild(textElement);
//         }

//         relatedContainer.appendChild(container);
//       }

//       // Desplazar la página hacia arriba hasta el elemento con el ID related_img
//       const relatedImgContainer = document.getElementById("related_img");
//       relatedImgContainer.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     });
//   });
// });
