import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore"; 
import { FIREBASE_DB } from '../FirebaseConfig'; 

const L_Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'leaveRequests'), (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const handleRequestResponse = async (id, status) => {
    await updateDoc(doc(FIREBASE_DB, 'leaveRequests', id), {
      status: status,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.request}>
            <Text>{item.name}</Text>
            <Text>{item.startDate} - {item.endDate}</Text>
            <Button title="Accept" onPress={() => handleRequestResponse(item.id, 'accepted')} />
            <Button title="Reject" onPress={() => handleRequestResponse(item.id, 'rejected')} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  request: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default L_Requests;
