const pokemonList = document.getElementById("pokemons");
const loadMoreButton = document.getElementById("load-more-button");
let offset = 0;
let limit = 16;

function convertPokemonTypesToLi(types){
    return types.map((type) => `<li class="type ${type}">${type}</li>`)
}

function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join("")}
                </ol>
                
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newPokemons = pokemons.map((pokemon) => convertPokemonToLi(pokemon)).join("");
            pokemonList.innerHTML += newPokemons;
        })
}

loadPokemons(offset, limit);
loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemons(offset, limit);
})