import React, {useRef} from 'react'
import classes from './AddMovies.module.css'


const AddMovies = (props) => {

const titleInputRef = useRef('')
const openingTextInputRef = useRef('')
const releaseDateInputRef = useRef('')

const onSubmitHandler = (e) => {
 e.preventDefault()

 const movie = {
  title: titleInputRef.current.value,
  openingText: openingTextInputRef.current.value,
  releaseDate: releaseDateInputRef.current.value
}
props.onAddMovies(movie)
}



  return (
   <form onSubmit={onSubmitHandler}>
     <div className={classes.control}>
     <label htmlFor="title">Title</label>
     <input 
     id='title' 
     type="text"
     ref={titleInputRef}
     />
     </div>
     <div className={classes.control}>
       <label htmlFor="opening-text">Opening Text</label>
       <textarea 
       name="" 
       id="opening-text" 
       cols="30" 
       rows="5"
       ref={openingTextInputRef}
       ></textarea>
     </div>
     <div className={classes.control}>
       <label htmlFor="date">Release Date</label>
       <input 
       id='date' 
       type="text"
       ref={releaseDateInputRef}/>
     </div>
     <button>Add Movie</button>
     
   </form>
  )
}

export default AddMovies