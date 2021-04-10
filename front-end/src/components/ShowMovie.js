import React from 'react';
// import Overview from './Overview';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Homepage = (props) => {
    return (

        <div className="movie">
            <img src={IMG_API + props.poster_path} alt={props.title} />
            <div className="movie-info">
                <p>{props.title}</p>
            </div>
        </div>
    )
}
export default Homepage;
