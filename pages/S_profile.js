import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const S_Profile = () => {
  const navigation = useNavigation();
  const [teacherId, setTeacherId] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  // Function to handle the submission of the teacher ID
  const handleTeacherIdSubmit = () => {
    if (user) {
      // Path where the teacher ID is stored in the user's profile
      const teacherIdRef = ref(db, `users/${user.uid}/teacherId`);
      set(teacherIdRef, teacherId)
        .then(() => {
          console.log('Teacher ID saved successfully!');
          // Navigate to the announcements page or perform other actions
        })
        .catch((error) => {
          console.error('Error saving teacher ID:', error);
        });
    }
  };

  // Listen for changes in the authentication state
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in
      const teacherIdRef = ref(db, `users/${currentUser.uid}/teacherId`);
      // Retrieve the teacher ID if it's already set
      set(ref(db, teacherIdRef), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTeacherId(data);
        }
      });
    } else {
      // User is signed out
      // Handle user sign-out if necessary
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Teacher ID Input */}
      <View style={styles.container}>
        <Text style={styles.userIdText}>
          Enter TEACHER ID : 

        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setTeacherId}
          value={teacherId}
          placeholder="Type the teacher ID here"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleTeacherIdSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    padding: 10,
  },
  userIdText: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default S_Profile;
