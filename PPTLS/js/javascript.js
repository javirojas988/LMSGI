"use strict";

let victorias = 0;
let derrotas = 0;
let empates = 0;

const jugadas = {
    piedra: { icono: "🪨", vence: ["tijera", "lagarto"], texto: "Piedra vence a: Tijera y Lagarto" },
    papel: { icono: "📄", vence: ["piedra", "spock"], texto: "Papel vence a: Piedra y Spock" },
    tijera: { icono: "✂️", vence: ["papel", "lagarto"], texto: "Tijera vence a: Papel y Lagarto" },
    lagarto: { icono: "🦎", vence: ["papel", "spock"], texto: "Lagarto vence a: Papel y Spock" },
    spock: { icono: "🖖", vence: ["piedra", "tijera"], texto: "Spock vence a: Piedra y Tijera" }
};

const nombresJugadas = ["piedra", "papel", "tijera", "lagarto", "spock"];

document.addEventListener("DOMContentLoaded", () => {
    inicializarJuego();
});

/**
 * @brief Inicializa el juego configurando los elementos, estados y eventos necesarios.
 *
 * Esta función prepara todo lo necesario para que el juego pueda comenzar,
 * incluyendo la configuración de la interfaz, los valores iniciales de los
 * jugadores y la vinculación de eventos a los controles.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarJuego() {
    try {
        const botonesJugada = document.querySelectorAll(".boton-eleccion-jugada");

        botonesJugada.forEach(boton => {
            boton.addEventListener("click", () => {
                const eleccion = boton.getAttribute("data-jugada");
                jugar(eleccion);
            });
        });

        inicializarTooltips();

        setTimeout(() => {
            const contenedor = document.querySelector("main");
            if (contenedor) contenedor.style.opacity = "1";
        }, 100);

    } catch (error) {
        console.error("Error al inicializar el juego:", error);
    }
}

/**
 * @brief Ejecuta una ronda del juego con la elección del usuario.
 *
 * Esta función realiza los siguientes pasos:
 * 1. Reinicia los displays del juego.
 * 2. Genera la elección de la CPU de forma aleatoria.
 * 3. Muestra la elección del usuario y de la CPU con animaciones.
 * 4. Calcula el resultado de la ronda.
 * 5. Muestra el resultado y actualiza los contadores correspondientes.
 *
 * @param {string} eleccionUsuario - La elección realizada por el usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function jugar(eleccionUsuario) {
    try {
        reiniciarDisplays();

        const eleccionCPU = obtenerEleccionCPU();
        const displayJugador = document.getElementById("jugada-jugador");
        const displayCPU = document.getElementById("jugada-cpu");

        if (!displayJugador || !displayCPU) {
            console.error("Error: No se encontraron los elementos del display.");
            return;
        }

        mostrarEleccion(displayJugador, eleccionUsuario, "JUGADOR");

        setTimeout(() => {
            mostrarEleccion(displayCPU, eleccionCPU, "CPU");

            const resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);

            mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);

        }, 500);

    } catch (error) {
        console.error("Error al ejecutar la jugada:", error);
    }
}

/**
 * @brief Genera aleatoriamente la elección de la CPU.
 *
 * Esta función selecciona una opción al azar entre las disponibles y la devuelve.
 *
 * @return {string} La elección de la CPU (por ejemplo: "piedra", "papel" o "tijera"...).
 */
function obtenerEleccionCPU() {
    const aleatorioCpu = Math.floor(Math.random() * nombresJugadas.length);
    return nombresJugadas[aleatorioCpu];
}

/**
 * @brief Muestra la elección de un jugador (jugador humano o CPU) en un display con icono y texto.
 *
 * Esta función limpia el contenido del display, aplica la clase
 * para animación/estilo y agrega los elementos que representan
 * la jugada seleccionada (emoji y texto) del jugador indicado.
 *
 * @param {HTMLElement} display - El contenedor donde se mostrará la elección.
 * @param {string} eleccion - La clave de la elección (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} jugador - Nombre del jugador que realizó la elección (por ejemplo: "JUGADOR" o "CPU").
 * @return {void} No devuelve ningún valor.
 */
function mostrarEleccion(display, eleccion, jugador) {
    try {
        display.innerHTML = "";

        display.classList.add("active");

        const icono = document.createElement("div");
        icono.className = "icono-jugada-grande";
        icono.textContent = jugadas[eleccion].icono;

        const texto = document.createElement("div");
        texto.className = "texto-jugada";
        texto.textContent = eleccion.charAt(0).toUpperCase() + eleccion.slice(1);

        display.appendChild(icono);
        display.appendChild(texto);

    } catch (error) {
        console.error(`Error al mostrar la elección de ${jugador}:`, error);
    }
}

