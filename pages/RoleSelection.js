import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, setDoc } from "firebase/firestore"; 
import { FIREBASE_DB } from '../FirebaseConfig'; 
import { FIREBASE_AUTH } from '../FirebaseConfig'; 
const RoleSelection = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const handleRoleSelection = async (role) => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }
    try {
      const userDocRef = doc(FIREBASE_DB, 'userProfiles', auth.currentUser.uid);     
      await setDoc(userDocRef, { role: role }, { merge: true });
      console.log('Role saved successfully');
      if (role === 'Teacher') {
        navigation.navigate('TeacherHome'); 
      } else if (role === 'Student') {
        navigation.navigate('Home'); 
      }
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a Student or a Teacher?</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Student')}>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Teacher')}>
        <Text style={styles.buttonText}>Teacher</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3a58c2',
    padding: 15,
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

export default RoleSelection;
