// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './pages/To_do_list';
import Login from './pages/Login';
import Home from './pages/Home'; 
import CalendarPage from './pages/Calendar';
import FeePayment from './pages/FeePayment';
import Details from './pages/Details';
import Announcements from './pages/Announcements'; 
import LeaveNotifier from './pages/LeaveNotifier'; 
import Library from './pages/Library'; 
import Assignments from './pages/Assignments'; 
import S_Profile from './pages/S_profile';
import RoleSelection from './pages/RoleSelection';
import TeacherHome from './pages/TeacherHome';
import T_Profile from './pages/T_Profile';
import L_Requests from './pages/L_Requests';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TeacherHome" component={TeacherHome}/>
        <Stack.Screen name="Announcements" component={Announcements} />
        <Stack.Screen name="LeaveNotifier" component={LeaveNotifier} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Assignments" component={Assignments} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="CalendarPage" component={CalendarPage} />
        <Stack.Screen name="FeePayment" component={FeePayment} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="S_profile" component={S_Profile} />
        <Stack.Screen name="RoleSelection" component={RoleSelection}/>
        <Stack.Screen name="T_Profile" component={T_Profile}/>
        <Stack.Screen name="L_Requests" component={L_Requests}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
