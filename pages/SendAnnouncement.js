import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { getDatabase, ref, push } from "firebase/database";

const SendAnnouncement = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleSelectPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedPDF(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    }
  };

  const handleSendAnnouncement = () => {
    const db = getDatabase();
    const announcementRef = ref(db, 'announcements');
    const newAnnouncementRef = push(announcementRef);
    set(newAnnouncementRef, {
      text: announcementText,
      pdf: selectedPDF ? selectedPDF.uri : null,
      // Include teacher's ID and any other relevant info
    });
    // Reset state
    setAnnouncementText('');
    setSelectedPDF(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAnnouncementText}
        value={announcementText}
        placeholder="Type your announcement here"
      />
      <TouchableOpacity style={styles.button} onPress={handleSelectPDF}>
        <Text style={styles.buttonText}>Select PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSendAnnouncement}>
        <Text style={styles.buttonText}>Send Announcement</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3a58c2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SendAnnouncement;
