const API_URL =
  "https://api.hyrule-compendium.com/v3/compendium/category/monsters";
  
const nombresDestacados = [
  "lynel",
  "hinox",
  "guardian stalker",
  "bokoblin",
  "moblin",
];

async function cargarMonstruos() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

  const datos = await respuesta.json();
  const monstruosDestacados = nombresDestacados.map((nombre) => {
    const monstruo = datos.data.find(
      (entrada) => entrada.name.toLowerCase() === nombre,
    );

    if (!monstruo) {
      throw new Error(`No se encontró el monstruo: ${nombre}`);
    }

    return monstruo;
  });

  const seccion = document.querySelector("#monstruos-destacados");
  const tarjetas = seccion?.querySelectorAll(".cont-cards");

  if (!seccion || !tarjetas || tarjetas.length !== monstruosDestacados.length) {
    throw new Error("No se encontró el contenedor para las cards de monstruos.");
  }

  monstruosDestacados.forEach((monstruo, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card h-100 shadow-sm";

    const imagen = document.createElement("img");
    imagen.className = "card-img-top";
    imagen.src = monstruo.image;
    imagen.alt = `Imagen de ${monstruo.name}`;
    imagen.loading = "lazy";
    tarjeta.append(imagen);

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title h5 text-capitalize";
    titulo.textContent = monstruo.name;
    cuerpo.append(titulo);

    if (monstruo.common_locations?.length) {
      const ubicaciones = document.createElement("p");
      ubicaciones.className = "card-text";

      const etiquetaUbicaciones = document.createElement("strong");
      etiquetaUbicaciones.textContent = "Ubicación: ";
      ubicaciones.append(
        etiquetaUbicaciones,
        document.createTextNode(monstruo.common_locations.join(", ")),
      );
      cuerpo.append(ubicaciones);
    }

    tarjeta.append(cuerpo);

    const cartaOculta = document.createElement("div");
    cartaOculta.className = "card h-100 bg-dark text-white carta-oculta";

    const cuerpoOculto = document.createElement("div");
    cuerpoOculto.className = "card-body";
    
    const tituloOculto = document.createElement("h3");
    tituloOculto.className = "card-title h5 text-capitalize";
    tituloOculto.textContent = monstruo.name;
    cuerpoOculto.append(tituloOculto);
    
    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = monstruo.description;
    cuerpoOculto.append(descripcion);

    cartaOculta.append(cuerpoOculto);

    const contenedor = tarjetas[indice];
    contenedor.replaceChildren(tarjeta, cartaOculta);
    contenedor.addEventListener("mouseenter", () => {
      cartaOculta.classList.add("visible");
    });
    contenedor.addEventListener("mouseleave", () => {
      cartaOculta.classList.remove("visible");
    });
  });
}

cargarMonstruos().catch((error) => {
  console.error("No se pudieron cargar los monstruos:", error);
  const seccion = document.querySelector("#monstruos-destacados");

  if (seccion) {
    const mensaje = document.createElement("p");
    mensaje.className = "alert alert-danger";
    mensaje.setAttribute("role", "alert");
    mensaje.textContent =
      "No se pudieron cargar los monstruos. Intenta actualizar la página.";
    seccion.append(mensaje);
  }
});
