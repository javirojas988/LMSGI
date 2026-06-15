// PERSONAJE ALEATORIO LLAMA A LA API Y MUESTRA SU IMAGEN Y NOMBRE EN TARJETA; LE TENGO QUE QUITAR OCULTO
//VER TODOS LALAMA A LA API Y MUESTRA TODO COMO CARDS en lista-personajes , cada carda con img y nombre
// SI no tiene nombre que ponga sin imagen
"use strict"

document.addEventListener("DOMContentLoaded", function() {
    

    document.getElementById("btn-aleatorio").addEventListener("click", function() {

        document.getElementById("tarjeta").classList.remove("oculto");

        fetch ("https://rickandmortyapi.com/api/character")

            .then( response => {
                return response.json();
            })
            .then( data => {
                let numeroAle = Math.floor(Math.random() *  data.results.length );
                let name = data.results[numeroAle].name;
                let img = data.results[numeroAle].image;

                document.getElementById("tarjeta").innerHTML = `<img id="imagen" src="${img}" alt="personaje">
                <h2 id="nombre">nombre:${name}</h2>`;
               
            })
            .catch( error => {
                document.getElementById("tarjeta").innerHTML = `<h1>no funciona ma g </h1>`;
            })
    });

    document.getElementById("btn-todos").addEventListener("click", function(){

        
        document.getElementById("lista-personajes").innerHTML= "";
        document.getElementById("tarjeta").classList.remove("oculto");

        fetch("https://rickandmortyapi.com/api/character")
            .then( response => {
                return response.json();
            })
            .then( data => {
                let indice = 0 ;

                data.results.forEach(element => {
                    let mostrar = document.createElement("div");
                    mostrar.classList.add("card");

                    let name = data.results[indice].name;
                    let img = data.results[indice].image;

                    mostrar.innerHTML = `<img id="imagen" src="${img}" alt="personaje">
                    <h2 id="nombre">nombre:${name}</h2>`;

                    document.getElementById("lista-personajes").appendChild(mostrar);

                    indice = indice + 1  ; 
                });
            })
            .catch( error => {
                document.getElementById("lista-personajes").innerHTML= "papupupup";
            })
    });
})