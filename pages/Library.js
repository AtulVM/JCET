import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Library = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>DOCUMENTS</Text>
      <TouchableOpacity style={styles.fileInput}>
        <Text style={styles.fileInputText}>Select Files</Text>
      </TouchableOpacity>
      <View id="previewContainer"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    right: 10,
  },
  backButtonText: {
    color: '#f2f2f2',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    margin: 0,
  },
  fileInput: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  fileInputText: {
    color: '#000000',
  },
});

export default Library;
