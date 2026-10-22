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

const formularioNosotros = document.querySelector("#form-nosotros-bootstrap");
const telefonoNosotros = document.querySelector("#telefono-nosotros");

if (formularioNosotros && telefonoNosotros) {
    const validarTelefono = () => {
        const cantidadCaracteres = telefonoNosotros.value.replace(/\s/g, "").length;
        telefonoNosotros.setCustomValidity(
            cantidadCaracteres === 12 ? "" : "El teléfono debe tener exactamente 12 caracteres, sin contar los espacios."
        );
    };

    telefonoNosotros.addEventListener("input", validarTelefono);
    formularioNosotros.addEventListener("submit", (evento) => {
        validarTelefono();

        if (!telefonoNosotros.checkValidity()) {
            evento.preventDefault();
            telefonoNosotros.reportValidity();
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

const formularioContactoBootstrap = document.getElementById('form-contacto-bootstrap');

if (formularioContactoBootstrap) formularioContactoBootstrap.addEventListener('submit', (event) => {
    event.preventDefault();

    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    // Get form values
    const name = document.querySelector("#nombreContacto").value.trim();
    const lastName = document.querySelector("#apellidoContacto").value.trim();
    const email = document.getElementById('Email').value.trim();
    const phone = document.getElementById('telefono-contacto').value.trim();
    const message = document.getElementById('exampleFormControlTextarea1').value.trim();
    const asunto = document.getElementById('exampleDataList').value.trim();
    const fecha = document.getElementById('fecha-nacimiento').value.trim();

    // Validation flags
    let isValid = true;

    // Name validation
    if (name === '' || lastName === '') {
        document.getElementById('nameError').textContent = 'Nombre y apellido son obligatorios.';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Email correcto es obligatorio.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Phone validation
    const phonePattern = /^\+56\s?9\s?\d{4}\s?\d{4}$/;
    if (phone === '' || !phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Ingrese un numero de telefono valido.';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    // Message validation
    if (message === '') {
        document.getElementById('messageError').textContent = 'Envie un mensaje.';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (asunto === '') {
        document.getElementById('asuntoError').textContent = 'Seleccione el asunto.';
        document.getElementById('asuntoError').style.display = 'block';
        isValid = false;
    }

    if (fecha === '') {
        document.getElementById('fechaError').textContent = 'Ingrese su fecha de nacimiento.';
        document.getElementById('fechaError').style.display = 'block';
        isValid = false;
    }

    // If form is valid, you can submit it or perform any other action
    if (isValid) {
        const progresoEnvio = document.getElementById('progreso-envio');
        const barraProgresoEnvio = document.getElementById('barra-progreso-envio');

        if (progresoEnvio && barraProgresoEnvio) {
            progresoEnvio.classList.remove('d-none');
            requestAnimationFrame(() => {
                barraProgresoEnvio.style.width = '100%';
                barraProgresoEnvio.setAttribute('aria-valuenow', '100');
            });
            window.setTimeout(() => window.location.reload(), 900);
        }
    }
});
