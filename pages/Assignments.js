import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { doc, getDoc, addDoc, collection, onSnapshot, query, where } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from '../FirebaseConfig'; 

const Assignments = () => {
  const [role, setRole] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [text, setText] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Get the current user's ID
    const currentUserId = FIREBASE_AUTH.currentUser.uid;

    // Fetch the current user's Firestore document
    const fetchRoleAndTeacherEmail = async () => {
      const docRef = doc(FIREBASE_DB, 'userProfiles', currentUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
        setTeacherEmail(docSnap.data()['teacher-mail']);
      }
    };

    fetchRoleAndTeacherEmail();

    // Listen for new assignments and questions
    const unsubscribeAssignments = onSnapshot(collection(FIREBASE_DB, 'assignments'), (snapshot) => {
      setAssignments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeQuestions = onSnapshot(query(collection(FIREBASE_DB, 'questions'), where('senderEmail', '==', teacherEmail)), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAssignments();
      unsubscribeQuestions();
    };
  }, [teacherEmail]);

  const handleSendText = async () => {
    try {
      if (role === 'Student') {
        await addDoc(collection(FIREBASE_DB, 'assignments'), {
          text: text,
          senderEmail: FIREBASE_AUTH.currentUser.email,
          timestamp: Date.now(),
        });
      } else if (role === 'Teacher') {
        await addDoc(collection(FIREBASE_DB, 'questions'), {
          text: text,
          senderEmail: FIREBASE_AUTH.currentUser.email,
          timestamp: Date.now(),
        });
      }
      setText('');
    } catch (error) {
      console.error('Error sending text:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.messages}>
        {role === 'Student' && questions.map((question, index) => (
          <Text key={index}>{question.text}</Text>
        ))}
        {role === 'Teacher' && assignments.map((assignment, index) => (
          <Text key={index}>{assignment.text}</Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={role === 'Student' ? "Enter your assignment" : "Enter your question"}
        />
        <Button title="Send" onPress={handleSendText} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
});

export default Assignments;
