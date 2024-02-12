// Calendar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.']
};

LocaleConfig.defaultLocale = 'fr';

const CalendarPage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (markedDates[day.dateString]) {
      Alert.alert('Event', markedDates[day.dateString].note);
    }
  };

  const handleAddEvent = () => {
    if (selectedDate && eventText) {
      ssetMarkedDates({
  ...markedDates,
  [selectedDate]: { selected: true, marked: true, note: eventText },
});
      setEventText('');
    }
  };

  const handleDeleteEvent = () => {
    if (selectedDate && markedDates[selectedDate]) {
      const {[selectedDate]: value, ...remainingMarkedDates} = markedDates;
      setMarkedDates(remainingMarkedDates);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Calendar</Text>
      </View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      {selectedDate && (
        <View>
          <TextInput
            style={styles.input}
            value={eventText}
            onChangeText={setEventText}
            placeholder="Add an event"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
            <Text style={styles.buttonText}>Add Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeleteEvent}>
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default CalendarPage;
