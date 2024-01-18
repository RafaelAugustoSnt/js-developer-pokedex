
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.pokeNumber = pokeDetail.id;
    pokemon.pokeName = pokeDetail.name;

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types

    pokemon.pokeType = type;
    pokemon.pokeTypes = types;
    pokemon.pokePhoto = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then(detailsRequest => Promise.all(detailsRequest))
        .then(pokemonDetails => pokemonDetails)
}

