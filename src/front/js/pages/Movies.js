import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import Card from '../component/Card';

function Movies() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchPopularMovies();
        actions.fetchGenresAndLanguages();
    }, []);

    const handleFiltersChange = async () => {
        try {
            actions.fetchFilteredMovies(
                store.selectedGenre,
                store.selectedLanguage,
                store.selectedRuntime
            );
        } catch (err) {
            console.error("Error in handleFiltersChange:", err);
        }
    };

    const handleSearchBar = () => {
        if (store.searchWord === "") {
            actions.fetchPopularMovies();
        } else {
            actions.filterMoviesWithSearchBar(store.searchWord);
        }
    };

    const handleClearButton = () => {
        actions.clearFiltersButton();
    }

    return (
        <div className="movies-container">
            <h1 className="movies-title">Looking for something to watch?</h1>
            <form onChange={handleSearchBar}>
                <div className="input-group searchbar-input-group">
                    <div className="form-outline">
                        <input id="movies-search-input" type="search" className="form-control"
                            placeholder="Search a movie by title"
                            value={store.searchWord}
                            onChange={(e) => actions.updateSearchWord(e.target.value)} />
                    </div>
                </div>
            </form>
            <hr className="hr hr-blurry" />
            <div className="row justify-content-center mb-5">
                <div className="col-4">
                    <div className="category-selector">
                        <select className="form-select" value={store.selectedGenre} onChange={(e) => actions.setSelectedGenre(e.target.value)}>
                            <option value="" key="0">Category</option>
                            {store.genres.map(genre => (
                                <option key={genre.id} className="movies-option" value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="language-selector">
                        <select className="form-select" value={store.selectedLanguage} onChange={(e) => actions.setSelectedLanguage(e.target.value)}>
                            <option value="" key="0">Movie Language</option>
                            {store.languages.map(language => (
                                <option key={language.iso_639_1} className="language-option" value={language.iso_639_1}>
                                    {language.english_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="runtime-selector">
                        <select className="form-select" value={store.selectedRuntime} onChange={(e) => actions.setSelectedRuntime(e.target.value)}>
                            <option value="" key="0">Available Time</option>
                            <option value="30">Up to 30 minutes</option>
                            <option value="60">Up to 1 hour</option>
                            <option value="90">Up to 1.5 hours</option>
                            <option value="120">Up to 2 hours</option>
                            <option value="150">Up to 2.5 hours</option>
                            <option value="180">Up to 3 hours</option>
                        </select>
                    </div>
                </div>
                <div className="filter-button-container">
                    <button className="filter-button"
                        onClick={handleFiltersChange}>Filter Movies
                    </button>
                    <button className="clear-button"
                        onClick={handleClearButton}>Clear
                    </button>
                </div>
            </div>
            <div>
                <div className="text-center d-flex overflow-auto pt-3 movies-card-container">
                    {store.recommendations === false ?
                        <div className="no-movies-text">
                            Sorry we ran out of recommendations
                        </div> :
                        store.filteredMovies.map(movie => (
                            <Card key={movie.id} movie={movie} user_id={store.user_id} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Movies;