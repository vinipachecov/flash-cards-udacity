import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList, TextInput,KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Item, Input, Button } from 'native-base';
import { AsyncStorageKey } from '../../utils/keys';
import { addDeck } from '../../actions/deckActions';

class newDeck extends Component {  

  state = {
    deckName: ''
  }

  componentDidMount() {       
  }

  onDeckNameChange = (text) => {
    this.setState({ deckName: text });
  } 

  createNewDeck = async () => {
    const { deckName } = this.state;
    const { navigation, decks } = this.props;
    const newDeck = {
      title: deckName,
      questions: [],       
    }
    await this.props.addDeck(newDeck, decks);    
    navigation.goBack();
  }

  render() {
    const { deckName } = this.state;
    return (
      <View style={styles.container}>        

        <Text style={styles.title}>
          What is the title{'\n'} of your new{'\n'} Deck?
        </Text>        
        <Item regular style={{ borderRadius: 3, marginVertical: 20, width: '80%', }}>
          <Input 
            value={deckName}
            onChangeText={text => this.onDeckNameChange(text)}
            placeholder='New Deck.' 
            underlineColorAndroid    
            placeholderTextColor={'lightgray'}       
            autoCorrect={false}
          />
        </Item>

        <Button            
          onPress={this.createNewDeck} 
          style={styles.submitButton}>
          <Text style={{ color: 'white'}}>Submit</Text>
        </Button>        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center'
  },
  input: {
    width: '90%',
    fontSize: 25,    
  },
  submitButton: {
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 5 
  }
});

const mapStateToProps = (state) => ({  
  decks: state.deckData.decks
})

const mapDispatchToProps = {
  addDeck  
}

export default connect(mapStateToProps, mapDispatchToProps)(newDeck);
