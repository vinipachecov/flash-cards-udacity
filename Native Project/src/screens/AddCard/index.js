import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
 } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, 
  Icon, 
  Input, 
  Item, 
  Header, 
  Button, 
  Left, 
  Body 
} from 'native-base';
import { darkBlue, white, darkGray } from '../../utils/colors';
import { addCardToDeck } from '../../actions/deckActions';
import { createguid } from '../../utils/helpers';

class AddCard extends Component {

  state = {
    questionText: '',
    answerText: ''
  }

  addQuestion = async () => {
    const { selectedDeck, decks } = this.props;
    const { questionText, answerText } = this.state;
    
    const newQuestion = {
      id: createguid(),
      question: questionText,
      answer: answerText
    };    
    

    const currentDeck = { ...selectedDeck };   
    currentDeck.questions.push(newQuestion);
    await this.props.addCardToDeck(decks, currentDeck);
    this.props.navigation.goBack();
  }

  onQuestionTextChange = (text) => {
    this.setState({ questionText: text });
  }

  onAnswerTextChange = (text) => {
    this.setState({ answerText: text });
  }
  

  render() {
    const { questionText, answerText } = this.state;
    return (
      <Container>
        <Header 
          style={{ backgroundColor: darkBlue }}
          androidStatusBarColor={darkBlue}
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}            
            >
              <Icon
                name={'arrow-back'}
              />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: white }}>Add Card</Text>
          </Body>
        </Header>
        
          <TextInput
            style={styles.textInput}
            value={questionText}
            onChangeText={this.onQuestionTextChange}
            placeholder={'Is React-Native awesome?'}              
            placeholderTextColor={'gray'}
            underlineColorAndroid={darkGray}
          />          


          <TextInput
            style={styles.textInput}
            value={answerText}
            onChangeText={this.onAnswerTextChange}
            placeholder={'Do you have any doubts?!'}              
            placeholderTextColor={'gray'}
            underlineColorAndroid={darkGray}
          />                    

          {
            Platform.os === 'ios' ?
            <TouchableOpacity  
              style={styles.iosButton}
              onPress={this.addQuestion}
              >
              <Text style={{ color: darkBlue }}>Submit</Text>
            </TouchableOpacity>
            :
            <TouchableNativeFeedback
              onPress={this.addQuestion}
            >
              <View style={styles.androidButton}>
                <Text style={{ color: white }}>Submit</Text>
              </View>              
            </TouchableNativeFeedback>
          }        
        
      </Container>      
    )
  }
}

const styles = StyleSheet.create({
  textInput: { 
    alignSelf: 'center', 
    borderRadius: 3, 
    borderColor: darkBlue, 
    borderWidth: 1, 
    marginVertical: 20, 
    width: '80%'
  },
  iosButton: { 
    alignSelf: 'center', 
    width: '40%', 
    height: 40 
  },
  androidButton: { 
    width: '40%', 
    alignSelf: 'center', 
    backgroundColor: darkBlue, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 3 
  }
});

const mapStateToProps = (state) => ({
  selectedDeck: state.deckData.selectedDeck,
  decks: state.deckData.decks
})

const mapDispatchToProps = {
  addCardToDeck   
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
