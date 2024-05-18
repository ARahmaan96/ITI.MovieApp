import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useMoviesStore from '../store/movies';
import MovieCardComponent from '../components/movie.card.component';
import {useQuery} from 'react-query';
import {searchMoviesByFilter} from './../services/movies';
import SearchBarComponent from '../components/search.bar..component';

const HomePage = () => {
  const {keyword, filter} = useMoviesStore();

  const {
    data: allMovies,
    isLoading: isLoadingAllMovies,
    error: allMoviesError,
  } = useQuery(['allMovies', keyword, filter], () =>
    searchMoviesByFilter(keyword, filter),
  );

  if (allMoviesError) {
    return <Text>Sorry, something went wrong!</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBarComponent />
      {isLoadingAllMovies ? (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loading}>Loading...</Text>
        </>
      ) : (
        <FlatList
          style={styles.moviesContainer}
          data={allMovies}
          renderItem={({item: movie}) => <MovieCardComponent movie={movie} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3E46',
  },
  moviesContainer: {
    marginHorizontal: 10,
  },
  loading: {
    color: '#ddd',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default HomePage;
