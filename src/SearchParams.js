import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import { async } from "q";

const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [location, setLocation] = useState("Seattle, WA");
  const [pets, setPets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    // console.log("animals", animals);

    setPets(animals || []);
  }
  return (
    <div className="search-params">
      <form
        onSubmit={event => {
          event.preventDefault();
          requestPets();
        }}
      >
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="location">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
