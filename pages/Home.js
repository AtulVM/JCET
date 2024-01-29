// Home.js
import React from 'react';
import { View, Button } from 'react-native';
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to TodoList"
        onPress={() => navigation.navigate('TodoList')}
      />
      <Button
        title="Logout"
        onPress={handleSignOut}
      />
    </View>
  );
};

export default Home;
