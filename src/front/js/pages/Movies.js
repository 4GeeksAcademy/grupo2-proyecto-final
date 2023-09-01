import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../component/Card';

function Movies() {
    const { store, actions } = useContext(Context);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTFjMzFjOGEwZWI5NWQ1ZDc5ZWQ5ZWQ2MDkyOTQ1NSIsInN1YiI6IjY0ZTE1NjRiMzcxMDk3MDBjNTFmMTc0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18MGWT9MvPDPzkhWNEHVPZ4hDY_Y-nxkQt4-9R0A_2c'
                }
            };

            const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?include_adult=false&language=en`, options);
            const data = await resp.json();
            setFilteredMovies(data.results);
        } catch (err) {
            console.error("Error fetching popular movies:", err);
        }
    };

    // filters by genre and by language
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTFjMzFjOGEwZWI5NWQ1ZDc5ZWQ5ZWQ2MDkyOTQ1NSIsInN1YiI6IjY0ZTE1NjRiMzcxMDk3MDBjNTFmMTc0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18MGWT9MvPDPzkhWNEHVPZ4hDY_Y-nxkQt4-9R0A_2c'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .then(data => setGenres(data.genres))
            .catch(err => console.error('Error fetching genres:', err));

        fetch('https://api.themoviedb.org/3/configuration/languages', options)
            .then(response => response.json())
            .then(data => setLanguages(data))
            .catch(err => console.error('Error fetching languages:', err))
    }, []);

    const handleFiltersChange = async () => {
        if (selectedGenre !== "" || selectedLanguage !== "") {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTFjMzFjOGEwZWI5NWQ1ZDc5ZWQ5ZWQ2MDkyOTQ1NSIsInN1YiI6IjY0ZTE1NjRiMzcxMDk3MDBjNTFmMTc0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18MGWT9MvPDPzkhWNEHVPZ4hDY_Y-nxkQt4-9R0A_2c'
                    }
                };

                const languageParam = selectedLanguage !== "" ? `&language=${selectedLanguage}` : '';
                const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false${languageParam}&sort_by=popularity.desc&with_genres=${selectedGenre}`, options)
                const data = await resp.json();
                setFilteredMovies(data.results);
            } catch (err) {
                console.error("Error fetching filtered movies:", err);
            }
        } else {
            fetchPopularMovies();
        }
    };

    const handleSearchBar = (e) => {
        if (e.target.value === "") {
            fetchPopularMovies();
        } else {
            const filteredInfo = filteredMovies.filter(movie => {
                const title = movie.title.toLowerCase();
                const currentWordLower = currentWord.toLowerCase();
                return title.includes(currentWordLower);
            });
            setFilteredMovies(filteredInfo);
        }
    };

    return (
        <div className="movies-container">
            <h1 className="movies-title">Looking for something to watch?</h1>
            <form onChange={handleSearchBar}>
                <div className="input-group searchbar-input-group">
                    <div className="form-outline">
                        <input id="movies-search-input" type="search" className="form-control"
                            placeholder="Search a movie by title"
                            value={currentWord}
                            onChange={(e) => { setCurrentWord(e.target.value) }} />
                    </div>
                </div>
            </form>
            <hr className="hr hr-blurry" />
            <div className="row justify-content-center mb-5">
                <div className="col-4">
                    <div className="category-selector">
                        <select className="form-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="" key="0">Category</option>
                            {genres.map(genre => (
                                <option key={genre.id} className="movies-option" value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="language-selector">
                        <select className="form-select" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                            <option value="" key="0">Movie Language</option>
                            {languages.map(language => (
                                <option key={language.iso_639_1} className="language-option" value={language.iso_639_1}>
                                    {language.english_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="filter-button-container">
                    <button className="filter-button"
                        onClick={handleFiltersChange}>Filter Movies</button>
                </div>
            </div>
            <div>
                <div className="text-center d-flex overflow-auto pt-3 movies-card-container">
                    {filteredMovies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Movies;