import React, { PureComponent } from 'react';
import './Home.css'
import { fetchMovies } from '../api/api'
import Movie from './Movie'

class Home extends PureComponent {
    _isMounted = false;
    inputRef = React.createRef()

    state = {
        movieInput: '',
        moviesArr: [],
        totalResults: '',
        pageNum: 1,
        scrolling: false,
        error: '',
        loadingMsg: '',
    }

    componentDidMount() {
        this._isMounted = true;
        this.inputRef.current.focus()
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleScroll = (e) => {
        const { scrolling, totalResults, pageNum } = this.state
        if (scrolling) return
        if (totalResults <= pageNum) return
        try {
            const lastLi = document.querySelector('ul.movies > li:last-child')
            const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            if (pageOffset > lastLiOffset)
                this.loadMore()
        }
        catch (error) {
            console.log(error)
        }
    }

    handleChange = (e) => {
        this.setState({
            movieInput: e.target.value,
            moviesArr: [],
        })
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({
            loadingMsg: 'Searching..'
        })
        this.fetchMovieList()
    }

    fetchMovieList = async () => {
        const { movieInput, pageNum } = this.state
        const response = await fetchMovies(movieInput, pageNum)
        if (response.Response === 'True') {
            if (this._isMounted) {
                this.setState({
                    moviesArr: [...this.state.moviesArr, ...response.mainResults],
                    totalResults: response.totalResults,
                    scrolling: false,
                    error: response.errorMsg,
                    loadingMsg: '',
                })
            }
        }
        else {
            this.setState({
                error: response.errorMsg,
                loadingMsg: '',
            })
        }
    }

    loadMore = () => {
        this.setState(prevState => ({
            pageNum: prevState.pageNum + 1,
            scrolling: true,
            loadingMsg: 'Loading more..'
        }), this.fetchMovieList)
    }

    render() {
        return (
            <>
                <div className='heading'>
                    <h1>Search for Movies !</h1>
                    <form onSubmit={this.handleClick}>
                        <input type='text' value={this.state.movieInput} onChange={this.handleChange}
                            placeholder='Enter the movie name..'
                            ref= {this.inputRef}
                            required
                        />
                        <input className='search' type='submit' />
                    </form>
                    <span style={error_msg}>{this.state.error !== undefined ? this.state.error : ''}</span>
                </div>
                <div className='container'>
                    {this.state.moviesArr && this.state.moviesArr.map((mov, i) => {
                        return (
                            <ul key={i} className='movies'>
                                <li>
                                    <Movie {...mov} />
                                </li>
                            </ul>
                        )
                    }
                    )}
                </div>
                <h4 style={{ textAlign: 'center', margin: '2rem' }}>{this.state.loadingMsg ? this.state.loadingMsg : ''}</h4>
                <div className='scrollToTop' onClick={() => window.scroll(0, 0)}>
                    <span className='arrowTop'>&uarr;</span>
                </div>
            </>
        );
    }
}

const error_msg = {
    color: 'rgb(219, 113, 13)',
}
export default Home;