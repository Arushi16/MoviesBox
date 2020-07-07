require('dotenv').config()

const base = "https://www.omdbapi.com/?apikey=";

const apiKey = process.env.REACT_APP_API_KEY

export const fetchMovies = async (searchString,page) => {
    try {
        const query = searchString.split(' ').join('%20')
        const link = `${base}${apiKey}&s=${query}&page=${page}`
        const response = await fetch(link)
        const results = await response.json()
        return {
            mainResults: results.Search,
            totalResults: Math.ceil((results.totalResults)/10),
            errorMsg: results.Error,
            Response: results.Response,
        }
    }
    catch (error) {
        console.error()
    }
}

export const fetchMovieDetails = async (query) => {
    try {
        const link = `${base}${apiKey}&i=${query}`
        const response = await fetch(link)
        const results = await response.json()
        return results
    }
    catch (error) {
        console.error()
    }
}