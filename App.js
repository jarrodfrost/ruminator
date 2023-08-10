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
import { Audio } from 'expo-av';

function Menu({ navigation }){
  return (
  	<View style={styles.container}>
    	<Text style={[styles.text, {fontSize: 30,}]}>Ruminator</Text>
    	
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("About");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>About</Text>
      </TouchableHighlight>
      
      
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("Settings");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>Settings</Text>
      </TouchableHighlight>
      
      
      <TouchableHighlight
      	onPress={ () => {
      		navigation.navigate("Help");
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
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

function About({ navigation }){
  return (
  	<View style={styles.container}>
    	<Text style={styles.text}>Graduated Sensory Salience (GSS) Intervention V.2.0{"\n\n"}</Text>
    	<Text style={styles.text}>Created by Jarrod Frost, 2023. Original version By Greg Siegle, 2015.{"\n\n"}</Text>
    	<Text style={styles.text}>Based on the Psychomotor Vigilance Task:</Text>
    	<Text style={styles.text}>Dinges, D. I, & Powell, J. W. (1985). Microcomputer analysis of performance on a portable, simple visual RT task sustained operations. Behavioral Research Methods, Instrumentation, and Computers, 17, 652-655</Text>
      <TouchableHighlight
      	onPress={ () => {
      		navigation.popToTop();
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>Return</Text>
      </TouchableHighlight>
		</View>
  );
}

function Help({ navigation }){
  return (
  	<View style={styles.container}>
    	<Text style={[styles.text, {fontSize: 16}]}>
    		Directions for use
    		{'\n\n'}
    		You will see your rumination statements on the right side of the
				screen. Please read the rumination statements but remain ready
				to push the large grey button when you see the X’s. Up to 5 letters
				in a row will be changed to X's.
				The task involves learning to
				preserve your attention to the task
				in the face of your ruminations.
				{'\n\n'}
				When you see the letters change, click the large gray button as
				quickly as possible.
				You have slightly less than one second to
				click after the change happens. You will feel an electrical
				stimulation that is accompanied with the changing of letters.
				The computer will change the intensity of the stimulation
				according to your progress.
				You will have breaks every few minutes. A pop up message will
				notify you that a block has ended.
			</Text>
      <TouchableHighlight
      	onPress={ () => {
      		navigation.popToTop();
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>Return</Text>
      </TouchableHighlight>
		</View>
  );
}

function Settings({ navigation }){
	const [roundLength, setRoundLength] = useState(60*2);
	const [vibrate, setVibrate] = useState(false);
	const [xDuration, setXDuration] = useState(600);

	const storeData = async () => {
		try{
			await AsyncStorage.setItem('roundLength', JSON.stringify(roundLength));
			await AsyncStorage.setItem('vibrate', JSON.stringify(vibrate));
			await AsyncStorage.setItem('xDuration', JSON.stringify(xDuration));
			console.log("Successfully stored setting data");
		}catch(error) {
			console.log("Error saving setting data");
		}
	};
	
	const retrieveData = async () => {
  	try{
  		const rl = await AsyncStorage.getItem('roundLength');
  		if (rl !== null) {
    		setRoundLength(JSON.parse(rl));
  		}
  		const vibr = await AsyncStorage.getItem('vibrate');
  		if (vibr !== null) {
    		setVibrate(JSON.parse(vibr));
  		}
  		const xdur = await AsyncStorage.getItem('xDuration');
  		if (xdur !== null) {
    		setXDuration(JSON.parse(xdur));
  		}
  		console.log("Successfully retrieved setting data");
		}catch(error) {
  		console.log("Error retrieving setting data");
		}
	};
	
 	useEffect( () => {
		retrieveData();
  }, []);

  return (
  	<View style={styles.container}>
    	<Text style={styles.text}>Round Duration (seconds)</Text>
    	<TextInput 
      	value={roundLength.toString()}
      	onChangeText={rl => setRoundLength(isNaN(parseInt(rl)) ? 0 : parseInt(rl))}
    		placeholderTextColor="grey"
      	style={styles.settingsInput}
      	multiline={false}
      	inputMode="numeric"
      />
      
      <Text style={styles.text}>X Display Duration (milliseconds)</Text>
    	<TextInput 
      	value={xDuration.toString()}
      	onChangeText={xd => {					
      		const pxd = parseInt(xd);
      		if(isNaN(pxd)){
      			setXDuration(0);
      		}else if(pxd > 5000){ //The maximum value for x duration is 5 seconds (5000ms)
      			setXDuration(5000);
    			}else{
    				setXDuration(pxd);
    			}
      	}}
    		placeholderTextColor="grey"
      	style={styles.settingsInput}
      	multiline={false}
      	inputMode="numeric"
      />
    	
    	<Text style={styles.text}>Toggle Sound/Vibrate</Text>
    	
    	<TouchableHighlight
      	onPress={ () => {
      		setVibrate(v => !v);
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1, backgroundColor: (vibrate ? '#9CCC65' : '#4DD0E1')}]}
      >
      	<Text style={styles.button}>{vibrate ? 'Vibrate' : 'Sound'}</Text>
      </TouchableHighlight>
    	
      <TouchableHighlight
      	onPress={ () => {
      		storeData();
      		navigation.popToTop();
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>Save and Return</Text>
      </TouchableHighlight>
		</View>
  );
}

//Component to display wins, misses, strikes, accuracy
function StatsDisplay({wins, misses, strikes}){
	return(
		<View style={styles.container}>
			<View style={[styles.smallContainer, {flexDirection: 'row',}]}>
				<View style={[styles.counterbox, {backgroundColor: 'green'}]}>
					<Text style={styles.text}>Hits</Text>
					<Text style={styles.textBold}>{wins}</Text>
				</View>
				<View style={styles.counterbox}>
					<Text style={styles.text}>Misses</Text>
					<Text style={styles.textBold}>{misses}</Text>
				</View>
			</View>
			<View style={[styles.smallContainer, {flexDirection: 'row',}]}>
				<View style={[styles.counterbox, {backgroundColor: 'cyan'}]}>
					<Text style={styles.text}>Strikes</Text>
					<Text style={styles.textBold}>{strikes}</Text>
				</View>
			<View style={[styles.counterbox, {backgroundColor: 'yellow'}]}>
				<Text style={styles.text}>Accuracy</Text>
				<Text style={styles.textBold}>{Math.round(100*(wins/(wins+misses+strikes)))}%</Text>
			</View>
		</View>
	</View>
	);
}

function Break({ route, navigation }){
	const {text1, text2, text3, textIndex, winCount, missCount, strikeCount} = route.params;

  return (
  	<View style={styles.container}>
    	<Text style={[styles.textBoldBold, {textAlign: 'center'},]}>{'\n\n'}{textIndex >= 2 ? "You finished!" : "Take a break!"}</Text>
    	<StatsDisplay wins={winCount} misses={missCount} strikes={strikeCount}></StatsDisplay>
      <TouchableHighlight
      	onPress={ () => {
      		if(textIndex < 2){
      			navigation.goBack(); //Removes this screen and adds a new sentence display screen
      			navigation.navigate("Display Sentences", {
      				text1: text1, 
      				text2: text2, 
      				text3: text3,
      				textIndex: textIndex+1,
      				winCount: winCount,
      				missCount: missCount,
      				strikeCount: strikeCount,
      			});
      		}else{ //Return to the main screen after all 3 sentences have been displayed
      			navigation.popToTop();
      		}
      	}}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, {flex: 0.1}]}
      >
      	<Text style={styles.button}>{textIndex >= 2 ? "Return to Main" : "Next Sentence"}</Text>
      </TouchableHighlight>
		</View>
  );
}

function SentencesSeed({ navigation }){

	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [text3, setText3] = useState("");
	const [filled, setFilled] = useState(false);

	//Try to save/retrieve the current contents of the text boxes to async storage
	const storeData = async () => {
		try{
			await AsyncStorage.setItem('text1', text1);
			await AsyncStorage.setItem('text2', text2);
			await AsyncStorage.setItem('text3', text3);
			console.log("Successfully stored sentence data");
		}catch(error) {
			console.log("Error saving sentence data");
		}
	};
	
	
	const retrieveData = async () => {
  	try{
  		const t1 = await AsyncStorage.getItem('text1');
  		if (t1 !== null) {
    		setText1(t1);
  		}
  		const t2 = await AsyncStorage.getItem('text2');
  		if (t2 !== null) {
    		setText2(t2);
  		}
  		const t3 = await AsyncStorage.getItem('text3');
  		if (t3 !== null) {
    		setText3(t3);
  		}
  		console.log("Successfully retrieved sentence data");
		}catch(error) {
  		console.log("Error retrieving sentence data");
		}
	};
	
 	useEffect( () => {
		retrieveData();
  }, []);

  return (
  	<View style={styles.container}>
    	<Text
    		style={styles.text}
    	>
    		Enter your three sentences here, then press continue.
  		</Text>
      <TextInput 
      	value={text1}
      	onChangeText={text => setText1(text)}
      	placeholder="Enter your first sentence."
    		placeholderTextColor="grey"
      	style={styles.input}
      	multiline={true}
      />
      <TextInput 
      	value={text2}
      	onChangeText={text => setText2(text)}
      	placeholder="Enter your second sentence."
      	placeholderTextColor="grey"
      	style={styles.input}
      	multiline={true}
      />
      <TextInput 
      	value={text3}
      	onChangeText={text => setText3(text)}
      	placeholder="Enter your third sentence."
    		placeholderTextColor="grey"
      	style={styles.input}
      	multiline={true}
      />
      <TouchableHighlight
      	onPress={ () => {
      		storeData();
      		navigation.navigate("Display Sentences", {
      			text1, text2, text3, textIndex: 0, winCount: 0, missCount: 0, strikeCount: 0
      		});
      	}}
    		disabled={text1 == "" || text2 == "" || text3 == ""}
      	underlayColor="white"
      	activeOpacity={0.3}
      	style={[styles.outerButton, text1 == "" || text2 == "" || text3 == "" ? {opacity: 0.2} : {opacity: 1.0}]}
      >
      	<Text style={styles.button}>Continue</Text>
      </TouchableHighlight>
		</View>
  );
}

function SentencesDisplay({ route, navigation }){
	const {text1, text2, text3, textIndex, winCount, missCount, strikeCount} = route.params;
	const [counter, setCounter] = useState(5); //Counter always starts at 5 seconds for the first display
	const [xShown, setXShown] = useState(false); //represents whether the X's are currently shown (X's will appear when this is true)
	const [rounds, setRounds] = useState(0); //represents how many displays of the X's have passed
	const [wins, setWins] = useState(winCount); //represents how many "wins" there have been so far
	const [misses, setMisses] = useState(missCount); //represents how many times the player did not press the button on time
	const [strikes, setStrikes] = useState(strikeCount); //represents how many times the player pressed the button at the wrong time
	const [losses, setLosses] = useState(missCount+strikeCount); //represents how many times the player made any type of mistake.
	const [pressed, setPressed] = useState(false); //whether or not the button was pressed in the past second
	const [time, setTime] = useState(0); //the number of seconds that have passed. Used to determine when to take a break.
	const [vibrate, setVibrate] = useState(false); //Setting from async storage. Whether to vibrate or use sound upon a miss/strike.
	const [roundLength, setRoundLength] = useState(5); //Setting from async storage. The amount of time in seconds that the round will last.
	const [fSize, setFSize] = useState(36); //Current font size of the sentence, based on sentence length
	const [xSentence, setXSentence] = useState(""); //Stored version of the sentence with the X's in it, used to avoid generating again on each render
	const [xDuration, setXDuration] = useState(600); //Setting from async storage. The amount of time in milliseconds to display the X's.
	const [sound, setSound] = useState(); //Used to hold the sound object
	
	const X_TIME = 600; //time in milliseconds to display the X's. Do not set higher than 5000ms because that is the minimum time until the next X display, and this would cause bugs.
	const MAX_FSIZE = 36; //maximum font size for the sentence
	const MIN_FONT_SIZE = 12; //Minimum size of sentence font
	const FONT_SCALING_RATE = 0.07; //Rate at which the font size shrinks as the sentence becomes longer (font size point per character)

	const retrieveData = async () => {
  	try{
  		const rl = await AsyncStorage.getItem('roundLength');
  		if (rl !== null) {
    		setRoundLength(JSON.parse(rl));
  		}
  		const vibr = await AsyncStorage.getItem('vibrate');
  		if (vibr !== null) {
    		setVibrate(JSON.parse(vibr));
  		}
  		const xdur = await AsyncStorage.getItem('xDuration');
  		if (xdur !== null) {
    		setXDuration(JSON.parse(xdur));
  		}
  		console.log("Successfully retrieved setting data");
		}catch(error) {
  		console.log("Error retrieving setting data");
		}
	};
	
 	useEffect( () => {
		retrieveData();
		
		//Resize sentence to fit on screen. Font size will vary between min and max font sizes, as set above
		const fontScalingValue = Math.floor(selectText(textIndex).length*FONT_SCALING_RATE);
		setFSize(36-fontScalingValue > MIN_FONT_SIZE ? 36-fontScalingValue : MIN_FONT_SIZE); 
  }, []);

	const soundSrc = require('./assets/tenhz_250us.wav');
	
	//Old sound code, only works on Android/iOS
	/*
	const playSound = async () => {
		const soundObj = new Audio.Sound();
		try{
			await soundObj.loadAsync(soundSrc);
			await soundObj.playAsync().then(async playbackStatus => {
				setTimeout(() => {
					soundObj.unloadAsync()
				}, playbackStatus.playableDurationMillis)
			}).catch(error => {
				console.log(error)
			})
		} catch (error){
			console.log(error);
		}
	}
	*/
	
	//Function to play sound
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/tenhz_250us.wav'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

	//Unloads sound upon completion
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
	
	const vibrateOrSound = () => {
		if(vibrate){
				Vibration.vibrate(300);
			}else{
				playSound();
			}
	}

	const handleButtonPress = () => {
		if(xShown){
				setWins(win => win+1);
				setPressed(true);
				setXShown(false);
		}else{
			setLosses(loss => loss+1);
			setStrikes(strike => strike+1);
			vibrateOrSound();
		}
	};

	//Function to randomly replace n characters in a string with a different character (currently unused function)
	//Source: https://stackoverflow.com/questions/69262504/replace-random-characters-in-string
	const replacer = (str, i, rep) => {
  	if (!str) return;                      // Do nothing if no string passed
  	const arr = [...str];                  // Convert String to Array
  	const len = arr.length
  	i = Math.min(Math.abs(i), len);        // Fix to Positive and not > len 
  	while (i) {
    	const r = ~~(Math.random() * len);
    	if (Array.isArray(arr[r])) continue; // Skip if is array (not a character)
    	arr[r] = [rep];                      // Insert an Array with the rep char
    	--i;
  	}
  	return arr.flat().join("");
	};
	
	//Function to place a row of i X's in a string at a random point
	const addXToString = (str, i) => {
		if(!str) return;
		const arr = [...str];
		const len = arr.length;
		const start = ~~(Math.random() * (len-i));
		
		var j = 0; //number of X's left to add
		var l = 0; //current index in string
		while(j < i && l < len){
			if(arr[start+l] != ' '){
				arr[start+l] = 'X';
				j += 1;
			}
			l += 1;
		}
		return arr.flat().join("");
	}
	
	//Counter is always reset to an integer between 5 and 15 inclusive
	const decrementCounter = () => {
		setCounter(count => count > 0 ? count-1 : Math.floor(Math.random() * 11) + 5);
	};
	
	const incrementTimer = () => {
		setTime(t => t+1);
	}
	
	//Returns the correct sentence according to the provided index value (0, 1, or 2)
	const selectText = (index) => {
		if(index % 3 == 0){
			return text1;
		}else if(index % 3 == 1){
			return text2;
		}else if(index % 3 == 2){
			return text3;
		}
	}

	//One second timer interval
  useEffect( () => {
  	const interval = setInterval(() => {
  		decrementCounter();
  		incrementTimer();
  		setPressed(false);
		}, 1000);
  	return () => {
  		clearInterval(interval);
  	};
  }, []);
  
  //Show/Unshow the X's when the counter reaches zero
  useEffect ( () => { //Show the X's for some time, then turn them off again
		if(counter == 0){
  		setXShown(true);
  		setRounds(round => round+1);
  		setXSentence(addXToString(selectText(textIndex), 5));
  		
  		const timeout = setTimeout(() => {
				setXShown(false);
			}, xDuration);
  	}
  }, [counter]);
  
  useEffect( () => { //Go to the "take a break" screen after five minutes
  	if(time >= roundLength){
  		navigation.goBack();
  		navigation.navigate("Break", {text1, text2, text3, textIndex, winCount: wins, missCount: misses, strikeCount: strikes});
  	}
  }, [time]);
  
  //Add a Loss if the button is not pressed by the time the X's go away
  useEffect( () => { 
  	if(!xShown && !pressed && time !== 0){
  		setLosses(loss => loss+1);
  		setMisses(miss => miss+1); 
  		vibrateOrSound();
  	}
  }, [xShown]);
  
  //Used to determine which monospace font to use for the sentence text, depending on what OS this is running on 
  const monospaceFont = (Platform.OS === 'ios' ? 'Courier New' : 'monospace');
  
	return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Text 
					style={[ styles.textBoldBold, {textAlign: 'center', fontFamily: monospaceFont, fontSize: fSize} ]}>
						{xShown && !pressed ? xSentence : selectText(textIndex)}
					</Text>
				</View>

				<StatsDisplay wins={wins} misses={misses} strikes={strikes}/>
				
				<View style={[styles.container, {flex: 0.15}]}>
					<Text style={[styles.text, {textAlign: 'center'},]}>Seconds remaining in round: {roundLength-time}</Text>
				</View>
				
				<TouchableHighlight
      		onPress={handleButtonPress}
      		underlayColor="white"
      		activeOpacity={0.3}
      		style={[styles.outerButton, pressed ? {opacity: 0.2} : {opacity: 1.0}]}
      		disabled={pressed}
      	>
      		<Text style={styles.button}>Press When X's Appear!</Text>
      	</TouchableHighlight>
			</View>
	);
}

//DONE Use monospace for sentence display
//DONE Add better about screen
//DONE Add help screen
//DONE Show stats on break screen
//DONE Add preference screen with two options: 1) Round time 2) Vibration vs Sound
//DONE Add sound on miss (100hz buzz)
//DONE Add X time setting
//DONE Fix sound for web browsers
//TODO Deploy app

const Stack = createNativeStackNavigator();

export default function App() {
	return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Menu" component={Menu}/>
				<Stack.Screen name="Help" component={Help}/>
				<Stack.Screen name="About" component={About}/>
				<Stack.Screen name="Settings" component={Settings}/>
				<Stack.Screen name="Add Sentences" component={SentencesSeed}/>
				<Stack.Screen name="Display Sentences" component={SentencesDisplay}/>
				<Stack.Screen name="Break" component={Break}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
	},
  container: {
    flex: 1.0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  smallContainer: {
  	flex: 0.3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  counterbox: {
  	flex: 0.3,
  	backgroundColor: 'red',
  	alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    flex: 0.5,
  },
  settingsInput: {
  	margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    flex: 0.1,
  },
  text: {
  	fontSize: 20,
  	textAlign: 'center',
  },
  textBold: {
  	fontSize: 24,
  	textAlign: 'justify',
  	fontWeight: 'bold',
  },
  textBoldBold: {
  	fontSize: 36,
  	textAlign: 'justify',
  	fontWeight: 'bold',
  },
  button: {
  	fontSize: 25,
  	textAlign: 'center',
  	display: 'flex',
  	justifyContent: 'center',
  },
  outerButton: {
  	display: 'flex',
  	flex: 0.4,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: 'lightgrey',
  	borderRadius: 10,
  	padding: 10,
  	borderWidth: 1,
  	margin: 10,
  },
});


