import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Started from './src/screens/Started';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ProductDetail from './src/screens/ProductDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orders from './src/screens/Orders';
import Blog from './src/screens/Blog';
import Profile from './src/screens/Profile';
import ShowProduct from './src/screens/ShowProduct';
import Rewards from './src/screens/Rewards';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Started">
        <Stack.Screen 
          name="Started" 
          component={Started} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignIn}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetail}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="Orders" 
          component={Orders}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="Blog" 
          component={Blog}
          options={{headerShown: true}}
        />
          <Stack.Screen 
          name="Rewards" 
          component={Rewards}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{headerShown: true}}
        />
        <Stack.Screen 
          name="ShowProduct" 
          component={ShowProduct}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;