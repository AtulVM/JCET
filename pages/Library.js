import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Library = () => {
  const handleOpenLibrary = () => {
    Linking.openURL('https://atulvm.github.io/libraryjcet.github.io/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.fileInput} onPress={handleOpenLibrary}>
          <Text style={styles.fileInputText}>Open Library</Text>
        </TouchableOpacity>
      </View>
      <View id="previewContainer"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingTop: 40,
  },
  backButtonText: {
    color: '#0000ff',
  },
  fileInput: {
    marginBottom: 10,
    backgroundColor: '##3a58c2',
    padding: 10,
    alignSelf: 'center',
  },
  fileInputText: {
    color: '#000000',
  },
});

export default Library;
