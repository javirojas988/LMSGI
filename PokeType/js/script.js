"use strict";

document.addEventListener("DOMContentLoaded", () => {
    obtenerPokeAleatorio();
    juegoPoke();
    batallaJuego();
});

//la base de la api para despues añadirle content para usarla
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * @brief Coge un sprite shiny aleatorio de la API y lo inserta en el inicio
 */
function obtenerPokeAleatorio() {
    //numero de la pokedex 
    const numPoke = Math.floor(Math.random() * 1025) + 1;
    const url = BASE_URL + numPoke;

    //llama a la api con la url base + numPokemon aleatorio entre los 1025
    fetch(url)
        .then(responde => {
            //caso de error
            if (!responde.ok) {
                throw new Error("Hubo un error al generar el pokemon aleatorio, intentelo de nuevo.")
            }
            return responde.json();
        })
        .then(data => {
            try {
                //el sprite del poke en forma shiny
                //data.sprites.front_shiny

                //error
                if (!data || !data.sprites.front_shiny) {
                    throw new Error("No se ha generado correctamente, intentelo de nuevo.");
                }
                //cojo el div con getelement, y le inserto la imagen con el src , y la clase paraque salga como quiero
                document.getElementById("pokemon-inicio").innerHTML = ` <img src="${data.sprites.front_shiny}" alt="Imagen de pokemon" class="inicio-imagen-shiny">`;

                //try-catch
            } catch (error) {
                document.getElementById("pokemon-inicio").textContent = "Error al mostrar el pokemon" + error.message;
            }
        })
        //error
        .catch(error => {
            document.getElementById("pokemon-inicio").textContent = "Ha fallado la carga del pokemon";
        });
}


// FUNCION DEL TIPO POKEMON 
let tipoPoke = "";

/**
 * @brief Añade el evento click al botón de generar, selecciona un pokémon
 * aleatorio de la API y muestra su imagen, nombre y tipo en el juego
 */
function juegoPoke() {

    //primero le doi al boton el clico y hacemo funcion
    const boton = document.getElementById("boton-juego");

    boton.addEventListener("click", () => {
        try {
            //genera numero de la pokedex 
            const numPoke = Math.floor(Math.random() * 1025) + 1;
            //se lo añade a la base url 
            const url = BASE_URL + numPoke;

            //llama a la api con el pokemon dado
            fetch(url)
                .then(responde => {
                    //caso de error
                    if (!responde.ok) {
                        throw new Error("Hubo un error al generar el pokemon aleatorio, intentelo de nuevo.")
                    }
                    return responde.json();
                })
                .then(data => {
                    //lo que voy a emplear
                    //data.sprites.front_default
                    //data.types[0].type.name
                    //data.name 

                    //error
                    if (!data || !data.sprites.front_default) {
                        throw new Error("No se ha generado correctamente, intentelo de nuevo.");
                    }

                    //cojo el div con getelement, y le inserto la imagen, tipo, nombre
                    //le dois clases tambien para que tengan color de fondo, tamaño etc. 
                    document.getElementById("pokemon-aleatorio").innerHTML =
                        `<img src="${data.sprites.front_default}" alt="Imagen pokemon juego" class="juego-imagen">
                        <p>${data.name}</p>
                        <p class="tipo-${data.types[0].type.name}">${data.types[0].type.name}</p>`;

                    tipoPoke = data.types[0].type.name;

                    //reseteo para que no salga nada cuando le doi otra vez al boton
                    document.getElementById("juego-resultado").textContent = "";
                })
                //error
                .catch(error => {
                    document.getElementById("pokemon-aleatorio").textContent = "Ha fallado la carga del pokemon";
                });
        } catch (error) {
            document.getElementById("pokemon-aleatorio").textContent = "Ha fallado la ejecución del boton";
        }

    });
}

/**
 * @brief Recoge la elección del usuario mediante click en los botones de tipo,
 * la compara con el tipo del pokémon rival y muestra el resultado en pantalla
 */
function batallaJuego() {

    let resultadoCombate = "";
    let tipoElegido = "";
    //tabla con a que gana cada tipo 
    const tablaVentajas = {
        "normal": [],
        "fire": ["grass", "ice", "bug", "steel"],
        "water": ["fire", "ground", "rock"],
        "grass": ["water", "ground", "rock"],
        "electric": ["water", "flying"],
        "ice": ["grass", "ground", "flying", "dragon"],
        "fighting": ["normal", "ice", "rock", "dark", "steel"],
        "poison": ["grass", "fairy"],
        "ground": ["fire", "electric", "poison", "rock", "steel"],
        "flying": ["grass", "fighting", "bug"],
        "psychic": ["fighting", "poison"],
        "bug": ["grass", "psychic", "dark"],
        "rock": ["fire", "ice", "flying", "bug"],
        "ghost": ["psychic", "ghost"],
        "dragon": ["dragon"],
        "dark": ["psychic", "ghost"],
        "steel": ["ice", "rock", "fairy"],
        "fairy": ["fighting", "dragon", "dark"]
    };

    //recore todo mis botones
    const botonesTipos = document.querySelectorAll(".botones-tipos button")

    //Le añade el evento click
    botonesTipos.forEach(boton => {
        boton.addEventListener("click", () => {
            try {
                //el tipo lo tengo en el id porque lo he puesto en ingles
                //lo necesitaba asi porque el json me da el tipo en ingles
                tipoElegido = boton.id;
                if (!tipoElegido) {
                    throw new Error("Hubo un error a la hora de seleccionar el tipo del pokemon");
                }
                // vemos a ver si gana el tipo elegido, gana el tipoPoke o ninguno
                if (tablaVentajas[tipoElegido].includes(tipoPoke)) {
                    resultadoCombate = "VICTORIA";
                } else if (tablaVentajas[tipoPoke].includes(tipoElegido)) {
                    resultadoCombate = "DERROTA";
                } else {
                    resultadoCombate = "EMPATE";
                }

                //imprimimos resultado en el html 
                document.getElementById("juego-resultado").textContent = resultadoCombate;
            }catch(error){
                document.getElementById("juego-resultado").textContent = "Error al procesar el resultado";
            }
        })
    })

}