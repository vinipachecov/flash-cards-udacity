import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,   
  TouchableOpacity, 
  TouchableNativeFeedback,
  Platform
 } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Icon, Body, Left, Title, Toast, Root, Right } from 'native-base';
import { darkBlue, white } from '../../utils/colors';

class DeckHome extends Component {     


  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('DeckList');
  }

  goToAddCard = () => {
    const { navigation } = this.props;
    navigation.navigate('AddCard');
  }

  goToQuizz = () => {
    const { navigation, selectedDeck } = this.props;    
    if (selectedDeck.questions.length > 0) {
      navigation.navigate('QuizScreen');
    } else {
      Toast.show({
        text: "You don't have any cards yet, add one beofre going to a quizz!",
        buttonText: 'Ok!',
        duration: 3000
      });
    }
  }

  goToDeckScores = () => {
    const { navigation } = this.props;
    navigation.navigate('ScoreScreen');
  }

  render() {  
    const { selectedDeck } = this.props;
    console.log('DECK SELECIONADO = ', selectedDeck)
    return (
      <Root>
      <View style={styles.container}>        
        <Header
          style={{ backgroundColor: darkBlue, elevation: 0 }}
          androidStatusBarColor={darkBlue}
          iosBarStyle={'light-content'}
        >
          <Left>
            <Button
              transparent              
              onPress={this.goBack}
            >
              <Icon
                name={'arrow-back'}
                style={styles.arrowBack}
              />
            </Button>            
          </Left>
          <Body>
            <Title style={styles.titleText}>{selectedDeck.title}</Title>
          </Body>
          <Right>
            <Button
              transparent
              dark
              onPress={this.goToDeckScores}
            >
              <Text style={{color: white }}>Scores</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.headerText}>        
          <Text style={styles.selectedDeckStyle}>
          {selectedDeck.title}{'\n'}
          <Text style={styles.cardCounterStyle}>{selectedDeck.questions.length} cards</Text>         
          </Text>
          
        
        </View>
        <View style={styles.bottomButtonsStyle}>          

          <TouchableOpacity style={styles.transparentButton} onPress={this.goToAddCard} >              
            <Text>Add Card</Text>            
          </TouchableOpacity>                       

          {
            Platform.OS === 'ios' ?
            <TouchableOpacity onPress={this.goToQuizz} style={styles.iosButton}>
              <View>
                <Text>Start Quizz</Text>
              </View>              
            </TouchableOpacity>
            :
            <TouchableNativeFeedback onPress={this.goToQuizz} >              
              <View style={styles.androidButton}>
                <Text style={{ color: white }}>Start Quizz</Text>
              </View>                
            </TouchableNativeFeedback>
          }
          
        </View>        
      </View>
      </Root>
    );
  }
}


const styles = StyleSheet.create({
  arrowBack: {
    color: Platform.OS === 'ios' ? 'white' : null
  },
  titleText: {
    color: Platform.OS === 'ios' ? 'white' : null
  },
  bottomButtonsStyle: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center'
  },
  cardCounterStyle: { 
    fontSize: 20, 
    color: 'gray' 
  },
  selectedDeckStyle: { 
    textAlign: 'center', 
    fontSize: 30 
  },
  headerText: { 
    flex: 1, 
    justifyContent: "flex-end", 
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',    
  },
  androidButton: {
    marginVertical: 10,
    backgroundColor: darkBlue, 
    width: '50%', 
    borderRadius: 3, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  iosButton: {
    marginVertical: 10,    
    width: '50%', 
    borderRadius: 3, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  transparentButton: {    
    backgroundColor: white, 
    borderColor: darkBlue,    
    borderWidth: 1,
    width: '50%', 
    borderRadius: 3, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => ({
  selectedDeck: state.deckData.selectedDeck
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckHome);
