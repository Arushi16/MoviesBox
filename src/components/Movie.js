import React from 'react';
import './Movie.css'
import { Link } from 'react-router-dom'

const DEFAULT_IMG = `https://cdn2.vectorstock.com/i/1000x1000/57/86/cinema-and-movie-night-background-two-vector-19355786.jpg`

const Movie = (props) => {
    const poster = (props.Poster === 'N/A' ? DEFAULT_IMG : props.Poster)
    return (
        <>
            <div className='movie-card'>
                <Link to={`/MovieSearch/${props.imdbID}`} className='link_details'>
                    <div className='image-card'>
                        <img src={poster} alt={props.Title} />
                    </div>
                    <div className='detail-card'>
                        <h5>{props.Title}</h5>
                        <span className='year'> ({props.Year})</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Movie