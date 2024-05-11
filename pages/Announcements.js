import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { doc, getDoc, addDoc, collection, onSnapshot, query, where } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from '../FirebaseConfig'; 

const Announcements = () => {
  const [role, setRole] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

    // Listen for new messages
    const unsubscribe = onSnapshot(query(collection(FIREBASE_DB, 'announcements'), where('senderEmail', '==', teacherEmail)), (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return unsubscribe;
  }, [teacherEmail]);

  const handleSendMessage = async () => {
    try {
      await addDoc(collection(FIREBASE_DB, 'announcements'), {
        message: message,
        senderEmail: FIREBASE_AUTH.currentUser.email,
        timestamp: Date.now(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.map((msg, index) => (
          <Text key={index}>{msg.message}</Text>
        ))}
      </ScrollView>
      {role === 'Teacher' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
          />
          <Button title="Send Message" onPress={handleSendMessage} />
        </View>
      )}
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

export default Announcements;
