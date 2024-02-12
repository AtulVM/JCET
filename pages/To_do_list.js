// TodoList.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TodoList = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim().length > 0) {
      setTodos([...todos, { text: todoText, checked: false }]);
      setTodoText('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  };

  const renderTodoItem = ({ item, index }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleTodo(index)} style={styles.todoTextContainer}>
        <Text style={[styles.todoText, item.checked && styles.checkedTodoText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTodo(index)}
        style={styles.deleteButtonContainer}
      >
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <View style={styles.todoListContainer}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderTodoItem}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.todoInput}
          placeholder="Add a new todo"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  backButton: {
    marginRight: 10,
    color: '#3a58c2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  todoListContainer: {
    flex: 3,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  todoInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#3a58c2',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  todoTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  todoText: {
    textDecorationLine: 'none',
  },
  checkedTodoText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButtonContainer: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default TodoList;
