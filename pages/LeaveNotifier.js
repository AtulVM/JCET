import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, getDoc, addDoc, collection, onSnapshot } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from '../FirebaseConfig'; 

const LeaveNotifier = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [status, setStatus] = useState('');

  const handleRequestSubmit = async () => {
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, 'leaveRequests'), {
        name: name,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        timestamp: Date.now(),
        status: 'pending',
      });
      setIsLoading(false);
      setRequestSent(true);
      onSnapshot(doc(FIREBASE_DB, 'leaveRequests', docRef.id), (doc) => {
        setStatus(doc.data().status);
      });
    } catch (error) {
      console.error('Error sending leave request:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Leave Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <Button title="Submit" onPress={handleRequestSubmit} />

      {isLoading && <ActivityIndicator size="small" />}
      {requestSent && <Text>Request sent. Current status: {status}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default LeaveNotifier;
