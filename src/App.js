import React, {Fragment, useState, useEffect, useCallback} from "react";
import './App.css'
import "./style.css";
import AddMovies from './components/AddMovies'
import MoviesList from './components/MoviesList'

export default function App() {

const [movies, setMovies] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)



const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true)
  setError(null)
  try {
    const response = await fetch ('https://apifetching-fdce2-default-rtdb.europe-west1.firebasedatabase.app/movies.json')

    if(!response.ok) {
      throw new Error('Something went wrong')
    } 

    const data = await response.json()

    const loadedMovies = []

    for(const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate 
      })
    }

    
    setMovies(loadedMovies)
  } catch (error) {
    setError(error.message)
  }
  setIsLoading(false)
}, [])

useEffect(() => {
  fetchMoviesHandler()
}, [fetchMoviesHandler])

async function addMoviesHandler (movies)  {
  const response = await fetch('https://apifetching-fdce2-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
    method: 'POST',
    body: JSON.stringify(movies),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log(data)
}

let content = <p>Found no movies</p>

if(movies.length > 0) {
  content = <MoviesList movies={movies}/>
}

if(error) {
  content= <p>{error}</p>
}

if(isLoading) {
  content = <p>...Loading</p>
}



  return (
    <Fragment>
      <section>
       <AddMovies onAddMovies={addMoviesHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
}
