import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Container, Left, Icon, Right, Body, Title, Button } from 'native-base';
import { connect } from 'react-redux'
import { darkBlue, white } from '../../utils/colors';

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
    this.setState({ type});
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
    const  { navigation } = this.props
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

  onRenderQuizz = () => {
    const { selectedDeck } = this.props;
    const { questionCounter, type } = this.state;
    if (questionCounter < selectedDeck.questions.length) {
      return ( 
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', fontSize: 25, marginLeft: 20,  marginVertical: 40}}>
        {
            type === 'question' ?                 
          selectedDeck.questions[questionCounter].question
          :
          selectedDeck.questions[questionCounter].answer
        }
        </Text>
        <Button 
          onPress={() => this.switchType(type === 'question' ? 'answer' : 'question')}
          style={{ alignSelf: 'center', backgroundColor: darkBlue, paddingHorizontal: 20 }}              
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
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>          
          <Text>Finished Quiz!</Text>
          <Button
            onPress={this.onRestartQuiz}
            transparent
            bordered
            full
            style={{ borderColor: darkBlue, marginHorizontal: 40 , marginTop: 60, marginBottom: 20 }}
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
            style={{ backgroundColor: darkBlue, marginHorizontal: 40 }}
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
              style={{ color: white }}
                name={'arrow-back'}
              />
            </Button>

          </Left>
          <Body>
            <Title>
              Quiz
            </Title>
          </Body>
          <Right/>
        </Header>
        {/* card Counter / Points counter */}
        <View style={{ width: '100%', alignItems: 'flex-start' }}>
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
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button              
              success
              full
              style={{ marginHorizontal: 40}}
              onPress={() => this.onAnswerReceived('CORRECT')}
            > 
              <Text style={{ color: 'white', alignSelf: 'center'}}>Correct</Text>             
            </Button>
            <Button              
              danger
              full
              style={{ marginBottom: 60, marginTop: 20, marginHorizontal: 40 }}              
              onPress={() => this.onAnswerReceived('INCORRECT')}
            >
              <Text style={{ color: 'white', alignSelf: 'center'}}>Incorrect</Text>              
            </Button>                 

        </View>
          :
          null
        }
          
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDeck: state.deckData.selectedDeck
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)
