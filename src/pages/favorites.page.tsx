import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import useFavoriteStore from '../store/favorite';
import MovieCardComponent from '../components/movie.card.component';
import NoMoviesComponent from '../components/no.movies.component';

const FavoritesPage = () => {
  const {favorite} = useFavoriteStore();
  return (
    <View style={styles.container}>
      {favorite.length === 0 ? (
        <NoMoviesComponent />
      ) : (
        <FlatList
          style={styles.moviesContainer}
          data={favorite}
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
});

export default FavoritesPage;
