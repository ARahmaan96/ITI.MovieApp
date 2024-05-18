type MovieSearchResult = {
  id: number;
  title: string;
  original_language: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string | null;
};
