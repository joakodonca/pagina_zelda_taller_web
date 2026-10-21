"use strict";

const botonVolver = document.querySelector("#btn_volver");

if (botonVolver) {const controlarBotonVolver = () => {
        botonVolver.classList.toggle("mostrar", window.scrollY > 100);
    }

    window.addEventListener("scroll", controlarBotonVolver);

    botonVolver.addEventListener("click",() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
};

const cartas3D = document.querySelectorAll("#card-index1, #card-index2");

cartas3D.forEach((carta3D) => {
    carta3D.addEventListener("mousemove", (mov3D) => {
        const x = mov3D.offsetX;
        const y = mov3D.offsetY;
        const giroX = (carta3D.clientHeight / 2 - y) / 40;
        const giroY = (x - carta3D.clientWidth / 2) / 40;

        carta3D.style.setProperty("--giro-x", `${giroX}deg`);
        carta3D.style.setProperty("--giro-y", `${giroY}deg`);
    });

    carta3D.addEventListener("mouseleave", () => {
        carta3D.style.setProperty("--giro-x", "0deg");
        carta3D.style.setProperty("--giro-y", "0deg");
    });
});



const secciones = document.querySelectorAll(".aparecer-scroll");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }
    });
});

secciones.forEach((seccion) => {
    observador.observe(seccion);
});

const colorArticulo = document.querySelector("#article");

if(colorArticulo){
    colorArticulo.addEventListener("mouseenter", () => {
        colorArticulo.classList.remove("bg-secondary");
        colorArticulo.classList.add("bg-dark");
    });

    colorArticulo.addEventListener("mouseleave", () => {
        colorArticulo.classList.remove("bg-dark");
        colorArticulo.classList.add("bg-secondary");
    });
}



const contenedores = document.querySelectorAll(".cont-cards");

contenedores.forEach((contenedor) => {
    const cartaOculta = contenedor.querySelector(".carta-oculta");
    if (cartaOculta) {
        contenedor.addEventListener("mouseenter", () => {
            cartaOculta.classList.add("visible");
        });

        contenedor.addEventListener("mouseleave", () => {
            cartaOculta.classList.remove("visible");
        });
    }
});

const contador_texto = document.querySelector("#contador-opinion");
const textTarea = document.querySelector("#exampleFormControlTextarea1");

if(textTarea && contador_texto){
    textTarea.addEventListener("input",() => {
        const contador_letras = textTarea.value.replace(/\s/g, "").length;
        contador_texto.textContent = `${contador_letras} caracteres`;
    });
}

const formularioContacto = document.querySelector("#form-contacto-bootstrap");
const telefonoContacto = document.querySelector("#telefono-contacto");

if (formularioContacto && telefonoContacto) {
    const validarTelefono = () => {
        const cantidadCaracteres = telefonoContacto.value.replace(/\s/g, "").length;
        telefonoContacto.setCustomValidity(
            cantidadCaracteres === 12 ? "" : "El teléfono debe tener exactamente 12 caracteres, sin contar los espacios."
        );
    };

    telefonoContacto.addEventListener("input", validarTelefono);
    formularioContacto.addEventListener("submit", (evento) => {
        validarTelefono();

        if (!telefonoContacto.checkValidity()) {
            evento.preventDefault();
            telefonoContacto.reportValidity();
        }
    });
}

const formularioSesion = document.querySelector("#form_sesion");
const nombreUsuario = document.querySelector("#Nombre_usuario");

if (formularioSesion) {
    const nombreSesion = formularioSesion.querySelector("#floatingNombre");
    const camposSesion = formularioSesion.querySelector("#campos-sesion");
    const mensajeBienvenida = formularioSesion.querySelector("#mensajeBienvenida");
    const textoBienvenida = document.querySelector("#textoBienvenida");
    const correoSesion = formularioSesion.querySelector("#floatingCorreo");
    const correoBienvenida = document.querySelector("#correoBienvenida");

    if (nombreSesion instanceof HTMLInputElement && camposSesion instanceof HTMLElement && 
        mensajeBienvenida instanceof HTMLElement && textoBienvenida instanceof HTMLElement && 
        correoSesion instanceof HTMLElement && correoBienvenida instanceof HTMLElement && nombreUsuario) {
        formularioSesion.addEventListener("submit", (evento) => {
            evento.preventDefault();
            textoBienvenida.textContent = `¡Bienvenido, ${nombreSesion.value.trim()}!`;
            correoBienvenida.textContent = `${correoSesion.value.trim()}`
            camposSesion.classList.add("d-none");
            mensajeBienvenida.classList.remove("d-none");
            nombreUsuario.textContent = `Sesion iniciada: ${nombreSesion.value.trim()}`;
        });
    }
}


