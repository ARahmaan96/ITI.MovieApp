import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const NoMoviesComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        No favorite movies yet. Why not add a few now?
      </Text>
      <Image
        source={require('./../assets/images/movies_not_found.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#ddd',
    fontSize: 20,
    textAlign: 'center',
    width: 300,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default NoMoviesComponent;
