import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from '../FirebaseConfig'; 

const S_Profile = () => {
  const [teacherId, setTeacherId] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');

  useEffect(() => {
    const fetchTeacherEmail = async () => {
      // Get the current user's ID
      const currentUserId = FIREBASE_AUTH.currentUser.uid;

      // Fetch the current user's Firestore document
      const currentUserDocRef = doc(FIREBASE_DB, 'userProfiles', currentUserId);
      const docSnap = await getDoc(currentUserDocRef);

      if (docSnap.exists() && docSnap.data()['teacher-mail']) {
        setTeacherEmail(docSnap.data()['teacher-mail']);
      }
    };

    fetchTeacherEmail();
  }, []);

  const handleFetchEmail = async () => {
    try {
      const docRef = doc(FIREBASE_DB, 'userProfiles', teacherId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const email = docSnap.data().email;
        setTeacherEmail(email);

        // Save the email to the current user's Firestore document
        const currentUserId = FIREBASE_AUTH.currentUser.uid;
        const currentUserDocRef = doc(FIREBASE_DB, 'userProfiles', currentUserId);
        await setDoc(currentUserDocRef, { 'teacher-mail': email }, { merge: true });
        console.log('Teacher email saved successfully');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching and saving teacher email:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!teacherEmail && (
        <>
          <Text style={styles.title}>Enter Teacher ID</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTeacherId}
            value={teacherId}
            placeholder="Enter Teacher ID"
          />
          <Button title="Fetch Email" onPress={handleFetchEmail} />
        </>
      )}
      {teacherEmail && <Text style={styles.email}>Teacher's Email: {teacherEmail}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    padding: 10,
  },
  email: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default S_Profile;
