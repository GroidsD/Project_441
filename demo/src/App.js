import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import DetailContactScreen from './src/screens/DetailContactScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import DetailContactFavorite from './src/screens/DetailContactFavorite';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

interface Route {
  key: string;
  icon: string;
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="DetailContactScreen" component={DetailContactScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    <Stack.Screen name="DetailContactFavorite" component={DetailContactFavorite} />
  </Stack.Navigator>
);

export default App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'Home', icon: 'home' },
    { key: 'Favorites', icon: 'star' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeStack,
    Favorites: FavoritesStack,
  });

  const renderIcon = ({ route, focused, color }: { route: Route; focused: boolean; color: string }) => {
    return <Icon name={route.icon} size={30} color={color} />;
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            renderIcon={renderIcon}
            barStyle={{ backgroundColor: 'blue' }} 
          />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};