import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {getMovie, getSimilarMovies} from '../services/movies';
import BadgeComponent from '../components/badge.component';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useFavoriteStore from '../store/favorite';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import movie2movieSummary from '../helper/movie2movieSummary';
import {StackNavigationProp} from '@react-navigation/stack';
import MovieCardComponent from '../components/movie.card.component';

const MovieDetailsPage = () => {
  const {
    params: {movie_id},
  } = useRoute<RouteProp<RootStackParamList, 'movie_details'>>();

  const {addFavorite, removeFavorite, isFavorite} = useFavoriteStore();

  const fav = isFavorite(movie_id);

  const {data: movie, isLoading} = useQuery(
    [`getMovie_${movie_id}`, movie_id],
    () => getMovie(movie_id),
  );
  const {data: similerMovie, isLoading: similerMovieLoading} = useQuery(
    [`getSimilarMovies_${movie_id}`, movie_id],
    () => getSimilarMovies(movie_id),
  );

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'watch_page'>>();

  if (isLoading) {
    return (
      <ScrollView style={[styles.container, styles.pt5]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loading}>Loading ...</Text>
      </ScrollView>
    );
  }
  if (!movie) {
    return <Text>An Error Occure!!</Text>;
  }

  const toggelLike = () => {
    if (fav) {
      removeFavorite(movie_id);
    } else {
      addFavorite(movie2movieSummary(movie));
    }
  };
  const watchMovie = () => {
    navigation.navigate('watch_page', {
      url: movie.homepage,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{
            uri:
              movie.backdrop_path ||
              movie.poster_path ||
              'https://img.icons8.com/?size=256&id=81984&format=png',
          }}
          style={styles.backgroundImage}
          blurRadius={5}
        />
        <Image
          source={{
            uri:
              movie.poster_path ||
              movie.backdrop_path ||
              'https://img.icons8.com/?size=256&id=81984&format=png',
          }}
          style={styles.posterImage}
        />
        {/* Watch Now */}
        <Pressable onPress={watchMovie} style={styles.watchMovie}>
          <BadgeComponent text={'Watch Now!'} type="error" />
        </Pressable>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.generContiner}>
          {movie.genres.map(genre => (
            <BadgeComponent text={genre.name} type="worrning" />
          ))}
        </View>

        <View style={styles.yearSection}>
          <Text style={styles.releaseDate}>
            Year: {movie.release_date?.split('-')[0]}
          </Text>
          <View style={styles.rateContainer}>
            <Text style={styles.rate}>Rate:</Text>
            <BadgeComponent
              text={movie.vote_average}
              type={
                movie.vote_average < 6 && movie.vote_average > 4
                  ? 'worrning'
                  : movie.vote_average > 6
                  ? 'success'
                  : 'error'
              }
            />
          </View>
          <Pressable onPress={toggelLike}>
            {fav ? (
              <FontAwesomeIcon
                icon={faHeart}
                style={styles.favIconEnable}
                size={30}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                style={styles.favIconDisable}
                size={30}
              />
            )}
          </Pressable>
        </View>

        <Text style={styles.overview} numberOfLines={3} ellipsizeMode="tail">
          Spoken Languages :{' '}
          {movie.spoken_languages.map(sl => sl.english_name).join(', ')}
        </Text>

        <Text style={styles.overview} numberOfLines={3} ellipsizeMode="tail">
          {movie.overview}
        </Text>

        {movie.belongs_to_collection.id ? (
          <>
            <Text style={styles.blongToCollection}>Belongs To Collection</Text>
            <View style={styles.belongs_to_collection}>
              <Image
                source={{
                  uri:
                    movie.belongs_to_collection.backdrop_path ||
                    movie.belongs_to_collection.poster_path ||
                    'https://img.icons8.com/?size=256&id=81984&format=png',
                }}
                style={styles.belongs_to_collection_backgroundImage}
                blurRadius={5}
              />
              <Image
                source={{
                  uri:
                    movie.belongs_to_collection.poster_path ||
                    movie.belongs_to_collection.backdrop_path ||
                    'https://img.icons8.com/?size=256&id=81984&format=png',
                }}
                style={styles.belongs_to_collection_posterImage}
              />
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={styles.belongs_to_collection_title}>
                {movie.belongs_to_collection.name}
              </Text>
            </View>
          </>
        ) : null}

        {movie.production_companies.length > 0 ? (
          <View style={styles.production_companies_container}>
            <Text style={styles.blongToCollection}>Production Companies</Text>
            <FlatList
              data={movie.production_companies}
              renderItem={({item}) => (
                <View style={styles.production_companies_card}>
                  <Image
                    source={{
                      uri:
                        item.logo_path ||
                        'https://img.icons8.com/?size=256&id=81984&format=png',
                    }}
                    style={styles.belongs_to_collection_posterImage}
                  />
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={styles.belongs_to_collection_title}>
                    {movie.belongs_to_collection.name}
                  </Text>
                </View>
              )}
              horizontal={true}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ) : null}
      </View>
      {similerMovie ? (
        similerMovieLoading ? (
          <>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loading}>Loading...</Text>
          </>
        ) : (
          <>
            <Text style={styles.blongToCollection}>Similar Movie</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={similerMovie}
              style={styles.similerMoviesContainer}
              renderItem={({item: _movie}) => (
                <MovieCardComponent
                  movie={_movie}
                  style={styles.similerMovies}
                />
              )}
            />
          </>
        )
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pt5: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#222732',
  },
  backgroundImage: {
    width: '100%',
    height: 380,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  posterImage: {
    position: 'absolute',
    width: 270,
    height: 380,
    top: 90,
    left: 75,
    borderRadius: 10,
  },
  watchMovie: {
    position: 'absolute',
    width: 100,
    height: 50,
    top: 20,
    right: 20,
  },
  belongs_to_collection: {},
  belongs_to_collection_backgroundImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  belongs_to_collection_posterImage: {
    position: 'absolute',
    width: 150,
    height: 180,
    top: 10,
    right: 20,
    borderRadius: 10,
  },
  belongs_to_collection_title: {
    backgroundColor: '#0009',
    position: 'absolute',
    height: 180,
    width: 170,
    top: 10,
    left: 20,
    fontSize: 30,
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#eee',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 100,
    margin: 10,
    marginBottom: 0,
    display: 'flex',
    gap: 10,
  },
  title: {
    color: '#ddd',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  overview: {
    margin: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  releaseDate: {
    color: '#ddd',
    fontSize: 17,
  },
  yearSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rate: {
    color: '#ddd',
    fontSize: 20,
  },
  rateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  blongToCollection: {
    fontSize: 20,
    textAlign: 'center',
    color: '#eee',
    borderColor: '#555',
    borderTopWidth: 1,
    borderStyle: 'solid',
    marginTop: 10,
    paddingTop: 10,
  },
  favIconEnable: {
    color: '#d33',
  },
  favIconDisable: {
    color: '#555',
  },
  generContiner: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  budgetText: {
    color: '#eee',
    fontSize: 20,
  },
  production_companies_card: {
    width: 200,
    height: 200,
  },
  production_companies_container: {},
  similerMoviesContainer: {
    backgroundColor: '#3A3E46',
    marginVertical: 20,
  },
  similerMovies: {
    width: 260,
    height: 320,
    margin: 10,
  },
  loading: {
    color: '#ddd',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MovieDetailsPage;
