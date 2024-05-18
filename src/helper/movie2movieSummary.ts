function movie2movieSummary(movie: MovieDetails): Movie {
  return {
    _id: movie.id,
    release_date: movie.release_date,
    name: movie.title,
    author: movie.original_language,
    category: movie.genres[0].name,
    type: 'Movie',
    rating: movie.vote_average,
    image: movie.poster_path,
    image_background: movie.backdrop_path,
  };
}

export default movie2movieSummary;
