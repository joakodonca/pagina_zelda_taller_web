const API_URL =
  "https://api.hyrule-compendium.com/v3/compendium/category/monsters";

async function cargarMonstruos() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

  const datos = await respuesta.json();
  console.log(datos);
}

cargarMonstruos().catch(console.error);
