"use strict";



//re hice el css y no funciona ya 


//============
// si consigues hacer un seis siete abrirar la imagen secreta frio
let expresion= "";
let mostrar;
const resultado = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

botones.forEach(boton => {
    boton.addEventListener("click", function() {
        const valor = boton.id;

        if (valor === "=") {
            resultado.innerHTML = eval(expresion); // calcula y muestra el resultado
            if (eval(expresion) === 67 ){
                llamarapi();
            }
            expresion = "";                        // resetea la expresión para la siguiente
            
        } else {
            expresion += valor;                    // va añadiendo cada botón pulsado
            resultado.innerHTML = expresion;       // muestra lo que llevas escrito
        }
    });
});

function llamarapi(){
    const url = "https://pokeapi.co/api/v2/pokemon/" ;
    let poke = Math.floor(Math.random()*1000) ; 

    const url_final = url+poke;
    fetch (url_final)
        .then(responde => {
            return responde.json();
        })
        .then(data => {
            let sprite = data.sprites.front_default; 
            document.getElementById("resultado").innerHTML=`<img src="${sprite}" >`;
        })
}