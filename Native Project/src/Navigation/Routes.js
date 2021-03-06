import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import DeckList from '../screens/DeckList';
import newDeck from '../screens/newDeck';
import DeckHome from '../screens/DeckHome';
import AddCard from '../screens/AddCard';
import QuizScreen from '../screens/Quiz';


deckStack = createStackNavigator({
  QuizScreen: {
    screen: QuizScreen
  },
  DeckHome: {
    screen: DeckHome,    
  },
  AddCard: {
    screen: AddCard
  }
},
{
  headerMode: 'none'
})

const homeTab = createBottomTabNavigator({  
 DeckList: {
   screen: DeckList,
   navigationOptions: {
    tabBarLabel: 'DeckList',
    tabBarIcon: ({ tintColor }) => 
      <Icon
        type={'FontAwesome'}
        name={'list'}
        size={20} 
        color={tintColor} 
      />
  }  

 },
 newDeck: {
   screen: newDeck,
   navigationOptions: {
     tabBarLabel: 'New Deck',
     tabBarIcon: ({ tintColor }) =>
    <Icon
      name={'ios-add'}
      type={'Ionicons'}      
      size={20} 
      color={tintColor} 
    />
   }
 }
});


const AppStack = createStackNavigator({
  homeTab: {
    screen: homeTab
  },
  deckStack: {
    screen: deckStack
  }
},
{
  headerMode: 'none'
})
export default AppStack;
