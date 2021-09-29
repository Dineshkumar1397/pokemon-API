const pokemons= document.getElementById('pokemons');
const fetchPokemon = () => {

  const promises = [];
  for (let i = 1; i <= 50; i++)  {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {

    const pokemon = results.map((data) => ({
      id: data.id,
      name: data.name,
      weight: data.weight,
      moves: data.moves.map((move) => move.move.name).join(', '),
      ability: data.abilities.map((ability) => ability.ability.name).join(', '),

    }) );
    displayPokemon(pokemon);
  });
    
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map((pokeman) => 
      `<li class="card">
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Weight: ${pokeman.weight}</p>
            <p class="card-subtitle">Moves: ${pokeman.moves}</p>
            <p class="card-subtitle">Ability: ${pokeman.ability}</p>
        </li>`
      ).join('');
    pokemons.innerHTML = pokemonHTMLString;
};

fetchPokemon();

