/* https://hp-api.onrender.com/

Utiliza los siguientes endpoints para obtener los datos:

•	Para obtener los datos de un personaje aleatorio: https://hp-api.onrender.com/api/characters/students
•	Para obtener los datos de un personaje de una casa: https://hp-api.onrender.com/api/characters/house/ + el nombre de la casa.
*/
"use strict"


document.addEventListener("DOMContentLoaded", function () {

    let total = undefined;
    let indice = 0;
    let casaValor = "gryffindor";

    /**
     *  RANDOM
     */
    document.getElementById("boton-aleatorio").addEventListener("click", function () {

        let url = "https://hp-api.onrender.com/api/characters/students"

        let tarjeta = document.getElementById("tarjeta-personaje");
        document.getElementById("botones-avanzar").className = "botones-avanzar oculto";

        tarjeta.classList.remove("gryffindor", "hufflepuff", "ravenclaw", "slytherin");

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.length);
                let numeroAleatorio = Math.floor(Math.random() * data.length);
                console.log(numeroAleatorio);
                let nombre = data[numeroAleatorio].name;
                let casa = data[numeroAleatorio].house;
                let especie = data[numeroAleatorio].species;
                let patronus = data[numeroAleatorio].patronus;
                let imagen = data[numeroAleatorio].image
                if (!imagen) {
                    imagen = "../imagenes/desconocido.png";
                }
                let mostrarDatos = document.getElementById("datos-personaje");
                mostrarDatos.innerHTML = `<h2 id="nombre-personaje">${nombre}</h2>
            <p><strong>Especie:${especie}</strong> <span id="especie-personaje"></span></p>
            <p><strong>Casa:${casa}</strong> <span id="casa-personaje"></span></p>
            <p><strong>Patronus:${patronus}</strong> <span id="patronus-personaje"></span></p>`;

                let mostrarImagen = document.getElementById("contenedor-imagen");
                mostrarImagen.innerHTML = `<img id="imagen-personaje" src="${imagen}" alt="Imagen del personaje"></img>`;
                mostrarPersonajes();
            })
            .catch(error => {
                document.getElementById("datos-personaje").innerHTML = "<p>papuuu no funciona </p>";
            });
    });

    /**
     *  SELECT 
     */
    document.getElementById("selector-casa").addEventListener("change", function () {
        
        casaValor = document.getElementById("selector-casa").value.toLowerCase();
        const selector = document.getElementById("selector-casa");
        const boton = document.getElementById("boton-casa");
        const tarjeta = document.getElementById("tarjeta-personaje");

        selector.className = `selector-casa select-${casaValor}`;
        boton.className = `boton-casa boton-casa-${casaValor}`;
        boton.textContent = `Todos los personajes de ${casaValor}`;

        tarjeta.classList.remove("gryffindor", "hufflepuff", "ravenclaw", "slytherin");
        tarjeta.classList.add(`${casaValor}`);
        tarjeta.classList.add("oculto");

        document.getElementById("botones-avanzar").classList.add("oculto");
    });

    /**
     *  TODOS LOS PERSONAJE DE - 
     */
    document.getElementById("boton-casa").addEventListener("click", function () {
        casaValor = document.getElementById("selector-casa").value.toLowerCase();
        indice = 0 ; 

        mostrarPersonajes();

        document.getElementById("botones-avanzar").className = "botones-avanzar";

        fetch(`https://hp-api.onrender.com/api/characters/house/${casaValor}`)

            .then(response => {
                return response.json();
            })
            .then(data => {
                let imagen = data[indice].image;
                let nombre = data[indice].name;
                total = data.length;

                if (!imagen) {
                    imagen = "../imagenes/desconocido.png";
                }

                let mostrarDatos = document.getElementById("datos-personaje");
                let mostrarImagen = document.getElementById("contenedor-imagen");


                mostrarDatos.innerHTML = `<h2 id="nombre-personaje">${nombre}</h2>`;
                mostrarImagen.innerHTML = `<img id="imagen-personaje" src="${imagen}" alt="Imagen del personaje">`;

            })
            .catch(error => {
                document.getElementById("datos-personaje").innerHTML = "<p>papuuu no funciona </p>";
            });

    });

    /**
     * 
     */
    document.getElementById("primero").addEventListener("click", function () {
        indice = 0;
        llamadaApi(indice);
    });

    document.getElementById("anterior").addEventListener("click", function () {
        if (indice != 0) {
            indice = indice - 1;
            llamadaApi(indice);
        }
    });

    document.getElementById("siguiente").addEventListener("click", function () {
        if (indice != total-1) {
            indice = indice + 1;
            llamadaApi(indice);
        }
    });

    document.getElementById("ultimo").addEventListener("click", function () {
        indice = total-1;
        llamadaApi(indice);
    });


    /**
     * 
     */
    function llamadaApi(indice) {

        fetch(`https://hp-api.onrender.com/api/characters/house/${casaValor}`)

            .then(response => {
                return response.json();
            })
            .then(data => {
                let imagen = data[indice].image;
                let nombre = data[indice].name;

                if (!imagen) {
                    imagen = "../imagenes/desconocido.png";
                }

                let mostrarDatos = document.getElementById("datos-personaje");
                let mostrarImagen = document.getElementById("contenedor-imagen");


                mostrarDatos.innerHTML = `<h2 id="nombre-personaje">${nombre}</h2>`;
                mostrarImagen.innerHTML = `<img id="imagen-personaje" src="${imagen}" alt="Imagen del personaje">`;

            })
            .catch(error => {
                document.getElementById("datos-personaje").innerHTML = "<p>papuuu no funciona </p>";
            });

    }

});



function mostrarPersonajes() {
    let tarjeta = document.getElementById("tarjeta-personaje");

    // tarjeta.className = "tarjeta animar-tarjeta-personaje";
    tarjeta.classList.add("animar-tarjeta-personaje")
    tarjeta.classList.remove("oculto");

}


