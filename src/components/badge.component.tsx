import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface IProps {
  text: any;
  type: 'worrning' | 'error' | 'success';
}

const BadgeComponent = ({text, type}: IProps) => {
  let skinStyle;
  switch (type) {
    case 'worrning':
      skinStyle = styles.worringType;
      break;
    case 'error':
      skinStyle = styles.errorType;
      break;
    case 'success':
      skinStyle = styles.succesType;
      break;
  }
  return <Text style={[styles.container, skinStyle]}>{`${text}`}</Text>;
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 7,
    fontSize: 15,
    fontWeight: 'bold',
  },
  errorType: {
    backgroundColor: '#D33242',
    color: '#ddd',
  },
  worringType: {
    backgroundColor: '#F9C000',
    color: '#333',
  },
  succesType: {
    backgroundColor: '#40A73F',
    color: '#ddd',
  },
});

export default BadgeComponent;
