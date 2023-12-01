// Karakter bileşeniniz buraya gelecek
import React, { useState, useEffect } from "react";
import axios from "axios";

function Karakter() {
  const [karakterData, setKarakterData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);
  const [selectedKarakter, setSelectedKarakter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const karakterResult = await axios.get("https://swapi.dev/api/people/");
      setKarakterData(karakterResult.data.results);

      const filmsResult = await axios.get("https://swapi.dev/api/films/");
      setFilmsData(filmsResult.data.results);
    };
    fetchData();
  }, []);

  const handleAccordionClick = (karakter) => {
    setSelectedKarakter(selectedKarakter === karakter ? null : karakter);
  };

  return (
    <div className="container">
      <h1>Star Wars Karakterleri</h1>
      <div className="karakter-listesi">
        <h2>Karakterler</h2>
        <ul>
          {karakterData.map((karakter) => (
            <li key={karakter.url}>
              <button onClick={() => handleAccordionClick(karakter)}>
                {karakter.name}
              </button>
              {selectedKarakter === karakter && (
                <div>
                  <ul>
                    <li>
                      Gender: <span>{selectedKarakter.gender}</span>
                    </li>
                    <li>
                      Height: <span>{selectedKarakter.height}</span>
                    </li>
                    <li>
                      Mass: <span>{selectedKarakter.mass}</span>
                    </li>
                    <li>
                      Birth Year: <span>{selectedKarakter.birth_year}</span>
                    </li>
                    <li>
                      Eye Color: <span>{selectedKarakter.eye_color}</span>
                    </li>
                    <li>
                      Hair Color: <span>{selectedKarakter.hair_color}</span>
                    </li>
                    <li>
                      Skin Color: <span>{selectedKarakter.skin_color}</span>
                    </li>
                  </ul>
                  <h3>Filmler</h3>
                  <ul>
                    {selectedKarakter.films.map((filmUrl) => {
                      const film = filmsData.find((f) => f.url === filmUrl);
                      return (
                        <li key={filmUrl}>
                          <h4>{film.title}</h4>
                          <p>Episode: {film.episode_id}</p>
                          <p>Director: {film.director}</p>
                          <p>Producer: {film.producer}</p>
                          <p>Release Date: {film.release_date}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Karakter;


