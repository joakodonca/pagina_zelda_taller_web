"use strict";

const botonVolver = document.querySelector("#btn_volver");

if (botonVolver) {const controlarBotonVolver = () => {
        botonVolver.classList.toggle("mostrar", window.scrollY > 100);
    }

    window.addEventListener("scroll", controlarBotonVolver);
    controlarBotonVolver();

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


colorArticulo.addEventListener("mouseenter", () => {
        colorArticulo.classList.remove("bg-secondary");
        colorArticulo.classList.add("bg-dark");
});

colorArticulo.addEventListener("mouseleave", () => {
    colorArticulo.classList.remove("bg-dark");
    colorArticulo.classList.add("bg-secondary");
});
