import React, { Component } from 'react'
import { 
  StyleSheet,
  View, 
  Text, 
  TextInput, 
  Platform, 
  ActivityIndicator,
  TouchableNativeFeedback, 
  TouchableOpacity 
} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase';
import { Right, Body, Title, Left, Header, Container, Root, Button } from 'native-base';
import { darkBlue, white, lightGreen } from '../../utils/colors';
import { signIn } from '../../utils/DataHandlers/FirebaseHandlers';


class LoginScreen extends Component {
  state = {
    loading: false,    
    email: 'vinipachecov@gmail.com',
    password: '123456' 
  }

  componentDidMount() {
    const { navigation } = this.props;    
    // Check if user already authenticated
    
    firebase.auth().onAuthStateChanged(user => {            
      if (user) {                      
        this.setState({ loading: true });                
        navigation.navigate('DeckList');                
        this.setState({ loading: false });        
      } else {        
        this.setState({ loading: false });
        firebase.auth().signOut();
      }             
    }); 
  }

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    if (email !== '' && password !== '') {
      try {
        await signIn(email, password);        
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ loading: false });
      }      
    }
  }

  navigateToRegister = () => {
    const { navigation } = this.props;
    navigation.navigate('RegisterScreen');
  }

  render() {
    const { email, password, loading, alreadyLoggedIn } = this.state;
    return (
      <Root>
        <Container>
          <Header
            style={{ backgroundColor: darkBlue }}
            androidStatusBarColor={darkBlue}
            iosBarStyle={'light-content'}
          >
            <Left />
            <Body>
              <Title style={{ color: white }}>
                Flash Cards
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                dark
                onPress={this.navigateToRegister}
              >
                <Text style={{ color: lightGreen }}>SignUp</Text>
              </Button>              
            </Right>
          </Header>                
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput 
              placeholder={'Your email.'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => this.onEmailChange(text)}
              value={email}
              style={[styles.inputText, { marginVertical: 30 }]}
            />

            <TextInput 
              secureTextEntry
              autoCorrect={false}
              autoCapitalize={'none'}
              placeholder={'Password'}
              onChangeText={text => this.onPasswordChange(text)}
              value={password}
              style={[styles.inputText, { marginBottom: 30 }]}
            />            

            {
              Platform.OS === 'ios' ?
              <TouchableOpacity onPress={this.onSignIn}>
                <Text>Sign in</Text>
              </TouchableOpacity>
              :              
            <TouchableNativeFeedback onPress={this.onSignIn}>
                <View 
                style={{
                    backgroundColor: darkBlue,
                    width: '50%',     
                    alignItems: 'center'               
                  }}
                >
                  <Text 
                    style={{
                      color: white
                    }}
                  >
                    Sign in
                  </Text>
                </View>

              </TouchableNativeFeedback>
            }    
            {
              loading ? 
              <ActivityIndicator color={lightGreen} size={'large'} style={{ marginVertical: 10 }} />
              :
              null
            }            
          </View>          
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
 inputText: {
    paddingHorizontal: 15,
    width: '80%', 
    minHeight: 60, 
    borderColor: darkBlue, 
    borderRadius: 3, 
    borderWidth: 1
  }
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
