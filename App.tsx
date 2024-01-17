import { StatusBar, StyleSheet,  View } from 'react-native';
import MGettingStarted from './components/MGettingStarted';
import MMainPage from './components/MMainPage';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MLogin from './components/MLogin';

const Stack = createNativeStackNavigator();


export default function App() {
  const [savedValue, setSavedValue] = useState('');
  const handleOnSaveUrl = (savedValue) => {
    setSavedValue(savedValue);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="MLogin"
          component={MLogin}
        />
        <Stack.Screen
          name="MGettingStarted"
          component={MGettingStarted}
        />
        <Stack.Screen
          name="MMainPage"
          component={MMainPage}
          initialParams={ {savedValue} }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
  },
  statusBar: {
    backgroundColor: '#5DB075',
  }
});
