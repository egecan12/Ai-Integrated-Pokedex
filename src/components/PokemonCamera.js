import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './PokemonCamera.css';

const PokemonCamera = ({ onPokemonDetected }) => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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