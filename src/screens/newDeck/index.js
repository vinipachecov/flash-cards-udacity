import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Item, Input, Button, Toast, Root } from 'native-base';
import { addDeck, selectDeck } from '../../actions/deckActions';
import { createguid } from '../../utils/helpers';

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
    const { navigation } = this.props;    
    if (deckName !== '' || deckName.trim() !== '') {
      const newDeck = {
        id: createguid(),
        title: deckName,
        questions: []            
      };        
      this.setState({ deckName: '' });          
      await this.props.addDeck(newDeck);    
      this.props.selectDeck(newDeck);
      console.log('depois de selecionar deck');
      navigation.navigate('DeckHome');        
    } else {      
      if (Platform.OS === 'ios') {
        Toast.show({
          text: 'Digite um nome para o seu deck!',
          position: 'top'
        });
      } else {
        ToastAndroid.show('Digite um nome para o seu deck!', ToastAndroid.SHORT); 
      }
    }     
  }

  render() {
    const { deckName } = this.state;
    return (
      <Root>
      <View style={styles.container}>        

        <Text style={styles.title}>
          What is the title{'\n'} of your new{'\n'} Deck?
        </Text>        
        <Item regular style={{ borderRadius: 3, marginVertical: 20, width: '80%', }}>
          <Input 
            value={deckName}
            onChangeText={text => this.onDeckNameChange(text)}
            placeholder='New Deck.'              
            placeholderTextColor={'lightgray'}       
            autoCorrect={false}
            onSubmitEditing={this.createNewDeck}
          />
        </Item>

        <Button            
          onPress={this.createNewDeck} 
          style={styles.submitButton}>
          <Text style={{ color: 'white'}}>Submit</Text>
        </Button>        
      </View>
    </Root>
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
  addDeck,  
  selectDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(newDeck);
