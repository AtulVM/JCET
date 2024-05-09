import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";

const T_Profile = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const copyToClipboard = () => {
    Clipboard.setString(user ? user.uid : '');
    alert('User ID copied to clipboard!');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt; Back</Text>
        </TouchableOpacity>
      </View>

      {/* User ID Display */}
      <View style={styles.container}>
        <Text style={styles.userIdText}>
          TEACHER ID : "{user ? user.uid : 'N/A'}"
        </Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>

      {/* Rest of your component's content */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  backButton: {
    fontSize: 18,
    color: '#0000ff',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Align items in a row
    padding: 10,
  },
  userIdText: {
    fontSize: 16,
    marginRight: 10, // Add space between the text and the button
  },
  copyButton: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
  },
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default T_Profile;