/**
 * @brief Reinicia los displays del juego a su estado inicial.
 *
 * Esta función restablece el contenido de los displays del usuario y de la CPU,
 * elimina cualquier clase de animación activa y restablece el mensaje de resultado
 * al texto predeterminado "¡Batalla!".
 *
 * @return {void} No devuelve ningún valor.
 */
function reiniciarDisplays() {
    try {
        const displayJugador = document.getElementById("jugada-jugador");
        const displayCPU = document.getElementById("jugada-cpu");
        const mensajeResultado = document.getElementById("mensaje-resultado");

        if (displayJugador) {
            displayJugador.innerHTML = `<p class="placeholder">?</p>`;
            displayJugador.classList.remove("active");
        }

        if (displayCPU) {
            displayCPU.innerHTML = `<p class="placeholder">?</p>`;
            displayCPU.classList.remove("active");
        }

        if (mensajeResultado) {
            mensajeResultado.textContent = "¡Batalla!";
            mensajeResultado.className = "mensaje-resultado";
        }

    } catch (error) {
        console.error("Error al reiniciar los displays:", error);
    }
}

/**
 * @brief Calcula el resultado de una ronda entre el usuario y la CPU.
 *
 * Esta función compara la elección del usuario con la elección de la CPU
 * y determina si la ronda termina en victoria, derrota o empate según
 * las reglas del juego.
 *
 * @param {string} usuario - La elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - La elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {string} El resultado de la ronda: "victoria", "derrota" o "empate".
 */
function calcularResultadoJugada(usuario, cpu) {
    if (usuario === cpu) {
        return "empate";
    }

    if (jugadas[usuario].vence.includes(cpu)) {
        return "victoria";
    }

    return "derrota";
}

/**
 * @brief Muestra el resultado de una ronda en la interfaz del juego.
 *
 * Esta función actualiza el mensaje de resultado según si el usuario ganó,
 * perdió o empató, aplica la clase correspondiente para estilos y
 * actualiza los contadores de victorias, derrotas o empates.
 *
 * @param {string} resultado - Resultado de la ronda: "victoria", "derrota" o "empate".
 * @param {string} usuario - Elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - Elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function mostrarResultadoJugada(resultado, usuario, cpu) {
    try {
        const mensajeResultado = document.getElementById("mensaje-resultado");

        if (!mensajeResultado) {
            console.error("Error: No se encontró el elemento mensaje-resultado.");
            return;
        }

        const nombreUsuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);
        const nombreCPU = cpu.charAt(0).toUpperCase() + cpu.slice(1);

        if (resultado === "victoria") {
            victorias++;
            mensajeResultado.textContent = `¡Ganaste! ${nombreUsuario} vence a ${nombreCPU}`;
            mensajeResultado.className = "mensaje-resultado ganador";

        } else if (resultado === "derrota") {
            derrotas++;
            mensajeResultado.textContent = `¡Perdiste! ${nombreCPU} vence a ${nombreUsuario}`;
            mensajeResultado.className = "mensaje-resultado perdedor";

        } else {
            empates++;
            mensajeResultado.textContent = `¡Empate! Los dos eligieron ${nombreUsuario}`;
            mensajeResultado.className = "mensaje-resultado empate";
        }

        actualizarContadores();

    } catch (error) {
        console.error("Error al mostrar el resultado:", error);
    }
}

/**
 * @brief Actualiza los contadores de victorias, derrotas y empates en la interfaz.
 *
 * Esta función refleja los valores actuales de las variables globales
 * `victorias`, `derrotas` y `empates` en los elementos del DOM correspondientes.
 *
 * @return {void} No devuelve ningún valor.
 */
function actualizarContadores() {
    try {
        const contadorVictorias = document.getElementById("contador-victorias");
        const contadorDerrotas = document.getElementById("contador-derrotas");
        const contadorEmpates = document.getElementById("contador-empates");

        if (contadorVictorias) contadorVictorias.textContent = victorias;
        if (contadorDerrotas) contadorDerrotas.textContent = derrotas;
        if (contadorEmpates) contadorEmpates.textContent = empates;

    } catch (error) {
        console.error("Error al actualizar los contadores:", error);
    }
}

/**
 * @brief Inicializa los tooltips de los botones de elección.
 *
 * Esta función recorre todos los botones de elección, obtiene la jugada
 * asociada a cada uno y configura el atributo `title` para mostrar
 * un tooltip indicando qué opciones vence esa jugada.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarTooltips() {
    try {
        const botonesJugada = document.querySelectorAll(".boton-eleccion-jugada");

        botonesJugada.forEach(boton => {
            const jugada = boton.getAttribute("data-jugada");
            if (jugada && jugadas[jugada]) {
                boton.setAttribute("title", jugadas[jugada].texto);
            }
        });

    } catch (error) {
        console.error("Error al inicializar los tooltips:", error);
    }
}

