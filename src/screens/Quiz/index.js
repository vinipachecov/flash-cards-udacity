import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Header, Container, Left, Icon, Right, Body, Title, Button } from 'native-base';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { darkBlue, white } from '../../utils/colors';
import { NOTIFICATION_KEY, setLocalNotification } from '../../utils/helpers';

class QuizScreen extends Component {  

  state = {
    type: 'question',
    correctAnswersCounter: 0,
    questionCounter: 0
  }

  /**
   * Change view to the answer
   */
  switchType = (type) => {
    this.setState({ type });
  }

  onAnswerReceived = (answer) => {    
    const { correctAnswersCounter, questionCounter } = this.state;

    switch (answer) {
      case 'CORRECT': 
        // Correct answer code
        this.setState({ 
          correctAnswersCounter: correctAnswersCounter + 1,
          questionCounter: questionCounter + 1  
        });
        break;
      case 'INCORRECT':
        this.setState({           
          questionCounter: questionCounter + 1  
        });
        break;
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

  onRenderQuizz = async () => {
    const { selectedDeck } = this.props;
    const { questionCounter, type } = this.state;
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
      )            
    } else {      
      // Finished the cards QUIZZ
      // clear all notifications
      await AsyncStorage.removeItem(NOTIFICATION_KEY);
      Notifications.cancelAllScheduledNotificationsAsync();
      setLocalNotification();

      return (
        <View style={styles.finishedContainer}>          
          <Text>Finished Quiz!</Text>
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
            <Title>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)
