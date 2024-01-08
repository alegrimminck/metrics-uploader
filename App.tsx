import { StatusBar, StyleSheet,  View } from 'react-native';
import GettingStarted from './components/MGettingStarted';

export default function App() {
  console.log( StatusBar.currentHeight);
  return (
    <View style={styles.container}>
      <StatusBar />
      <GettingStarted></GettingStarted>
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
