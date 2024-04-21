import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const LeaveNotifier = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestSubmit = async () => {
    // Simulate an API call or any other asynchronous operation
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay

    // After 1 second, mark the request as sent
    setIsLoading(false);
    setRequestSent(true);
  };

  return (
    <View>
      <Text>Leave Request</Text>
      <TextInput
        placeholder="Start Date"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />
      <TextInput
        placeholder="End Date"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />
      <Button title="Submit" onPress={handleRequestSubmit} />

      {isLoading && <ActivityIndicator size="small" />}
      {requestSent && <Text>Request sent</Text>}
    </View>
  );
};

export default LeaveNotifier;
