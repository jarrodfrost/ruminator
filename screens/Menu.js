import { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	ScrollView,
	TextInput, 
	TouchableHighlight,
	Alert,
	Vibration,
	useWindowDimensions,
	Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu({ navigation }){
  return (
  	<View style={styles.container}>
    	<Text style={[styles.text, {fontSize: 30,}]}>Ruminator</Text> 
    	
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("About");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1, backgroundColor: '#aaa'}]}
      >
      	<Text style={styles.button}>About</Text>
      </TouchableHighlight>
      
      
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("Settings");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1, backgroundColor: '#aaa'}]}
      >
      	<Text style={styles.button}>Settings</Text>
      </TouchableHighlight>
      
      
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("Help");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1, backgroundColor: '#aaa'}]}
      >
      	<Text style={styles.button}>Help</Text>
    	</TouchableHighlight>
    	
    	
    	<TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("Add Sentences");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.3}]}
      >
      	<Text style={styles.button}>Begin</Text>
      </TouchableHighlight>
		</View>
  );
}
