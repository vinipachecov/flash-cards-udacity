import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  AsyncStorage,   
  Platform,
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import DeckListItem from '../../components/DeckListItem';
import ListSeparator from '../../components/ListSeparator';
import { retrieveDecks, selectDeck } from '../../actions/deckActions';
import { AsyncStorageKey } from '../../utils/keys';

import { Root, Container, Header, Icon, Button, Left, Title, Body, Right } from 'native-base';
import { darkBlue, white } from '../../utils/colors';
import { sendUserDeckData, retreiveUserData } from '../../utils/DataHandlers/FirebaseHandlers';
import { setDeckData } from '../../utils/helpers';

class DeckList extends Component {
  
  state = {
    loading: false,    
  }

  navigateToDeck = (deck) => {    
    const { selectDeck, navigation } = this.props;
    //Select Deck
    selectDeck(deck);
    navigation.navigate('DeckHome');
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });          
    const onlineData = await retreiveUserData();    
    console.log('online data = ', onlineData);    
    // fetch all keys to get the decks    
    // await AsyncStorage.clear();
    await setDeckData(onlineData.decks);
    let data = await AsyncStorage.getItem(AsyncStorageKey);
    data = JSON.parse(data);
    console.log('dados do ASync storage = ', data);    
    await sendUserDeckData(data);        
    this.props.retrieveDecks(Object.keys(onlineData.decks).map(key => {      
      return onlineData.decks[key];       
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
    );
  }

  onSignOut = async () => {
    await firebase.auth().signOut();
    const { navigation } = this.props;
    navigation.navigate('LoginStack');
    navigation.navigate('LoginScreen');    
  }

  render() {    
    const { decks } = this.props;    
    console.log('dados = ', decks);
    return (      
      <Root>
      <Container>
        <Header 
          androidStatusBarColor={darkBlue}
          iosBarStyle={'light-content'}
          style={{ backgroundColor: darkBlue }}          
        >
          <Left>
            <Button
              transparent
              dark
              onPress={this.onSignOut}
            >
              <Icon
                name={'arrow-back'}
                style={{ color: white }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: white }}>Deck List</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>        
          { decks.length > 0 ?
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
        </Container>
      </Root>
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
