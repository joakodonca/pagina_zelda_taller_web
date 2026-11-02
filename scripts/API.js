const API_URL =
  "https://api.hyrule-compendium.com/v3/compendium/category/monsters";
  
const nombresDestacados = [
  "silver lynel",
  "black hinox",
  "guardian stalker",
  "silver bokoblin",
  "silver moblin",
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

  console.log(monstruosDestacados);
}

cargarMonstruos().catch(console.error);
