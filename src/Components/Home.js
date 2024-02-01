import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faLanguage, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const para = {
    WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box'
}
const Home = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const [showBtn, setShowBtn] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            setShowBtn(ref.current.scrollHeight !== ref.current.clientHeight)
        }
    })


    const fetchData = async () => {
        const res = await fetch('https://api.tvmaze.com/search/shows?q=all')
        const movies = await res.json()
        const moviesWithOpenState = movies.map(movie => ({ ...movie, open: false }));
        setData(moviesWithOpenState);
        console.log("dd", movies);



    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleToggleOpen = (index) => {
        setData((prevData) =>
            prevData.map((movie, i) => (i === index ? { ...movie, open: !movie.open } : movie))
        );
    };
    return (
        <div className="App">
            {/* <h1>Quad B Movies</h1> */}

            <div className='wrapper'>
                {
                    data.map((movie) => (
                        <div className="" key={movie.show.id}>

                            <div className="card-container">
                                <a href="/" className="hero-image-container">
                                    {movie.show.image && movie.show.image.medium ? (
                                        <img
                                            className="hero-image"
                                            src={movie.show.image.medium}
                                            alt={movie.show.name}
                                        />
                                    ) : movie.show.image && movie.show.image.original ? (
                                        <img
                                            className="hero-image"
                                            src={movie.show.image.original}
                                            alt={movie.show.name}
                                        />
                                    ) : (
                                        <p>No Image Available</p>
                                    )}

                                </a>
                                <main className="main-content">
                                    <h1>
                                        <a href="#">{movie.show.name}</a>
                                    </h1>
                                    <div className="" style={{display:"flex",justifyContent:"space-between"}}>
                                        <div className="" style={{color:"white"}}>


                                            <FontAwesomeIcon icon={faStar} style={{ marginRight: "10px" ,color:"white"}} />{movie.show.rating.average}
                                        </div>
                                        <div className="" style={{color:"white"}}>


                                            <FontAwesomeIcon icon={faLanguage} style={{ marginRight: "10px" ,color:"white"}} />{movie.show.language}
                                        </div>
                                    </div>
                                    {movie.show.summary && (
                                        <div
                                            style={open ? null : para}
                                            // ref={ref}
                                            dangerouslySetInnerHTML={{ __html: movie.show.summary }}
                                            className="movie-summary"
                                        />
                                    )}


                                    {/* <button onClick={()=>setOpen(!open)} >
          {
            open ?'read less':'read more....'
          }
        </button> */}
                                    {/* {showBtn && (
                                        <button onClick={() => handleToggleOpen(index)}>
                                            {movie.open ? 'read less' : 'read more....'}
                                        </button>
                                    )} */}



                                    <div className="flex-row">
                                        <div className="coin-base">
                                            <FontAwesomeIcon icon={faFilm} style={{ marginRight: "10px" ,color:"white"}} />

                                            {movie.show.genres && (
                                                <h2>{movie.show.genres.join(', ')}</h2>
                                            )}
                                        </div>
                                        <div className="time-left">

                                            <img
                                                src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png"
                                                alt="clock"
                                                className="small-image"
                                            />
                                            <p> {movie.show.runtime} </p>
                                        </div>
                                    </div>
                                </main>
                                <div className="card-attribute">
                                    <Link to={`/book/${movie.show.id}`}>

                                        <button className='btn'>Book Your Tickets</button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))
                }


            </div>

        </div>
    )
}

export default Home