import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handlePokemonClick = (pokemonName) => {
    setInput(pokemonName);
  };

  const displayInput = () => {
    console.log("Input value:", input);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const abilityRedact = (string) => {
    const replacedString = string.replace(/-/g, ' ');
    return capitalizeFirstLetter(replacedString);
  };


  const errorHandle = (message) => {
    setErrorMessage(message);
  }

  const resetButton = () => {
    setErrorMessage("");
    setPokemonData(null);
  }

  const fetchPokemonData = () => {
    if (!input) {
      console.error("Input is empty.");
      errorHandle(`You didn't enter a pokemon!`);
      setPokemonData(null);
      return;
    }

    const lowercaseInput = input.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${lowercaseInput}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data); 
        setErrorMessage("");
        console.log(data.abilities);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        errorHandle(`The pokemon "${input}" is not in the database.`);
        setPokemonData(null);
      });
  };

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <input
          placeholder="Which Pokemon?"
          value={input}
          onChange={handleInputChange}
        />
        <button className="fetch-button" onClick={fetchPokemonData}>
          Fetch!
        </button>
      </div>
      <p className="no-ideas">
        Out of ideas? Try{" "}
        <span
          className="pokemon-link"
          onClick={() => handlePokemonClick("Pikachu")}
        >
          Pikachu
        </span>
        ,{" "}
        <span
          className="pokemon-link"
          onClick={() => handlePokemonClick("Charizard")}
        >
          Charizard
        </span>
        , or{" "}
        <span
          className="pokemon-link"
          onClick={() => handlePokemonClick("Ninetales")}
        >
          Ninetales
        </span>
      </p>
      <div className={`pokemonBox ${errorMessage ? 'error' : (pokemonData ?`data` : "")}`}>
        <h1 className="pokemonName">
          {errorMessage ? "Error! :C (xxx)" : (pokemonData ?       `${capitalizeFirstLetter(pokemonData.name)} (${pokemonData.id})` : "No Pokemon Yet! (xxx)")}
        </h1>
        <div className={`imagePretend ${errorMessage ? 'error' : (pokemonData ?`data` : "")}`}>
        {pokemonData && (          
            <img
              src={pokemonData.sprites.other["official-artwork"].front_default}
              alt={pokemonData.name}
            />     
        )}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
            <button className = "retryButton" onClick={resetButton}>Try Again!</button>
            <p>This error was caught by the error boundary!</p>
          </div>
        )}
        {!errorMessage && !pokemonData && (
          <div className="submit-pokemon">
            <p>Please submit a pokemon</p>
          </div>
        )}
        </div>
          <table className ="abilities">
            <thead>
              <tr>
                <th className={`abilities ${errorMessage ? 'error' : (pokemonData ?`data` : "")}`}><h2>Abillity</h2></th>
                <th className={`abilities ${errorMessage ? 'error' : (pokemonData ?`data` : "")}`}><h2>Type</h2></th>
                <th className={`abilities ${errorMessage ? 'error' : (pokemonData ?`data` : "")}`}><h2>Damage</h2></th> 
              </tr>
            </thead>
            <tbody>
              {!pokemonData && (
                <tr>
                  <td className ={`abilities ${errorMessage ? 'error' : ""}`}>-</td>
                  <td className ={`abilities ${errorMessage ? 'error' : ""}`}>-</td>
                  <td className ={`abilities ${errorMessage ? 'error' : ""}`}>-</td>
                </tr>
               )}
              {pokemonData && (
                pokemonData.abilities.map((ability, index) => (
                  <tr key={index}>
                    <td className ={`abilities ${'data'}`}>{abilityRedact(ability.ability.name)}</td>
                    <td className ={`abilities ${'data'}`}>Water</td>
                    <td className ={`abilities ${'data'}`}>35</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
      </div>
    </div>
  );
};