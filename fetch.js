/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch


const BASE_URL = 'https://pokeapi.co/api/v2/';

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const getPokemon = async (pokemon) => {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon.toLowerCase()}`)
        .then(data => data.json());

    const sprite =  response.sprites.front_default;
    const { types } = response;

    return {
        name: response.name,
        id: response.id,
        sprite: sprite,
        types: types,
    };
}

const renderPokemonData = (pokemon) => {
    const { name, id, sprite, types } = pokemon;

    document.querySelector('[data-poke-name]').textContent = name;
    document.querySelector('[data-poke-img]').setAttribute('src', sprite);
    document.querySelector('[data-poke-id]').textContent = `Nº ${id}`;
    setCardColor(types);
    renderPokemonTypes(types);
}

const setCardColor = (types) => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    document.querySelector('[data-poke-img]').style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    document.querySelector('[data-poke-img]').style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = (types) => {
    document.querySelector('[data-poke-types]').innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        document.querySelector('[data-poke-types]').appendChild(typeTextElement);
    });
}

const searchPokemon = async event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    const pokemon = await getPokemon(value);
    renderPokemonData(pokemon);
}

document.addEventListener('DOMContentLoaded', searchPokemon);

function renderPokemonButtons() {
    const getBtn = document.getElementById('get-btn');
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');

    getBtn.addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);

        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.id);
    });

    previousBtn.addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId - 1);
        const pokemon = await fetchPokemon(newId);

        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
    });

    nextBtn.addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);

        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
    });
}

