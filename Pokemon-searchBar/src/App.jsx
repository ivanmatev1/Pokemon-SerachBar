import {useState} from "react";
import { SearchBar } from "../components/SearchBar";
import './App.css'

export default function App() {
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar/>
        <div>SearchResult</div>
      </div>
    </div>
  )
}
