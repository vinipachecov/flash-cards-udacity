import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeckListItem = ({data, onPress}) => {
  const { title, questions } = data;  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress(data)}>
        <Text style={styles.deckTitle}>
          {title}{'\n'}
          {'\n'}
          <Text style={styles.deckSubs}>{questions.length} cards</Text>
        </Text>        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  buttonStyle: {        
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
    marginTop: 30,
    fontSize: 20,
    color: 'black', 
    textAlign: 'center',   
    marginBottom: 30,
  },
  deckSubs: {
    fontSize: 16,
    color: 'gray',        
  }
});

export default DeckListItem;
