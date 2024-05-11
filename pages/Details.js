// Details.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Details = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>JCET Companion</Text>
      </View>
      <Text style={styles.text}>JCET Companion is a comprehensive solution to the challenges of college life, offering a unified platform that:</Text>
      <Text style={styles.header}>Simplifies daily tasks:</Text>
      <Text style={styles.text}>JCET Companion consolidates various functions into a single, intuitive application, including event calendar, study material, Time-Table, announcements, attendance tracking, homework management, to-do lists, fee handling, and leave request management.</Text>
      <Text style={styles.header}>Streamlining:</Text>
      <Text style={styles.text}>JCET Companion provides a central platform for students to access all the information and resources they need.</Text>
      <Text style={styles.header}>Promotes efficiency and engagement:</Text>
      <Text style={styles.text}>JCET Companion helps students to stay organized and on top of their tasks, while also ensuring that everyone within the institution is consistently up to date. This leads to improved efficiency, productivity, and overall engagement.</Text>
      <Text style={styles.text}>JCET Companion is the combined effort of four students Ajith A, Aswin A R, Atul v & Kishor P K</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginBottom: 20,
      
    },
    backButton: {
      marginRight: 10,
      color: '#3a58c2',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingTop: 30,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    text: {
      fontSize: 16,
      marginTop: 10,
    },
  });
  
export default Details;
