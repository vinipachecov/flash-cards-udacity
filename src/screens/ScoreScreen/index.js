import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment';
import { 
  Root, 
  Container, 
  Header, 
  Button, 
  Icon, 
  Left, 
  Body, 
  Title,
  Right, 
   } from 'native-base';
import { darkBlue, white } from '../../utils/colors';
import ListSeparator from '../../components/ListSeparator';

class ScoreScreen extends Component {

  componentDidMount() {
  }

  onNavigateBack = () => {
    const { navigation } = this.props;
    navigation.navigate('DeckHome');
  }
  
  render() {
    const { selectedDeck } = this.props;
    return (
      <Root>
        <Container>
          <Header
            style={{ backgroundColor: darkBlue }}
            iosBarStyle={'light-content'}
            androidStatusBarColor={darkBlue}
          >
          <Left>
            <Button
              transparent
              dark
              onPress={this.onNavigateBack}
            >
              <Icon
                name={'arrow-back'}              
                style={{ color: white }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: white }}>ScoreList</Title>
          </Body>
          <Right />
          </Header>
          
          <View style={{ flex: 1 }}>          
          <FlatList             
            style={{ marginTop: 20 }}
            data={[...selectedDeck.attempts].map((item, index) => {
              return { index, ...item };
            })}
            ItemSeparatorComponent={ListSeparator}
            keyExtractor={(item) => item.index.toString()}
            renderItem={({ item }) => 
              <View key={item.index} style={{ minHeight: 40, alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ marginLeft: 20 }}>Score: {item.score}</Text>                
                <Text style={{ marginRight: 20 }}>Date: {moment(item.date).format('LTS')}{' '}{moment(item.date).format('DD/MM/YYYY')}</Text>
              </View>
            }
          />
        </View>

        </Container>        
      </Root>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDeck: state.deckData.selectedDeck  
})

const mapDispatchToProps = {  
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen)
