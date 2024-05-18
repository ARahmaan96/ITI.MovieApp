import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import HomePage from './pages/home.page';
import FavoritesPage from './pages/favorites.page';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {QueryClient, QueryClientProvider} from 'react-query';
import MovieDetailsPage from './pages/movie.details.page';
import WatchPage from './pages/watch.page';

const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<RootStackParamList>();

const HomeIcon = (color: string, size: number) => (
  <FontAwesomeIcon icon={faHome} size={size} color={color} />
);
const FavoritsIcon = (color: string, size: number) => (
  <FontAwesomeIcon icon={faHeart} size={size} color={color} />
);
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: {fontSize: 15, color: '#fff'},
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerTitleAlign: 'center',
    }}>
    <Tab.Screen
      name="home"
      component={HomePage}
      options={{
        tabBarLabel: 'Home',
        title: 'Home',
        tabBarIcon: ({color, size}) => HomeIcon(color, size),
      }}
    />
    <Tab.Screen
      name="favorites"
      component={FavoritesPage}
      options={{
        tabBarBadge: undefined,
        tabBarLabel: 'Favorites',
        title: 'Favorites',
        tabBarIcon: ({color, size}) => FavoritsIcon(color, size),
      }}
    />
  </Tab.Navigator>
);
const StackNavigatorHeader = ({navigation}: StackHeaderProps) => (
  <View>
    <Pressable
      style={styles.StackNavigatorHeader}
      onPress={() => navigation.pop()}>
      <FontAwesomeIcon icon={faArrowLeft} size={25} color={'#fff'} />
    </Pressable>
  </View>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{header: () => null}}
              name="home_tab_navigator"
              component={TabNavigator}
            />
            <Stack.Screen
              name="movie_details"
              options={{
                title: '',
                headerTransparent: true,
                header: StackNavigatorHeader,
              }}
              component={MovieDetailsPage}
            />
            <Stack.Screen
              name="watch_page"
              options={{
                title: 'Watch Page',
                headerTintColor: '#eee',
                headerStyle: {backgroundColor: '#333'},
              }}
              component={WatchPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  tabBar: {
    height: 55,
    paddingVertical: 10,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#222',
  },
  headerTitle: {
    color: '#fff',
  },
  StackNavigatorHeader: {
    backgroundColor: '#ddd8',
    width: 45,
    height: 45,
    borderRadius: 45,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default App;
