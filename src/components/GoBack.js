import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function GoBack() {
    return (
        <div>
            <Link to='/' className='goBack'>
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default GoBack
