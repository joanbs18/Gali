async function cargarSelect() {
  try {
    const response = await fetch("http://localhost:5400/api/proyecto/", {
      method: "GET",
    });
    const { proyectos } = await response.json();

    const selectElement = document.getElementById("proyecto");
    const selectElementUpdate = document.getElementById("proyecto__update");

    proyectos.forEach((proyecto) => {
      // Crear y agregar opción al primer select
      const option1 = document.createElement("option");
      option1.value = proyecto.idproyecto;
      option1.textContent = proyecto.nombre;
      selectElement.appendChild(option1);

      // Crear y agregar opción al segundo select
      const option2 = document.createElement("option");
      option2.value = proyecto.idproyecto;
      option2.textContent = proyecto.nombre;
      selectElementUpdate.appendChild(option2);
    });
  } catch (error) {
    console.error("Error al cargar los proyectos:", error);
  }
}

cargarSelect();
document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("descripcion").value;
  const proyecto = document.getElementById("proyecto").value;
  const imagen = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("descripcion", descripcion);
  formData.append("idproyecto", proyecto);
  formData.append("imagen", imagen);

  try {
    const response = await fetch("http://localhost:5400/api/proyectos/", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
    loadProjects(); // Cargar proyectos después de crear uno nuevo
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
  }
});

async function loadProjects() {
  const response = await fetch("http://localhost:5400/api/proyectos/");
  const { proyecto } = await response.json();
  console.log("proyecto");
  const projectsTable = document.getElementById("projectsTable");
  projectsTable.innerHTML = ""; // Limpiar proyectos previos

  // Crear encabezados de la tabla
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
  <th>Proyecto</th>
  <th>Descripción</th>
  <th>Imagen</th>`;
  projectsTable.appendChild(headerRow);

  proyecto.forEach((proyecto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${proyecto.nombre}</td>
      <td>${proyecto.imagen_descripcion}</td>
      <td>
          <img loading="lazy" src="/public/${proyecto.imagen}" alt="Imagen del proyecto" style="width: 100px; height: auto;">
      </td>
      <td>
        <svg onclick="abrirModal('${proyecto.idimagenproyecto}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#001aff" fill="none">
      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <svg class onclick="deleteProject(${proyecto.idimagenproyecto})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#ff0000" fill="none">
       <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
       <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg></td>`;
    projectsTable.appendChild(row);
  });
}

// Cargar proyectos al cargar la página
window.onload = loadProjects;

// Funciones para editar y eliminar proyectos
async function editProject(id) {
  try {
    const response = await fetch(`http://localhost:5400/api/proyectos/${id}`);
    const projecto = await response.json();

    const project = projecto.proyectos[0];

    console.log(project);

    // Rellenar los campos del formulario con los datos del proyecto
    document.getElementById("nombre").value = project.nombre;
    document.getElementById("descripcion").value = project.descripcion;
    document.getElementById("equipo").value = project.equipo;

    // Cambiar el botón a "Actualizar" y guardar el ID
    const btnSubmit = document.getElementById("btn-submit");
    btnSubmit.textContent = "Actualizar";
    btnSubmit.dataset.projectId = id;
  } catch (error) {
    console.error("Error al cargar el proyecto:", error);
  }
}

async function deleteProject(id) {
  if (confirm("¿Estás seguro de eliminar este proyecto?")) {
    try {
      const response = await fetch(
        `http://localhost:5400/api/proyectos/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
     
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
    loadProjects(); // Recargar la tabla
  }

}

document.getElementById("btn__update").addEventListener("click", async (e) => {
  e.preventDefault();
  const id = e.target.dataset.id; // Recuperamos el ID del proyecto
  const descripcion = document.getElementById("descripcion").value;
  const proyecto = document.getElementById("proyecto").value;
  const imagen = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("descripcion", descripcion);
  formData.append("idproyecto", proyecto);
  formData.append("imagen", imagen);

  try {
    const response = await fetch(`http://localhost:5400/api/proyectos/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al actualizar el proyecto");

    alert("Proyecto actualizado con éxito.");
    modal.style.display = "none";
    loadProjects();
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    alert("No se pudo actualizar el proyecto. Inténtalo nuevamente.");
  }
});

const modal = document.getElementById("modalForm");
const closeModalBtn = document.getElementById("closeModal");
let idProyecto;

async function abrirModal(idproyecto) {
  try {
    const response = await fetch(
      `http://localhost:5400/api/proyectos/proyectos/${idproyecto}`
    );
    const projecto = await response.json();
    console.log(projecto);

    const project = projecto.proyectos[0];

    // Rellenar los campos del formulario con los datos del proyecto
    document.getElementById("nombre_update").value = project.nombre;
    document.getElementById("descripcion_update").value = project.descripcion;
    document.getElementById("equipo_update").value = project.equipo;
  } catch (error) {
    console.error("Error al cargar el proyecto:", error);
  }
  modal.style.display = "flex";
  idProyecto = idproyecto;
}

// Cerrar el modal al hacer clic en el botón "Cerrar"
closeModalBtn.addEventListener("click", () => {
  // document.getElementById("nombre_update").value = "";
  // document.getElementById("descripcion_update").value = "";
  // document.getElementById("equipo_update").value = "";
  modal.style.display = "none";
});


document.getElementById("file_update").addEventListener("change", function (event) {
  const file = event.target.files[0]; // Obtiene el archivo seleccionado
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Mostrar vista previa
      const preview = document.getElementById("preview");
      preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa" style="max-width: 200px;"/>`;
    };

    reader.readAsDataURL(file); // Convierte el archivo a base64
  }
});
