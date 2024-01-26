import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './Styles';
import TodoList from './pages/Todolist';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'JCET COMPANION' }}
        />
        <Stack.Screen name="TodoList" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Module Selection</Text>
      <Button
        title="Todo List"
        onPress={() => navigation.navigate('TodoList')}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
