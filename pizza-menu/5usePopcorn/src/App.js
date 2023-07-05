import { useState } from "react";
import { Navbar, Logo, NumResults, Search } from './component/index'
import { Main, Box, MovieList, WatchedSummary, WatchedMoviesList } from './component/index'
import { tempMovieData } from "./data/index";
import { tempWatchedData } from "./data/index";
import StarRating from './component/StarRating'


function Test() {
  const [movieRating, setMovieRating] = useState(0)

  return (
    <div>
      <StarRating color='#fcc419' defaultRating={2} maxRating={6} size={25} userRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  )
}


export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);



  return (
    <>
      {/* component composition/removed propdrilling */}
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        {/* component composition using children prop to enhance reusability
        In this case both elements share the same boolean state and styling
         the only changing thing is the children
        */}
        <Box>
          <MovieList movies={movies} />
        </Box>


        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
          <Test />
        </Box>
        {/* <WatchedBox /> */}
        {/* component composition using Explicitly defined prop composition 
           <Box element={<MovieList movies={movies} />}/>
        */}

      </Main>
    </>
  );
}
