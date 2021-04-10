import React, { useEffect, useState } from 'react';

const API_KEY = "7a89d75c51896f1f762c3a7dd3491b6f";
const FEATURED_API = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
const IMG_API = "https://image.tmdb.org/t/p/w1280";


function ValidationForm() {

    const [userInput, setuserInput] = useState('')
    const [movies, setMovies] = useState([]);
    const [SearchError, setSearchError] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setuserInput(e.target.value);
    };

    const validation = (value) =>{
        if(value === ""){
            setSearchError("Enter Movie Name");
        }else{
            setSearchError("");
        }
        return true;
    }

    useEffect(() => {
        fetch(FEATURED_API)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovies(data.results);
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        validation(userInput);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${userInput}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (!data.errors) {
                    setMovies(data.results);
                }
            })
        
    };

    return (
        <div className="Todo-container" >
            <div className="header" >
                <h1>Search Movie</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="Form-Input"
                        type='text'
                        name='Search'
                        placeholder='i.e Avengers'
                        onChange={handleChange}
                        required
                    />
                    <p style={{ fontSize: 18, color: "red" }}>
                        {SearchError}
                    </p>
                    <button className="submitbtn" type="submit">Search</button>
                </form>
            </div>

            <div className="movie-container">
                {
                    movies.length > 0 && movies.map((movie) =>
                        <div className="movie" key={movie.id}>
                            <img src={IMG_API + movie.poster_path} alt={movie.title} />
                            <div className="movie-info">
                                <p>{movie.title}</p>
                                <span>{movie.vote_average}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div >
    );
}
export default ValidationForm;