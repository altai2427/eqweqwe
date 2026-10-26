
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        setPokemon(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className="message">загрузка покемонов...</h1>;
  }

  if (error) {
    return <h1 className="message">ошибка загрузки покемонов!</h1>;
  }
  return (
    <div className="app">
      <h1>Список покемонов</h1>
      <div className="pokemon-grid">
        {pokemon.map((item) => {
          const id = item.url.split("/").filter(Boolean).pop();
          return (
            <div className="pokemon-card" key={id}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={item.name}
              />

              <h2>{item.name}</h2>
              <p>ID: {id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
