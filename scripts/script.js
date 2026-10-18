"use strict";

const botonVolver = document.querySelector("#btn_volver");

if (botonVolver) {
    function controlarBotonVolver() {
        botonVolver.classList.toggle("mostrar", window.scrollY > 100);
    }

    window.addEventListener("scroll", controlarBotonVolver);
    controlarBotonVolver();
}
