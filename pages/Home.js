// Home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth"; // Import signOut
import { FIREBASE_AUTH } from '../FirebaseConfig'; // Import FIREBASE_AUTH

const Home = ({ navigation }) => {
  const auth = FIREBASE_AUTH;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TodoList')}>
        <Text style={styles.buttonText}>TodoList</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10, // Add some vertical margin
    width: 200, // Set a width for the buttons
    alignItems: 'center', // Center the text
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
