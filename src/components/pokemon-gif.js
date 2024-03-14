import React, { useEffect, useState } from "react";

const PokemonGif = ({ pokemonData }) => {
  // const [pokemonData, setPokemonData] = useState(null);

  return (
    <div className="pokedex">
      {pokemonData &&
        pokemonData.sprites.versions["generation-v"]["black-white"].animated
          .front_default && (
          <img
            src={
              pokemonData.sprites.versions["generation-v"]["black-white"]
                .animated.front_default
            }
            alt="pokemon gif"
            className="pokemon_image"
          />
        )}
    </div>
  );
};

export default PokemonGif;
