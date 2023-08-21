import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './compnent/LoginScreen';
import HomeScreen from './HomeScreen';
import PostDetail from './compnent/PostDetailScreen'; // Import the new screen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
