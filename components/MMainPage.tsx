import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import MTextInput from './MTextInput';
import colors from '../constants/colors';
import MButton from './MButton';
import moment from 'moment';

const MMainPage = ({navigation,route}) => {
  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [today, setToday] = useState(moment());
  const [savedToday, setSavedToday] = useState(moment());


  const handleGoBack = () => {
    return navigation.navigate('MGettingStarted', { item: inputValue })
  }

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsButtonDisabled(text.length === 0);
  };

  const handleSaveValuesPress = () => {
    setSavedValue(inputValue);
    setSavedToday(today);
    setInputValue('');
    setIsButtonDisabled(true);
  };

  const handleMinusOneDay = () => {
    const yesterday = moment(today).subtract(1, 'days')
    setToday(yesterday)
  }

  const handlePlusOneDay = () => {
    const tomorrow = moment(today).add(1, 'days')
    setToday(tomorrow)
  }
  


  return (
    <View style={styles.container}>
      <MButton type="secondary" text="<-" onPress={handleGoBack}/>
      <Text style={styles.title}>Metrics Uploader</Text>
      <Text style={styles.subtitle}>Save your values</Text>

      <View style={styles.todaySection}>
        <Text style={styles.description}>Today is: {today.format("DD/MM/YYYY")}</Text>
        <View style={styles.buttonRow}>
          <Button title="-1 day" onPress={() => handleMinusOneDay()} />
          <View style={styles.spacer}></View>
          <Button title="+1 day" onPress={() => handlePlusOneDay()} />
        </View>
      </View>
      
      
      <MTextInput onChangeText={handleInputChange} placeholder="value to upload"/>
      <MButton type="primary" text="Save" onPress={handleSaveValuesPress} disabled={isButtonDisabled}/>

      <View style={styles.information}>
        <Text style={styles.description}>Google sheet url: {route.params.item}</Text>
        <Text style={styles.description}>Last sent value: {savedValue} on {savedToday.format("DD/MM/YYYY")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    color: colors.primary,
    marginBottom: 40,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  buttonRow: {
      flexDirection: 'row',
  },
  spacer: {
    width: 20,
  },
  todaySection: {
    width: '100%',
  },
  goBack: {
    width: 20
  },
  information: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  }
});

export default MMainPage;
