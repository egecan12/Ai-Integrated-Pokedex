import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './PokemonCamera.css';

const PokemonCamera = ({ onPokemonDetected, pokemonData, speciesData }) => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const speakPokemonInfo = (pokemonName, pokemonData, speciesData) => {
    // Create a new speech synthesis instance
    const speech = new SpeechSynthesisUtterance();
    
    // Get Pokemon information
    const type = pokemonData?.types?.[0]?.type?.name || 'unknown';
    const height = pokemonData?.height ? (pokemonData.height / 10).toFixed(1) : 'unknown';
    const weight = pokemonData?.weight ? (pokemonData.weight / 10).toFixed(1) : 'unknown';
    
    // Get flavor text
    let flavorText = '';
    if (speciesData?.flavor_text_entries) {
      // Find English flavor text
      const englishEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      );
      if (englishEntry) {
        // Clean up the flavor text (remove newlines and extra spaces)
        flavorText = englishEntry.flavor_text
          .replace(/\n/g, ' ')
          .replace(/\f/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    }
    
    // Set the text to be spoken
    speech.text = `A new Pokemon detected! It's ${pokemonName}! 
      This Pokemon is a ${type} type. 
      It is ${height} meters tall and weighs ${weight} kilograms.
      ${flavorText}`;
    
    // Set voice properties for a robotic effect
    speech.rate = 0.9; // Slightly slower
    speech.pitch = 0.8; // Lower pitch
    speech.volume = 1;
    
    // Get available voices and find a robotic one if available
    const voices = window.speechSynthesis.getVoices();
    const roboticVoice = voices.find(voice => 
      voice.name.includes('Microsoft') || 
      voice.name.includes('Google') ||
      voice.name.includes('Samantha')
    );
    
    if (roboticVoice) {
      speech.voice = roboticVoice;
    }
    
    // Speak the text
    window.speechSynthesis.speak(speech);
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowPreview(true);
    setSuccess(null);
    setError(null);
  };

  const confirmCapture = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await axios({
        method: "POST",
        url: "https://serverless.roboflow.com/pokemon-gen-1/2",
        params: {
          api_key: process.env.REACT_APP_ROBOFLOW_API_KEY
        },
        data: capturedImage.split(',')[1],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.data && response.data.predictions && response.data.predictions.length > 0) {
        const detectedPokemon = response.data.predictions[0].class;
        setSuccess(`A new Pokemon detected: ${detectedPokemon}!`);
        
        // Fetch the new Pokemon's data
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${detectedPokemon.toLowerCase()}`
        );
        const newPokemonData = await pokemonResponse.json();
        
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${newPokemonData.id}`
        );
        const newSpeciesData = await speciesResponse.json();
        
        // Speak the Pokemon information with the new data
        speakPokemonInfo(detectedPokemon, newPokemonData, newSpeciesData);
        
        // Wait for 2 seconds before closing the camera and calling onPokemonDetected
        setTimeout(() => {
          onPokemonDetected(detectedPokemon);
          setShowPreview(false);
          setCapturedImage(null);
        }, 2000);
      } else {
        setError("No Pokemon detected in the image. Please try again!");
      }
    } catch (error) {
      console.error('Error detecting Pokemon:', error);
      setError("Error detecting Pokemon. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const retakePhoto = () => {
    setShowPreview(false);
    setCapturedImage(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="camera-container">
      {!showPreview ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="camera-view"
          />
          <button 
            onClick={capture} 
            className="capture-button"
            disabled={isLoading}
          >
            Take Photo
          </button>
        </>
      ) : (
        <>
          <img 
            src={capturedImage} 
            alt="Captured Pokemon" 
            className="preview-image"
          />
          <div className="preview-buttons">
            <button 
              onClick={retakePhoto} 
              className="retake-button"
            >
              Retake
            </button>
            <button 
              onClick={confirmCapture} 
              className="confirm-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Detecting...
                </div>
              ) : (
                'Detect Pokemon'
              )}
            </button>
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default PokemonCamera; 