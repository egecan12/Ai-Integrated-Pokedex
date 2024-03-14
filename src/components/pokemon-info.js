import React, { Fragment } from "react";
import "./pokemon-info.css";

const PokemonInfo = ({ pokemonData, speciesData }) => {
  return (
    <Fragment>
      {pokemonData && speciesData && (
        <div className="pokemon-info-containe">
          <h1 className="title-background">{pokemonData.name}</h1>
          <p className="green-text">Height: {pokemonData.height} inch</p>
          <p className="green-text">Weight: {pokemonData.weight} lbs</p>
          {pokemonData.types.map((item, key) => (
            <p className="blue-text" key={key}>
              type {key + 1} : {item.type.name}
            </p>
          ))}
          <p className="red-text">Capture Rate: {speciesData.capture_rate}</p>
          {speciesData.flavor_text_entries.slice(1, 5).map((item, key) => (
            <p className="title-background" key={key}>
              {item.flavor_text}
            </p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PokemonInfo;
