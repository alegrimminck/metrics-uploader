import { StatusBar, StyleSheet,  View } from 'react-native';
import MMainPage from './components/MMainPage';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MLogin from './components/MLogin';

const Stack = createNativeStackNavigator();


export default function App() {
  const [savedValue, setSavedValue] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen
        name="MMainPage"
        component={MMainPage}
        initialParams={ {savedValue} }
      />
      <Stack.Screen
          name="MLogin"
          component={MLogin}
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
