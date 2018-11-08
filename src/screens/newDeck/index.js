import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  ToastAndroid,
  ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux';
import { Item, Input, Button, Toast, Root } from 'native-base';
import { addDeck, selectDeck } from '../../actions/deckActions';
import { createguid, sendToast } from '../../utils/helpers';
import { addUserDeck } from '../../utils/DataHandlers/FirebaseHandlers';
import { lightGreen } from '../../utils/colors';

class newDeck extends Component {  

  state = {
    deckName: '',
    loading: false,
  }

  componentDidMount() {       
  }

  onDeckNameChange = (text) => {
    this.setState({ deckName: text });
  } 

  createNewDeck = async () => {
    const { deckName } = this.state;
    const { navigation } = this.props;    
    this.setState({ loading: true });
    if (deckName !== '' || deckName.trim() !== '') {
      const newDeck = {
        id: createguid(),
        title: deckName,
        questions: [],
        attempts: []            
      };        
      this.setState({ deckName: '' });          
      await this.props.addDeck(newDeck);
      await addUserDeck(newDeck);    
      this.props.selectDeck(newDeck);      
      console.log('depois de selecionar deck');
      navigation.navigate('DeckHome');    
      this.setState({ loading: false });    
    } else {      
      if (Platform.OS === 'ios') {
        this.setState({ loading: false });        
        Toast.show({
          text: 'Give a name to your new Deck!',
          position: 'top'
        });
      } else {
        this.setState({ loading: false });
        ToastAndroid.show('Give a name to your new Deck!', ToastAndroid.SHORT); 
      }
    }     
  }

  render() {
    const { deckName, loading } = this.state;
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
            disabled={loading}
            onSubmitEditing={this.createNewDeck}
          />
        </Item>

        <Button            
          disabled={loading}
          onPress={this.createNewDeck} 
          style={styles.submitButton}>
          <Text style={{ color: 'white'}}>Submit</Text>
        </Button>        

        {
          loading ? 
          <ActivityIndicator color={lightGreen} size={'large'} />
          :
          null
        }
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
