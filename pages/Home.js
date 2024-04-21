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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>JCET COMPANION</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <Text style={styles.aboutButton}>About</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Announcements')}>
        <Text style={styles.buttonText}>Announcements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LeaveNotifier')}>
        <Text style={styles.buttonText}>Leave Notifier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
        <Text style={styles.buttonText}>Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Assignments')}>
        <Text style={styles.buttonText}>Assignments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeePayment')}>
        <Text style={styles.buttonText}>Fee Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar')}>
        <Text style={styles.buttonText}>Calendar</Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Add this line
    paddingHorizontal: 10, // Add this line
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutButton: {
    color: '#3a58c2',
  },
  button: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
