

import React from 'react';
import {
 View, Text, StyleSheet
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './Screen/Home';
import Info from './Screen/Info';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name = 'Home' component = {Home}/>
     <Stack.Screen name = 'Info' component = {Info}/>
     </Stack.Navigator>    
   </NavigationContainer>   
  );
};



export default App;
