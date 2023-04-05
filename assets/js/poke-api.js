const pokeApi = {};

function convertPokeAPIDetailsToPokemon(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetails.order;
    pokemon.name = pokeDetails.name;
    pokemon.types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.img = pokeDetails.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeAPIDetailsToPokemon)
    .catch(console.log("Erro in getPokemonDetails"))
}

pokeApi.getPokemons = (offset = 0, limit = 16) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then((value) => value.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch(console.log("Error in fetch API pokeapi"))
};