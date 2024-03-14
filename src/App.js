import React, { useEffect, useState } from "react";
import PokemonGif from "./components/pokemon-gif.js";
import PokemonInfo from "./components/pokemon-info.js";
import PokedexImage from "./pokedex.png"; // adjust the path as needed
import "./App.css";
import PokemonSearch from "./components/pokemon-search.js";

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setspeciesData] = useState(null);
  let [dataFromChild, setDataFromChild] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const pokemonData = await pokemonResponse.json();
      setPokemonData(pokemonData);

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      const speciesData = await speciesResponse.json();
      setspeciesData(speciesData);
    };

    fetchData();
  }, [pokemonId]);

  const receiveDataFromChild = (data) => {
    setDataFromChild(data);
    setPokemonId(data);
  };

  const handlePrev = () => {
    if (pokemonId > 1) {
      setDataFromChild(null);
      setPokemonId(pokemonId - 1);
    }
  };

  const handleNext = () => {
    setDataFromChild(null);
    setPokemonId(pokemonId + 1);
  };

  return (
    <div className="center">
      <div className="pokedex-container">
        <div className="yellow-dot"></div>
        <img src={PokedexImage} alt="Pokedex" className="pokedex" />
        <PokemonGif pokemonData={pokemonData} />
        <div className="pokemon-info-container">
          <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
        </div>
        <div className="search-container">
          {/* <PokemonSearch
            sendDataToParent={receiveDataFromChild}
            pokemonData={pokemonData}
            speciesData={speciesData}
          /> */}
          {/* <p>Data from child: {dataFromChild}</p> */}
        </div>
        <div className="buttons">
          <button onClick={handlePrev} className="button">
            Prev
          </button>
          <button onClick={handleNext} className="button">
            Next
          </button>
        </div>
      </div>
      <div className="pokemon-info-web-container">
        <div className="pokemon-info-container">
          <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
        </div>
      </div>
    </div>
  );
};

export default App;
