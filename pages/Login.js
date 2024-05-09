// Login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase Auth reference
import { useNavigation } from '@react-navigation/native'; 
import { CommonActions } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation(); // Get the navigation object

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
  
      // Fetch the user's role from Firestore after successful sign-in
      const userDocRef = doc(FIREBASE_DB, 'userProfiles', response.user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // Check the user's role and navigate to the corresponding component
        if (userData.role === 'Teacher') {
          navigation.navigate('TeacherHome');
        } else if (userData.role === 'Student') {
          navigation.navigate('Home');
        } else {
          // Handle case where role is not set or is set to something else
          console.error('No valid role found for user');
          // Optionally navigate to RoleSelection or show an error
        }
      } else {
        console.error('No user profile found in Firestore');
        // Handle case where user profile does not exist
      }
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      setRegistered(true); // Set registered to true upon successful registration
      setTimeout(() => {
        navigation.navigate('RoleSelection');
      }, 2000); // Navigate to RoleSelection after 2 seconds
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? (
        registered ? (
          // Display a tick mark when registered is true
          <Icon name="check" size={24} color="green" />
        ) : (
          // Display the activity indicator while loading
          <ActivityIndicator size="large" color="#3a58c2" />
        )
      ) : (
        // Display buttons when not loading
        <>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    width: '50%', // Adjusted to full width
  },
  button: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '50%', // Adjusted to full width
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
