import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Clipboard } from 'react-native';
import { doc, getDoc } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from '../FirebaseConfig'; 

const FeePayment = ({ navigation }) => {
  const [role, setRole] = useState('');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const currentUserId = FIREBASE_AUTH.currentUser.uid;
    const fetchRole = async () => {
      const docRef = doc(FIREBASE_DB, 'userProfiles', currentUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      } else {
        Alert.alert('Error', 'User profile not found.');
      }
    };

    fetchRole();

    Alert.alert(
      'Google Pay Transaction',
      'Have you already made a transaction with the college on Google Pay?',
      [
        { text: 'Yes', onPress: () => {
          Alert.alert('Redirecting to Google Pay...');
          navigation.goBack();
        }},
        { text: 'No', onPress: () => {
          Alert.alert(
            'Bank Details',
            'Please use the following bank details for the transaction:',
            [
              { text: 'Copy Account Number', onPress: () => handleCopyAccountDetails('123456789012') },
              { text: 'Copy IFSC Code', onPress: () => handleCopyAccountDetails('COPA0001234') },
              { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
          );
        }},
      ],
      { cancelable: false }
    );
  }, []);

  const handleCopyAccountDetails = (details) => {
    Clipboard.setString(details);
    Alert.alert('Copied!', `The ${details.includes('123456789012') ? 'Account Number' : 'IFSC Code'} has been copied to your clipboard.`);
  };

  const handlePayment = () => {
    console.log('Verifying UPI ID...');
    const endTime = Date.now() + 300000; // 5 minutes from now
    const id = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(id);
        setCountdown('00:00');
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);
    setTimerId(id);
  };

  const handleStopPayment = () => {
    clearInterval(timerId);
    setCountdown(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JAWAHARLAL COLLEGE OF ENGINEERING & TECHNOLOGY</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUpiId}
        value={upiId}
        placeholder="Enter your UPI ID"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholder="Enter the amount to be paid"
        keyboardType="numeric"
      />
      <Button title="Pay" onPress={handlePayment} />
      {countdown && (
        <View>
          <Text>Payment request has been sent to the user.</Text>
          <Text>{countdown}</Text>
          <Button title="Stop Payment" onPress={handleStopPayment} />
        </View>
      )}
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
});

export default FeePayment;
