const NACIONALIDADES_ACEPTADAS = [
    { key: 'AU', name: "Australia" },
    { key: 'BR', name: "Brasil" },
    { key: 'CA', name: "Canadá" },
    { key: 'CH', name: "Suiza" },
    { key: 'DE', name: "Alemania" },
    { key: 'DK', name: "Dinamarca" },
    { key: 'ES', name: "España" },
    { key: 'FI', name: "Finlandia" },
    { key: 'FR', name: "Francia" },
    { key: 'GB', name: "Reino Unido" },
    { key: 'IE', name: "Irlanda" },
    { key: 'IN', name: "India" },
    { key: 'IR', name: "Irán" },
    { key: 'MX', name: "México" },
    { key: 'NL', name: "Países Bajos" },
    { key: 'NO', name: "Noruega" },
    { key: 'NZ', name: "Nueva Zelanda" },
    { key: 'RS', name: "Serbia" },
    { key: 'TR', name: "Turquía" },
    { key: 'UA', name: "Ucrania" },
    { key: 'US', name: "Brasil" },
];

window.onload = function () {
    const form = document.getElementsByTagName("form");
    const inputs = form[0].getElementsByTagName("input");
    const selects = form[0].getElementsByTagName("select")
    for (let input of inputs) {
        input.onfocus = resaltarDesresaltar;
        input.addEventListener('blur', resaltarDesresaltar);
    }
    for (let select of selects) {
        select.onfocus = resaltarDesresaltar;
        select.addEventListener('blur', resaltarDesresaltar)
    }
    for (let input of inputs) {
        input.addEventListener('focusin', manejarFocoEtiqueta);
        input.addEventListener('focusout', manejarFocoEtiqueta);
    }
    for (let select of selects) {
        select.addEventListener('focusin', manejarFocoEtiqueta);
        select.addEventListener('focusout', manejarFocoEtiqueta);
    }
    llemarNacionalidad();
    const nameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    nameInput.addEventListener('input', validarCampoNombreApellido);
    lastNameInput.addEventListener('input', validarCampoNombreApellido);
    emailInput.addEventListener('input', validarEmail);
    const textInputs = form[0].querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.addEventListener('input', validarCampoNoVacio);
    });
    const submitButton = document.querySelector('button[type="submit"]');
    const formElement = form[0];

    formElement.addEventListener('submit', function (evento) {
        evento.preventDefault();
        console.log('Formulario enviado');
        window.location.href = 'its-a-match.html';
    });
}

function llemarNacionalidad() {
    const nacionalidad = document.getElementById("nationality");
    for (let { key, name } of NACIONALIDADES_ACEPTADAS) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option)
    }
}

function resaltar(evento) {
    evento.target.classList.add("selected");
}

function noResaltar(evento) {
    const clase = evento.target.classList.contains("selected");
    if (clase) {
        evento.target.classList.remove("selected")
    }
}

function resaltarDesresaltar(evento) {
    evento.target.classList.toggle("selected");
}

function manejarFocoEtiqueta(evento) {
    const inputId = evento.target.id;
    if (inputId) {
        const label = document.querySelector(`label[for="${inputId}"]`);
        if (label) {
            if (evento.type === 'focusin') {
                label.classList.add('focused-label');
            } else if (evento.type === 'focusout') {
                label.classList.remove('focused-label');
            }
        }
    }
}

function validarCampoNoVacio(evento) {
    const input = evento.target;
    const value = input.value.trim();
    const errorId = `error-${input.id}`;
    let errorElement = document.getElementById(errorId);
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    if (value === "") {
        errorElement.textContent = "El campo no puede estar vacío.";
        input.classList.add('input-error');
        return false;
    } else {
        if (errorElement.textContent.includes("vacío")) {
            errorElement.textContent = "";
        }
        input.classList.remove('input-error');
        return true;
    }
}

function validarCampoNombreApellido(evento) {
    const input = evento.target;
    const value = input.value;
    const isValidNoEmpty = validarCampoNoVacio(evento);
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    const errorId = `error-${input.id}`;
    let errorElement = document.getElementById(errorId);
    if (!isValidNoEmpty && value.trim() === "") {
        return;
    }
    if (!regex.test(value)) {
        errorElement.textContent = "Solo se permiten letras y espacios (incluyendo acentos). No se permiten números ni caracteres especiales.";
        input.classList.add('input-error');
    } else {
        if (errorElement.textContent.includes("Solo se permiten letras")) {
            errorElement.textContent = "";
        }
        input.classList.remove('input-error');
    }
}

function validarEmail(evento) {
    const input = evento.target;
    const value = input.value;
    const isValidNoEmpty = validarCampoNoVacio(evento);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorId = `error-${input.id}`;
    let errorElement = document.getElementById(errorId);
    if (!isValidNoEmpty && value.trim() === "") {
        return;
    }
    if (!regex.test(value)) {
        errorElement.textContent = "Ingrese un correo electrónico válido.";
        input.classList.add('input-error');
    } else {
        if (errorElement.textContent.includes("correo electrónico válido")) {
            errorElement.textContent = "";
        }
        input.classList.remove('input-error');
    }
}