document.getElementById("btn_login").addEventListener("click", async (e) => {
  e.preventDefault(); // Evitar el comportamiento por defecto del formulario

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Hacer el fetch para el login
  const response = await fetch("http://localhost:5400/api/ingresar/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  const data = await response.json();

  

  if (response.ok) {
   window.location.href = "http://localhost:5400/proyectos"
  } else {
    document.getElementById("message").textContent = data.error;
    password.value = "";
  }
});


