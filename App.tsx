import { StatusBar, StyleSheet,  View } from 'react-native';
import MGettingStarted from './components/MGettingStarted';
import { useState } from 'react';
import MMainPage from './components/MMainPage';

export default function App() {
  const [savedValue, setSavedValue] = useState('');
  const onSave = (savedValue) => {
    setSavedValue(savedValue);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {savedValue == "" ? (
        <MGettingStarted onSave={onSave} />
        ) : (
          <MMainPage googleSheetUrl={savedValue} onSave={onSave}/>
      )}
    </View>
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
