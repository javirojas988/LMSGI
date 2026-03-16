// In your code, replace the API reference from api.thecatapi.com with api.thedogapi.com.
const ENDPOINT = "https://api.thedogapi.com/v1/images/search";


const resultado = document.getElementById("resultado");
const boton = document.querySelector("#btnPerro");
const mensaje = document.querySelector(".mensaje");

boton.addEventListener("click", () => {
    // Mientras carga...
      mensaje.textContent = `Cargando imagen . . .`;

    fetch(ENDPOINT)
      .then(response => {
        // Depuramos en consola
        console.log("Respuesta:", response);

        //Manejo la respuesta del servidor
        if(!response.ok) {
            throw new Error("Respuestá no OK. Código de error HTTP: " + response.status);
        }
        // Convertimos el body de la respuesta a formato JSON
        return response.json();
      })
      .then(data => {
          // Depuramos en consola
          console.log("Datos:", data);
        data[0].url = null;
        if(!Array.isArray(data) || data.length === 0 || !data[0].url) {
            throw new Error("Datos en formato inesperado: no se encontró la imagen.");
        }

        const urlImagen = data[0].url;

        // Creamos la etiqueta <img> con la imagen
        const img = document.createElement("img");
        img.src = urlImagen;
        img.alt = "Imagen de un perrete";
        img.className = "imagenanimal";

        //Reseteo el contenedor de resultado
        resultado.innerHTML = "";
        resultado.appendChild(img);

      })
      .catch(error => {
        mensaje.textContent = `Ha fallado la carga de imagen 😒
                                ${error.message}`;
      })
});