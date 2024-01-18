const pokemonList = document.querySelector('.pokemons');
const btnLoadMore = document.getElementById('loadMoreButton');
const maxRecords = 1080;
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.pokeType}">
                <span class="number">#${pokemon.pokeNumber}</span>
                <span class="name">${pokemon.pokeName}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.pokeTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class= "photo" src="${pokemon.pokePhoto}" alt="${pokemon.pokeNumber}">
                </div>
            </li>
        `).join('');
    })
}

loadPokemonItens(offset, limit);



btnLoadMore.addEventListener('click', () => {

    offset += limit;

    const qtdRecordsNextPage = offset + limit;

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        btnLoadMore.parentElement.removeChild(btnLoadMore);
    } else {
        loadPokemonItens(offset, limit);
    }
})

