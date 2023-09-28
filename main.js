
// URL global
const BASE_URL = 'https://pokeapi.co/api/v2/';

/**
 * // Lleva 2 parametros basicos, la URL y los headers(opcionales)
    
    fetch(BASE_URL + 'pokemon/ditto')
    // Obtenemos una respuesta que se va a formatear a tipo 
    // JSON para que sea legible para nosotros, el usuario, 
    // aplicacion, que lo podamos manipular, si lo quitamos trae 
    // la respuesta como tal pero no es legible
    .then(res => res.json())
    .then(data => console.log(data));
*/

// FETCH ASYNC
// Intente hacer algo
// Vamos a guardar la respuesta, una vez que obtengamos 
// el resultado lo vamos a parsear ("formatear")
// const response = await fetch(BASE_URL + 'pokemon/ditto');
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        // Si no lo logra, entonces cacha el error y muestra en consola
        console.error(err);
    }
}

// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        /**
         * La propiedad de sólo lectura localStorage te permite acceder al objeto 
         * local Storage; los datos persisten almacenados entre de las diferentes 
         * sesiones de navegación. localStorage es similar a sessionStorage (en-US). 
         * La única diferencia es que, mientras los datos almacenados en localStorage 
         * no tienen fecha de expiración, los datos almacenados en sessionStorage son 
         * eliminados cuando finaliza la sesion de navegación - lo cual ocurre cuando 
         * se cierra la página.
         */
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.id);
    })

/** EVENTO
 * para el DOM
 */

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);

})

// Obtener el anterior
//
//
//Obtener el siguiente

document.getElementById('previous-btn')
.addEventListener('click',async () => { //Cuando escuchamos el click ejecutamos la sigueinte funcion
   const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
   const newId = Math.max(1, currentPokeId -1);
   const pokemon = await fetchPokemon(newId); // Cuando tenemos el await nuestro funcion debe ser async
   console.log(pokemon.name); 
}) 

document.getElementById('next-btn')
    .addEventListener('click', async () =>{
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })

//////POST
//

fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    boyd: JSON.stringify({
        title: 'title1',
        body: 'lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))

/**
 * ////////////////// POST - Codigo Zab
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))
 */




/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch


