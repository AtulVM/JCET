import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './pages/To_do_list';

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
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const buttonsData = [
    { title: 'Todo List', screen: 'TodoList' },
    { title: 'Notifications', screen: 'Notifications' },
    { title: 'Fee Payment', screen: 'FeePayment' },
    { title: 'Event Calendar', screen: 'EventCalendar' },
    { title: 'Leave Notifier', screen: 'LeaveNotifier' },
    { title: 'Assignments', screen: 'Assignments' },
    { title: 'About', screen: 'About' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module Selection</Text>
      <View style={styles.buttonGrid}>
        {buttonsData.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigateToScreen(button.screen)}
          >
            <Text>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonGrid: {
    alignItems: 'center', // Center the buttons horizontally
  },
  button: {
    padding: 15,
    marginVertical: 10, // Adjust the vertical gap between buttons
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default App;
