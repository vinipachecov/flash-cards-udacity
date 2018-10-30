import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  AsyncStorage, 
  StatusBar, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from '../../components/DeckListItem';
import ListSeparator from '../../components/ListSeparator';
import { retrieveDecks, selectDeck } from '../../actions/deckActions';


const fakeData = [
  {
    title: 'React',
    nCards: 10,
    backgroundColor: 'red'
  },
  {
    title: 'Redux',
    nCards: 10,
    backgroundColor: 'blue'
  },
  {
    title: 'Udacity',
    nCards: 10,
    backgroundColor: 'brown'
  }];
class DeckList extends Component {
  
  state = {
    loading: false,    
  }

  navigateToDeck = (deck) => {    
    const { selectDeck, navigation } = this.props
    //Select Deck
    selectDeck(deck);
    navigation.navigate('DeckHome' );
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
    // AsyncStorage.clear(); 
    // fetch all keys to get the decks
    const keys = await AsyncStorage.getAllKeys();
    // get all decks
    let decks = [];
    for (const key of keys) {
      const data = await AsyncStorage.getItem(key);            
      decks.push(JSON.parse(data));
    }    
    this.props.retrieveDecks(...decks);                
    this.setState({ loading: false });      
    } catch (error) {      
      this.setState({ loading: false });            
    }    
  }

  renderEmptyList = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No decks available, create a new one! :)</Text>
      </View>
    )
  }

  render() {    
    const { decks } = this.props;    
    console.log('dados = ', decks);
    return (      
      <View style={styles.container}>        
        { decks.length > 0  ?
          <FlatList               
            data={decks}          
            ListSeparator={ListSeparator}
            renderItem={({ item }) => 
              <DeckListItem     
                onPress={this.navigateToDeck}        
                data={item}              
              />
          }
          keyExtractor={item => item.title}
          />                                  
        :
        this.renderEmptyList()
        }         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 22 : 0,
    flex: 1,
    backgroundColor: '#fff',    
  },
});
const mapStateToProps = (state) => ({
  decks: state.deckData.decks
});

const mapDispatchToProps = {
  retrieveDecks,
  selectDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
