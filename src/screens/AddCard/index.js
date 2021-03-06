import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Platform, 
  TouchableNativeFeedback, 
  ActivityIndicator,
  TouchableOpacity,  
  StyleSheet,
  TextInput  
 } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, 
  Icon,   
  Header, 
  Button, 
  Left, 
  Body, 
  Right,  
  Root
} from 'native-base';
import { darkBlue, white, darkGray, lightGreen } from '../../utils/colors';
import { addCardToDeck } from '../../actions/deckActions';
import { createguid, sendToast } from '../../utils/helpers';
import { addUpdatedDeck } from '../../utils/DataHandlers/FirebaseHandlers';

class AddCard extends Component {

  state = {
    questionText: '',
    answerText: '',
    loading: false
  }

  onQuestionTextChange = (text) => {
    this.setState({ questionText: text });
  }

  onAnswerTextChange = (text) => {
    this.setState({ answerText: text });
  }

  addQuestion = async () => {
    const { selectedDeck } = this.props;
    const { questionText, answerText } = this.state;
    this.setState({ loading: true });
    
    // Check for empty inputs
    if (
      questionText !== '' && questionText.trim() !== '' 
      && answerText !== '' && answerText.trim() !== '' 
    ) {
      const newQuestion = {
        id: createguid(),
        question: questionText,
        answer: answerText
      };    
  
      const currentDeck = { ...selectedDeck };   
      currentDeck.questions.push(newQuestion);    
      await this.props.addCardToDeck(currentDeck);
      await addUpdatedDeck(currentDeck);
      this.props.navigation.goBack();
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
      sendToast('Fill both inputs before creating a card.');      
    }    
  }
  

  render() {
    const { questionText, answerText, loading } = this.state;
    return (
      <Root>
      <Container>
        <Header 
          style={{ backgroundColor: darkBlue }}
          androidStatusBarColor={darkBlue}
          iosBarStyle={'light-content'}
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}            
            >
              <Icon
                name={'arrow-back'}
                style={styles.headerLeftIcon}
              />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: white }}>Add Card</Text>
          </Body>
          <Right />
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
            Platform.OS === 'ios' ?
            <TouchableOpacity  
              style={styles.iosButton}
              onPress={this.addQuestion}
              disabled={loading}
            >
              <Text style={{ color: darkBlue }}>Submit</Text>
            </TouchableOpacity>
            :
            <TouchableNativeFeedback
              onPress={this.addQuestion}
              disabled={loading}
            >
              <View 
                style={styles.androidButton}
              >
                <Text style={{ color: white }}>Submit</Text>
              </View>              
            </TouchableNativeFeedback>
          }        
          {
            loading ?
            <ActivityIndicator color={lightGreen} size={'large'} />
            :
            null
          }
      </Container>      
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  headerLeftIcon: {
    color: white 
  },
  textInput: { 
    alignSelf: 'center', 
    borderRadius: 3, 
    borderColor: darkBlue, 
    borderWidth: 1, 
    marginVertical: 20, 
    paddingLeft: Platform.OS === 'ios' ? 5 : 0,
    width: '80%', 
    minHeight: 40,
  },
  iosButton: { 
    width: '40%', 
    alignSelf: 'center',                 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 3 
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
});

const mapDispatchToProps = {
  addCardToDeck   
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
