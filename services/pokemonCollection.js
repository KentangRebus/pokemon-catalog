export const getPokemonCollection = () => {
  return JSON.parse(localStorage.getItem("pokemons") || "{}");
};

export const addToPokemonCollection = ({ nickname = "", pokemonData = {} }) => {
  let tempCollection = getPokemonCollection();
  tempCollection[pokemonData?.name] = {
    nickname: nickname,
    origin: pokemonData,
  };
  localStorage.setItem("pokemons", JSON.stringify(tempCollection));
};

export const removePokemon = (name) => {
  let tempCollection = getPokemonCollection();
  delete tempCollection[name];
  localStorage.setItem("pokemons", JSON.stringify(tempCollection));
};
