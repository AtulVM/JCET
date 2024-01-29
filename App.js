
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './pages/To_do_list';
import Login from './pages/Login';
import Home from './pages/Home'; // Import the Home component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home} // Use the imported Home component
          options={{ title: 'JCET COMPANION' }}
        />
        <Stack.Screen name="TodoList" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
