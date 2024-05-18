import axios from 'axios';

// API configuration
const apiKey = '97bcbe54349a246ad9f8b5fb458a0555';
const baseUrl = 'https://api.themoviedb.org/3';
const imgPath = 'https://image.tmdb.org/t/p/w500';

const getMovie = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${id}?api_key=${apiKey}`,
    );
    const movie: MovieDetails = response.data;

    // Modify the id to string and handle image and image background paths
    const movieDetails: MovieDetails = {
      ...movie,
      id: movie.id.toString(),
      poster_path: movie.poster_path
        ? `${imgPath}/${movie.poster_path}`
            .replace('}', '')
            .replace('//', '/')
            .replace('//', '/')
        : null,
      backdrop_path: movie.backdrop_path
        ? `${imgPath}/${movie.backdrop_path}`
            .replace('}', '')
            .replace('//', '/')
            .replace('//', '/')
        : null,
      // Handle the rest of the images
      belongs_to_collection: {
        ...movie.belongs_to_collection,
        poster_path: movie.belongs_to_collection?.poster_path
          ? `${imgPath}/${movie.belongs_to_collection.poster_path}`
              .replace('}', '')
              .replace('//', '/')
              .replace('//', '/')
          : null,
        backdrop_path: movie.belongs_to_collection?.backdrop_path
          ? `${imgPath}/${movie.belongs_to_collection.backdrop_path}`
              .replace('}', '')
              .replace('//', '/')
              .replace('//', '/')
          : null,
      },
      // Handle production company logos
      production_companies: movie.production_companies.map(company => ({
        ...company,
        logo_path: company.logo_path
          ? `${imgPath}/${company.logo_path}`
              .replace('}', '')
              .replace('//', '/')
              .replace('//', '/')
          : null,
      })),
    };

    return movieDetails;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    return null;
  }
};

const searchMoviesByFilter = async (
  keywords: string,
  filter: string,
): Promise<Movie[]> => {
  try {
    const url =
      keywords.length > 0
        ? `${baseUrl}/search/movie`
        : `${baseUrl}/movie/${filter || 'popular'}`;
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        query: keywords,
        include_adult: true,
        language: 'en-US',
        page: 1,
      },
    });
    const movies: Movie[] = response.data.results.map(
      (movie: MovieSearchResult) => ({
        _id: movie.id.toString(),
        release_date: movie.release_date,
        name: movie.title,
        author: movie.original_language,
        category: movie.genre_ids.join(', '),
        type: 'Movie',
        rating: movie.vote_average,
        image: `${imgPath}}/${movie.poster_path}`
          .replace('}', '')
          .replace('//', '/')
          .replace('//', '/'),
        image_background: movie.backdrop_path?.indexOf('null')
          ? `${imgPath}/${movie.backdrop_path}`
              .replace('}', '')
              .replace('//', '/')
              .replace('//', '/')
          : null,
      }),
    );
    return movies;
  } catch (error) {
    console.error('Error searching movies by keywords:', error);
    return [];
  }
};

const getSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  try {
    const url = `${baseUrl}/movie/${movieId}/similar`;
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1,
      },
    });

    const movies: Movie[] = response.data.results.map(
      (movie: MovieSearchResult) => ({
        _id: movie.id.toString(),
        release_date: movie.release_date,
        name: movie.title,
        author: movie.original_language,
        category: movie.genre_ids.join(', '),
        type: 'Movie',
        rating: movie.vote_average,
        image: `${imgPath}/${movie.poster_path}`
          .replace('}', '')
          .replace('//', '/')
          .replace('//', '/'),
        image_background: movie.backdrop_path
          ? `${imgPath}/${movie.backdrop_path}`
              .replace('}', '')
              .replace('//', '/')
              .replace('//', '/')
          : null,
      }),
    );

    return movies;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
};

export {getMovie, searchMoviesByFilter, getSimilarMovies};
