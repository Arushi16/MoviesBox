import React from 'react';
import '../App'

export const Footer = () => {
    return (
        <div>
            <footer>
                <p>
                    <span role='img'>&copy;</span>
                    This website is made by Arushi !
                    <span role='img' aria-labelledby='heart'>&#128151;</span>
                    Movie icon by
                    <a target="_blank" rel="noopener" href="https://icons8.com"> Icons8. </a>
                    <a target="_blank" rel="noopener" href="http://www.omdbapi.com/">Movie API by OMDB API</a>
                </p>
            </footer>
        </div>
    )
}