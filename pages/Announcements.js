import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const Announcements = ({ teacherId }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const announcementsRef = ref(db, 'announcements');
    onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val();
      // Filter announcements by teacher ID
      const filteredAnnouncements = Object.values(data).filter(announcement => announcement.teacherId === teacherId);
      setAnnouncements(filteredAnnouncements);
    });
  }, [teacherId]);

  return (
    <ScrollView style={styles.container}>
      {announcements.map((announcement, index) => (
        <View key={index} style={styles.announcementContainer}>
          <Text style={styles.announcementText}>{announcement.text}</Text>
          {/* Display PDF if available */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  announcementContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  announcementText: {
    fontSize: 16,
  },
});

export default Announcements;
