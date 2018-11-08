import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Container, Left, Icon, Right, Body, Title, Button } from 'native-base';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { darkBlue, white } from '../../utils/colors';
import { setLocalNotification, clearLocalNotification } from '../../utils/helpers';
import { onUpdateDeck } from '../../actions/deckActions';
import { addUpdatedDeck } from '../../utils/DataHandlers/FirebaseHandlers';

class QuizScreen extends Component {  

  state = {
    type: 'question',
    correctAnswersCounter: 0,
    questionCounter: 0,    
  }

  /**
   * Change view to the answer
   */
  switchType = (type) => {
    this.setState({ type });
  }

  onQuizzFinished = async (questionCounter, selectedDeck, correctAnswersCounter) => {    
    if (questionCounter >= selectedDeck.questions.length) {  
      // clear all notifications  
      clearLocalNotification().then(setLocalNotification);
      Notifications.cancelAllScheduledNotificationsAsync();
      // send score data to firebase and asyncStorage
      await this.onAddAttemptData(((correctAnswersCounter * 100) / (questionCounter)).toFixed(2));
    }
  }

  onAnswerReceived = async (answer) => {   
    const { selectedDeck } = this.props; 
    const { correctAnswersCounter, questionCounter } = this.state;
    switch (answer) {
      case 'CORRECT': 
        // Correct answer code
        this.setState({ 
          correctAnswersCounter: correctAnswersCounter + 1,
          questionCounter: questionCounter + 1  
        });
        this.onQuizzFinished(questionCounter + 1, selectedDeck, correctAnswersCounter + 1);
        break;
      case 'INCORRECT':
        this.setState({           
          questionCounter: questionCounter + 1  
        });
        this.onQuizzFinished(questionCounter + 1, selectedDeck, correctAnswersCounter);
        break;
      default:
        this.setState({           
          questionCounter: questionCounter + 1  
        });        
        this.onQuizzFinished(questionCounter + 1, selectedDeck, correctAnswersCounter);
      }
  }

  onNavigateBack = () => {    
    const  { navigation } = this.props;
    this.setState({ 
      type: 'question',
      correctAnswersCounter: 0,
      questionCounter: 0
    });
    navigation.navigate('DeckHome');    
  }

  onRestartQuiz = () => {
    this.setState({
      type: 'question',
      correctAnswersCounter: 0,
      questionCounter: 0
    });
  }

  onAddAttemptData = async (score) => {
    const { selectedDeck } = this.props;
      
    const updatedDeck = {
      ...selectedDeck,      
    };  
    if ('attempts' in updatedDeck) {  
      console.log('tentativas anteriores = ', updatedDeck.attempts);
        updatedDeck.attempts.unshift({          
        date: new Date(),
        score,          
      });    
    } else {
      updatedDeck.attempts = [{
        date: new Date(),
        score,                  
      }];
    }
    
    console.log('deck atualizado =', updatedDeck);
    await Promise.all([
      this.props.onUpdateDeck(updatedDeck),
      addUpdatedDeck(updatedDeck)
    ]);      
  }

  onRenderQuizz = () => {        
    const { selectedDeck } = this.props;
    const { questionCounter, type, correctAnswersCounter } = this.state;

    if (questionCounter < selectedDeck.questions.length) {      
          return (         
      <View style={{ flex: 1 }}>
        <Text style={styles.questionOrAnswerText}>
        {
            type === 'question' ?                 
          selectedDeck.questions[questionCounter].question
          :
          selectedDeck.questions[questionCounter].answer
        }
        </Text>
        <Button 
          onPress={() => this.switchType(type === 'question' ? 'answer' : 'question')}
          style={styles.switchButton}              
        >
          <Text style={{ color: white }}>
          {
            type === 'question' ?
            'Show Answer'
            :
            'Show Question'
          }
          </Text>
        </Button>
      </View>          
      );            
    } else {      
    //   // Finished the cards QUIZ
      return (
        <View style={styles.finishedContainer}>          
          <Text>Finished Quiz!</Text>

          <Text style={{ marginVertical: 20, fontSize: 14 }}>Your answer correctly: %{
            ((correctAnswersCounter * 100) / questionCounter).toFixed(2) 
          } of the quizz</Text>
          <Button
            onPress={this.onRestartQuiz}
            transparent
            bordered
            full
            style={styles.restartButton}
          >
            <Text 
              style={{ color: darkBlue }}
            >
              Restart Quiz
            </Text>
          </Button>

          <Button
            onPress={this.onNavigateBack}
            full
            style={styles.goBackButton}
          >
            <Text style={{ color: white }}>
              Back to Deck
            </Text>
          </Button>          
        </View>
      )
    }    
  }


  render() {
    const { questionCounter, correctAnswersCounter } = this.state;
    const { selectedDeck } = this.props;
    return (
      <Container>
        <Header
          style={{ backgroundColor: darkBlue }}
          androidStatusBarColor={darkBlue}
          iosBarStyle={'light-content'}
        >
          <Left>
            <Button
              transparent
              onPress={this.onNavigateBack}
            >
              <Icon 
                style={styles.HeaderLeftIcon}
                name={'arrow-back'}
              />
            </Button>

          </Left>
          <Body>
            <Title style={styles.HeaderLeftIcon}>
              Quiz
            </Title>
          </Body>
          <Right />
        </Header>
        {/* card Counter / Points counter */}
        <View style={styles.cardCounterContainer}>
          <Text style={{ marginLeft: 20 }}>{
            questionCounter < selectedDeck.questions.length ?
            questionCounter + 1
            :
            questionCounter
            }
            /
            {correctAnswersCounter}
          </Text>
        </View>
        {this.onRenderQuizz()}  
        {
          questionCounter < selectedDeck.questions.length ?
          <View style={styles.questionContainer}>
            <Button              
              success
              full
              style={styles.buttonStyle}
              onPress={() => this.onAnswerReceived('CORRECT')}
            > 
              <Text style={styles.buttonText}>Correct</Text>             
            </Button>
            <Button              
              danger
              full
              style={[styles.buttonStyle, styles.bottomButtonStyle]}              
              onPress={() => this.onAnswerReceived('INCORRECT')}
            >
              <Text style={styles.buttonText}>Incorrect</Text>              
            </Button>                 

        </View>
          :
          null
        }
          
      </Container>
    );
  }
}

const styles = {
  finishedContainer: { 
    flex: 1, 
    alignItems: 'center' 
  },
  HeaderLeftIcon: { 
    color: white 
  },
  cardCounterContainer: { 
    width: '100%', 
    alignItems: 'flex-start' 
  },
  questionContainer: { 
    flex: 1,
    justifyContent: 'flex-end' 
  },
  buttonStyle: { 
    marginHorizontal: 40
  },
  bottomButtonStyle: { 
    marginBottom: 60, 
    marginTop: 20
  },
  restartButton: { 
    borderColor: darkBlue, 
    marginHorizontal: 40, 
    marginTop: 60, 
    marginBottom: 20 
  },
  switchButton: { 
    alignSelf: 'center', 
    backgroundColor: darkBlue, 
    paddingHorizontal: 20 
  },
  questionOrAnswerText: { 
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    marginLeft: 20,
    marginVertical: 40
  },
  goBackButton: {
    backgroundColor: darkBlue,
    marginHorizontal: 40 
  },
  buttonText: { 
    color: 'white', 
    alignSelf: 'center'
  }
};

const mapStateToProps = (state) => ({
  selectedDeck: state.deckData.selectedDeck  
});

const mapDispatchToProps = {  
  onUpdateDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)
