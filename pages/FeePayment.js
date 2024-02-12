// FeePayment.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';

const FeePayment = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [isPinEntryVisible, setIsPinEntryVisible] = useState(false);
  const [pin, setPin] = useState('');

  const handleConfirmPayment = () => {
    setIsPinEntryVisible(true);
  };

  const handlePinSubmit = () => {
    if (pin === '1234') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsPaymentCompleted(true);
        setIsPinEntryVisible(false);
      }, 2000); // Simulate a delay for the payment process
    } else {
      Alert.alert('Error', 'Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fee Payment</Text>
      </View>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <Text style={styles.text}>Payment Method: UPI</Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirmPayment} disabled={isLoading}>
        <Text style={styles.buttonText}>Confirm Payment</Text>
      </TouchableOpacity>
      {isPinEntryVisible && (
        <View>
          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={setPin}
            placeholder="Enter PIN"
            keyboardType="numeric"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
            <Text style={styles.buttonText}>Submit PIN</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isPaymentCompleted ? (
        <Text style={styles.success}>✔ Payment Completed</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    color: '#3a58c2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default FeePayment;
