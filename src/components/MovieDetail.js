import React, { PureComponent } from 'react';
import { fetchMovieDetails } from '../api/api'
import './MovieDetail.css'
import { renderColor, renderWidth } from './renderValues'
import { Error } from './Error'
import GoBack from './GoBack';

const DEFAULT_IMG = `https://cdn2.vectorstock.com/i/1000x1000/57/86/cinema-and-movie-night-background-two-vector-19355786.jpg`

class MovieDetail extends PureComponent {
    _isMounted = false;

    state = {
        movie: [],
        loading: true,
        validMovie: 'True',
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchMovie()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchMovie = async () => {
        const response = await fetchMovieDetails(`${this.props.match.params.id}`)
        if (this._isMounted) {
            this.setState({
                movie: response,
                loading: false,
                validMovie: response.Response,
            })
        }
    }

    render() {
        const { movie, loading, validMovie } = this.state

        const poster = movie.Poster === 'N/A' ? DEFAULT_IMG : movie.Poster
        return (
            <>
                {validMovie === 'False'
                    ?
                    <Error />
                    :
                    (
                        loading ? <h2 className='loading'>Loading.. Please wait ! <span role='img' aria-labelledby='heart'>&#9203;</span> </h2>
                            :
                            <>
                                <GoBack />
                                <div className='movie-Board'>
                                    <div className='image-section'>
                                        <img src={poster} alt={movie.Title} className='image' />
                                    </div>
                                    <div className='details-section'>
                                        <p className='subhead title'>{movie.Title}</p>
                                        <p className='subhead subType'>({movie.Type})</p>
                                        <p className='subhead'>{movie.Plot !== 'N/A' ? movie.Plot : ''}</p>
                                        {movie.Actors !== 'N/A' ? <p><span className='head-text'>Cast:</span> <span className='subhead'>{movie.Actors}</span></p> : ''}
                                        <p><span className='head-text'>Released on:</span> <span className='subhead'>{movie.Released}</span></p>
                                        <p><span className='head-text'>Country: </span><span className='subhead'>{movie.Country}</span></p>
                                        {movie.Ratings ? movie.Ratings.length ? <p className='head-text ratings'>Ratings</p> : '' : ''}
                                        {movie.Ratings ? movie.Ratings.map(rating =>
                                            <div key={rating.Source} className='ratings'>
                                                <p>{rating.Source}: {rating.Value}</p>
                                                <div style=
                                                    {{
                                                        width: renderWidth(rating.Value),
                                                        height: '5px',
                                                        backgroundColor: renderColor(rating.Value),
                                                    }} className='progressBar' />
                                            </div>
                                        ) : <p>{movie.imdbRating}/10</p>}
                                        <div className="tags-container">
                                            {movie.Genre &&
                                                movie.Genre.split(', ').map(g => (
                                                    <span key={g}>{g}</span>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                    )
                }
            </>
        );
    }
}

export default MovieDetail;