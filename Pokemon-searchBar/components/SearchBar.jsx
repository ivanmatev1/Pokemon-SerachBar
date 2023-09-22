import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handlePokemonClick = (pokemonName) => {
    setInput(pokemonName);
  };

  const displayInput = () => {
    console.log("Input value:", input);
  };

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <input
          placeholder="Which pokemon?"
          value={input}
          onChange={handleInputChange}
        />
        <button className="fetch-button" onClick={displayInput}>
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
    </div>
  );
};
