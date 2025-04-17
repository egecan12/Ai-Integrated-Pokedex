import React, { useEffect, useState } from "react";
import PokemonGif from "./components/pokemon-gif.js";
import PokemonInfo from "./components/pokemon-info.js";
import PokedexImage from "./pokedex.png"; // adjust the path as needed
import PokemonCamera from "./components/PokemonCamera";
import "./App.css";

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setspeciesData] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [pokemonName, setPokemonName] = useState(null);
  const [detectedPokemonData, setDetectedPokemonData] = useState(null);
  const [detectedSpeciesData, setDetectedSpeciesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If we have a Pokemon name, try to fetch by name first
        if (pokemonName) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
          );
          if (response.ok) {
            const data = await response.json();
            setPokemonData(data);
            setPokemonId(data.id);
            
            const speciesResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
            );
            const speciesData = await speciesResponse.json();
            setspeciesData(speciesData);
            return;
          }
        }

        // If no name or name fetch failed, use ID
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
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        // Reset to first Pokemon if there's an error
        setPokemonId(1);
        setPokemonName(null);
      }
    };

    fetchData();
  }, [pokemonId, pokemonName]);

  const handlePokemonDetected = async (pokemonName) => {
    try {
      // Fetch the detected Pokemon's data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        setDetectedPokemonData(data);
        
        // Fetch species data
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
        );
        const speciesData = await speciesResponse.json();
        setDetectedSpeciesData(speciesData);
        
        setPokemonName(pokemonName);
        setShowCamera(false);
      }
    } catch (error) {
      console.error('Error fetching detected Pokemon data:', error);
    }
  };

  const handlePrev = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
      setPokemonName(null);
    }
  };

  const handleNext = () => {
    setPokemonId(pokemonId + 1);
    setPokemonName(null);
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
        <div className="buttons">
          <button onClick={() => setShowCamera(!showCamera)} className="button">
            {showCamera ? 'Hide Camera' : 'Detect Pokemon'}
          </button>
          <button onClick={handlePrev} className="button">
            Prev
          </button>
          <button onClick={handleNext} className="button">
            Next
          </button>
        </div>
      </div>
      {showCamera && (
        <div className="camera-section">
          <PokemonCamera 
            onPokemonDetected={handlePokemonDetected} 
            pokemonData={detectedPokemonData}
            speciesData={detectedSpeciesData}
          />
        </div>
      )}
      <div className="pokemon-info-web-container">
        <div className="pokemon-info-container">
          <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
        </div>
      </div>
    </div>
  );
};

export default App;

