
const formulario = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

// Calcula la edad usando la fecha de nacimiento.
function calcularEdad(fecha) {
    if (!fecha) return -1;

    const nacimiento = new Date(fecha + "T00:00:00");
    const hoy = new Date();

    if (Number.isNaN(nacimiento.getTime()) || nacimiento > hoy) {
        return -1;
    }

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    if (
        hoy.getMonth() < nacimiento.getMonth() ||
        (
            hoy.getMonth() === nacimiento.getMonth() &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return edad;
}

// Muestra los errores debajo de cada campo.
function mostrarError(idCampo, idError, texto) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById(idError);

    error.textContent = texto;
    campo.classList.toggle("invalido", Boolean(texto));
}

// Crea los mensajes de error en el HTML.
[
    "fecha",
    "usuario",
    "contrasena",
    "correo",
    "telefono"
].forEach(id => {
    const campo = document.getElementById(id);
    const error = document.createElement("small");

    error.id = id + "Error";
    error.className = "error";

    campo.insertAdjacentElement("afterend", error);
});

// Valida todos los campos al enviar.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    let valido = true;

    mensaje.textContent = "";
    mensaje.className = "mensaje";

    // 1. Validar edad.
    const fecha = document.getElementById("fecha").value;
    const edad = calcularEdad(fecha);

    let errorFecha = "";

    if (!fecha) {
        errorFecha = "Selecciona tu fecha de nacimiento.";
    } else if (edad < 0) {
        errorFecha = "La fecha no es válida o está en el futuro.";
    } else if (edad < 18) {
        errorFecha = "Debes tener al menos 18 años.";
    }

    mostrarError("fecha", "fechaError", errorFecha);
    if (errorFecha) valido = false;

    // 2. Validar nombre de usuario.
    const usuario = document.getElementById("usuario").value.trim();

    const errorUsuario =
        /^[a-zA-Z0-9_]{3,20}$/.test(usuario)
            ? ""
            : "Usa de 3 a 20 caracteres: letras, números o guion bajo.";

    mostrarError("usuario", "usuarioError", errorUsuario);
    if (errorUsuario) valido = false;

    // 3. Validar contraseña segura.
    const contrasena =
        document.getElementById("contrasena").value;

    const contrasenaValida =
        contrasena.length >= 8 &&
        /[A-Z]/.test(contrasena) &&
        /[a-z]/.test(contrasena) &&
        /[0-9]/.test(contrasena) &&
        /[^A-Za-z0-9]/.test(contrasena);

    const errorContrasena = contrasenaValida
        ? ""
        : "Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.";

    mostrarError(
        "contrasena",
        "contrasenaError",
        errorContrasena
    );

    if (errorContrasena) valido = false;

    // 4. Validar correo electrónico.
    const correo = document.getElementById("correo").value.trim();

    const errorCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
            ? ""
            : "Introduce un correo electrónico válido.";

    mostrarError("correo", "correoError", errorCorreo);
    if (errorCorreo) valido = false;

    // 5. Validar teléfono de República Dominicana.
    const telefono = document.getElementById("telefono")
        .value.replace(/[\s()-]/g, "");

    const errorTelefono =
        /^(809|829|849)\d{7}$/.test(telefono)
            ? ""
            : "Usa 10 dígitos y comienza con 809, 829 o 849.";

    mostrarError("telefono", "telefonoError", errorTelefono);
    if (errorTelefono) valido = false;

    // Resultado final.
    if (valido) {
        mensaje.textContent =
            "¡Excelente! Todos los datos son válidos.";
        mensaje.classList.add("exito");
    } else {
        mensaje.textContent =
            "Revisa los campos marcados antes de continuar.";
        mensaje.classList.add("fallo");
    }
});

