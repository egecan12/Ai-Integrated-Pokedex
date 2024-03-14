import React, { Fragment, useEffect, useState } from "react";

const PokemonSearch = ({ sendDataToParent }) => {
  const [pokemonNames, setPokemonNames] = useState(null);
  let [searchValue, setSearchValue] = useState("");
  let [filteredPokemonNames, setFilteredPokemonNames] = useState([]);
  let [pokemonId, setpokemonId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=811`
      );
      const pokemonData = await pokemonResponse.json();
      setPokemonNames(pokemonData);
    };

    fetchData();
  }, []);
  const sendData = (id) => {
    sendDataToParent(id);
  };
  //   const handlePokemonSelect = async (id) => {
  //     setpokemonId(id);
  //     await console.log(id);
  //   };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (!value) {
      setFilteredPokemonNames([]);
    } else {
      let filteredNames = pokemonNames.results.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      setFilteredPokemonNames(filteredNames.slice(0, 3));
    }
  };

  return (
    <div className="pokemon-search-container">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchValue}
        onChange={handleInputChange}
      />
      <ul>
        {pokemonNames &&
          filteredPokemonNames.map((pokemon, key) => (
            <button key={key} onClick={() => sendData(key + 1)}>
              {pokemon.name}
            </button>
          ))}
      </ul>
    </div>
  );
};

export default PokemonSearch;
