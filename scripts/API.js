const API_URL =
  "https://api.hyrule-compendium.com/v3/compendium/category/monsters";

const prefijosVariantes = [
  "fire-breath",
  "ice-breath",
  "blue-maned",
  "white-maned",
  "red-maned",
  "black-maned",
  "electric",
  "silver",
  "savage",
  "mighty",
  "decayed",
  "cursed",
  "black",
  "blue",
  "fire",
  "forest",
  "frost",
  "gold",
  "green",
  "igneo",
  "ice",
  "meteo",
  "red",
  "rock",
  "snow",
  "stone",
  "thunder",
  "treasure",
  "water",
  "white",
];

function obtenerFamilia(nombre) {
  let familia = nombre.trim().toLowerCase();
  familia = familia.replace(/\s+\((luminous|rare)\)$/, "");

  const familiasAlternativas = {
    blizzrobe: "wizzrobe",
    molduking: "molduga",
    stalizalfos: "lizalfos",
    stalkoblin: "bokoblin",
    stalmoblin: "moblin",
    stalnox: "hinox",
  };
  if (familiasAlternativas[familia]) {
    return familiasAlternativas[familia];
  }
  if (/^guardian scout (i|ii|iii|iv)$/.test(familia)) {
    return "guardian scout";
  }
  familia = familia.replace(/ talus titan$/, " talus");

  let prefijo;

  while (
    (prefijo = prefijosVariantes.find((variante) =>
      familia.startsWith(`${variante} `),
    ))
  ) {
    familia = familia.slice(prefijo.length).trim();
  }

  return familia;
}

function crearTarjeta(monstruo) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "card h-100 shadow-sm";

  const imagen = document.createElement("img");
  imagen.className = "img-thumbnail card-img-top";
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

  const botin = document.createElement("p");
  botin.className = "card-text";
  const etiquetaBotin = document.createElement("strong");
  etiquetaBotin.textContent = "Drop: ";
  botin.append(
    etiquetaBotin,
    document.createTextNode(monstruo.drops?.join(", ") || "Sin información"),
  );
  cuerpo.append(botin);

  if (monstruo.common_locations?.length) {
    const ubicaciones = document.createElement("p");
    ubicaciones.className = "card-text my-0";

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

  const contenedor = document.createElement("div");
  contenedor.className = "col cont-cards";
  contenedor.append(tarjeta, cartaOculta);
  contenedor.addEventListener("mouseenter", () => {
    cartaOculta.classList.add("visible");
  });
  contenedor.addEventListener("mouseleave", () => {
    cartaOculta.classList.remove("visible");
  });

  return contenedor;
}

let familiasMonstruos;
let solicitudMonstruos;

function obtenerFamiliasMonstruos() {
  if (familiasMonstruos) return Promise.resolve(familiasMonstruos);

  if (!solicitudMonstruos) {
    solicitudMonstruos = fetch(API_URL)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        return respuesta.json();
      })
      .then((datos) => {
        if (!datos || !Array.isArray(datos.data) || datos.data.length === 0) {
          throw new Error("La API no devolvió monstruos.");
        }

        familiasMonstruos = new Map();
        datos.data.forEach((monstruo) => {
          const familia = obtenerFamilia(monstruo.name);
          if (!familiasMonstruos.has(familia)) {
            familiasMonstruos.set(familia, []);
          }
          familiasMonstruos.get(familia).push(monstruo);
        });

        return familiasMonstruos;
      })
      .catch((error) => {
        solicitudMonstruos = null;
        throw error;
      });
  }

  return solicitudMonstruos;
}

async function cargarMonstruos(familiaSeleccionada) {
  const seccion = document.querySelector("#monstruos-destacados");
  const selector = seccion?.querySelector("#selector-monstruo");
  const contenedorTarjetas = seccion?.querySelector("#monstruos-cartas");
  const resultado = seccion?.querySelector("#monstruos-resultado");
  const cargando = seccion?.querySelector("#monstruos-cargando");

  if (!seccion || !selector || !contenedorTarjetas || !resultado || !cargando) {
    throw new Error(
      "No se encontraron los controles para mostrar los monstruos.",
    );
  }

  resultado.className = "text-white mt-3";
  resultado.removeAttribute("role");
  resultado.textContent = "Cargando monstruos...";
  cargando.classList.remove("d-none");
  seccion.setAttribute("aria-busy", "true");

  try {
    const familias = await obtenerFamiliasMonstruos();
    if (selector.value !== familiaSeleccionada) return;

    const monstruos = [...(familias.get(familiaSeleccionada) || [])].sort(
      (a, b) => a.name.localeCompare(b.name),
    );
    if (monstruos.length === 0) {
      contenedorTarjetas.replaceChildren();
      resultado.textContent = "No se encontraron monstruos de este tipo.";
      return;
    }

    contenedorTarjetas.replaceChildren(
      ...monstruos.map((monstruo) => crearTarjeta(monstruo)),
    );
    resultado.textContent = `${monstruos.length} ${
      monstruos.length === 1 ? "monstruo" : "variantes"
    }`;
  } catch (error) {
    console.error("No se pudieron cargar los monstruos:", error);
    if (selector.value === familiaSeleccionada) {
      contenedorTarjetas.replaceChildren();
      resultado.className = "alert alert-danger mt-3";
      resultado.setAttribute("role", "alert");
      resultado.textContent =
        "No se pudieron cargar los monstruos. Intenta seleccionarlos de nuevo.";
    }
  } finally {
    if (selector.value === familiaSeleccionada) {
      cargando.classList.add("d-none");
      seccion.setAttribute("aria-busy", "false");
    }
  }
}

const selectorMonstruo = document.querySelector("#selector-monstruo");
selectorMonstruo?.addEventListener("change", () => {
  cargarMonstruos(selectorMonstruo.value);
});
