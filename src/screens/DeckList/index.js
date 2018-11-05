import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  AsyncStorage,   
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from '../../components/DeckListItem';
import ListSeparator from '../../components/ListSeparator';
import { retrieveDecks, selectDeck } from '../../actions/deckActions';
import { AsyncStorageKey } from '../../utils/keys';

class DeckList extends Component {
  
  state = {
    loading: false,    
  }

  navigateToDeck = (deck) => {    
    const { selectDeck, navigation } = this.props;
    //Select Deck
    selectDeck(deck);
    navigation.navigate('DeckHome' );
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });    
    // fetch all keys to get the decks    
    let data = await AsyncStorage.getItem(AsyncStorageKey);            
     data = JSON.parse(data);    
    this.props.retrieveDecks(Object.keys(data).map(key => {
      return data[key];       
    }));                
    this.setState({ loading: false });      
    } catch (error) {      
      console.log(error);
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
          keyExtractor={item => item.id}
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
