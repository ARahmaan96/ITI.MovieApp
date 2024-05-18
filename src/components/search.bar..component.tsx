import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useMoviesStore from '../store/movies';

const DATA = [
  {id: 'now_playing', name: 'Now Playing'},
  {id: 'popular', name: 'Popular'},
  {id: 'top_rated', name: 'Top Rated'},
  {id: 'upcoming', name: 'Upcoming'},
];

const SearchBarComponent = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const {setFilter, setKeyword: setKeyword_store} = useMoviesStore();
  useEffect(() => {
    if (keyword === '' && value === '') {
      setValue('popular');
      setFilter('popular');
    }
  }, [keyword, setFilter, value]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.keyword}
        value={keyword}
        onChangeText={txt => {
          setKeyword(txt);
          setKeyword_store(txt);
          setValue('');
          setFilter('');
        }}
        placeholder="Search"
        placeholderTextColor="#eee"
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.dropdownText}
        selectedTextStyle={styles.dropdownText}
        data={DATA}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        searchPlaceholder="Search"
        placeholder="Filter"
        value={value}
        onChange={item => {
          setValue(item.id);
          setFilter(item.id);
          setKeyword('');
          setKeyword_store('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  keyword: {
    flex: 1,
    color: '#eee',
    backgroundColor: '#222831',
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
  },
  dropdown: {
    backgroundColor: '#222831',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  dropdownText: {
    verticalAlign: 'middle',
    color: '#eee',
    fontSize: 17,
    overflow: 'hidden',
  },
});

export default SearchBarComponent;
