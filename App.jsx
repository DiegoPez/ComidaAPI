import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SKAKDKSAMKLODNALNSDLKNASLKDN
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// SKAKDKSAMKLODNALNSDLKNASLKDN
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container : {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  }, 
  text : {
    color: 'white'
  },
  image : {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  gift : {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

//AKSNDKJNASKJDBKHASBDHKJ

// AAAA