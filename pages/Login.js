// Login.js
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { CommonActions } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation(); // Get the navigation object

  const signIn = async () => {
    setLoading(true);
    try{
        
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        ); // Navigate to Home after successful login
    }   catch(error){
        console.log(error);
        alert('Sign in failed: ' + error.message)
    }   finally {
        setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert('Check Your Emails!');
    }   catch(error){
        console.log(error);
        alert('Sign in failed: ' + error.message)
    }   finally {
        setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior='padding'>
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
      { loading ? <ActivityIndicator size="large" color="00f" />
      : <>
      < Button title='Login' onPress={() => signIn()} />
      < Button title='Create Account' onPress={() => signUp()} />
      </>
      }
      </KeyboardAvoidingView>
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
    width: 200, // Set a width to avoid overflow
  },
});

export default Login;
