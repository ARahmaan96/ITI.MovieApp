import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useFavoriteStore from '../store/favorite';
import BadgeComponent from './badge.component';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native';

interface IProps {
  movie: Movie;
  style?: StyleProp<ViewStyle>;
}

const MovieCardComponent = ({movie, style}: IProps) => {
  const {addFavorite, removeFavorite, isFavorite} = useFavoriteStore();

  const fav = isFavorite(movie._id);

  const toggelLike = () => {
    if (fav) {
      removeFavorite(movie._id);
    } else {
      addFavorite(movie);
    }
  };
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'movie_details'>>();

  const navigateMovie = () => {
    navigation.navigate('movie_details', {
      movie_id: movie._id,
    });
  };
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={navigateMovie}>
        <Image
          source={{
            uri:
              movie.image_background ||
              movie.image ||
              'https://img.icons8.com/?size=256&id=81984&format=png',
          }}
          style={styles.image}
        />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {movie.name}
        </Text>
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
      <View style={styles.detailsContainer}>
        <Text style={styles.releaseDate}>
          Year: {movie.release_date?.split('-')[0]}
        </Text>
        <BadgeComponent
          text={movie.rating}
          type={
            movie.rating < 6 && movie.rating > 4
              ? 'worrning'
              : movie.rating > 6
              ? 'success'
              : 'error'
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    padding: 10,
    borderRadius: 20,
    marginVertical: 7,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  title: {
    width: '85%',
    fontSize: 20,
    color: '#fff',
    paddingVertical: 15,
  },
  favIconEnable: {
    color: '#d33',
  },
  favIconDisable: {
    color: '#555',
  },
  releaseDate: {
    color: '#ddd',
    fontSize: 17,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 7,
  },
});

export default MovieCardComponent;
