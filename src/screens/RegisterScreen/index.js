import React, { Component } from 'react'
import { 
  TextInput,
  StyleSheet, 
  View, 
  Text, 
  Platform, 
  TouchableOpacity, 
  TouchableNativeFeedback,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { 
  Left, 
  Root, 
  Container, 
  Header, 
  Button, 
  Icon, 
  Body, 
  Title, 
  Right,
  Toast
} from 'native-base';
import { white, darkGray, darkBlue, lightGreen } from '../../utils/colors';
import { signUp } from '../../utils/DataHandlers/FirebaseHandlers';

class RegisterScreen extends Component {  

  state = {
    loading: false,
    userEmail: 'vinipachecov@gmail.com',
    password: '123456',
    confirmPassword: '123456'
  }

  onRegisterUser = async () => {
    const { userEmail, password, confirmPassword } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    console.log('registering new User!');
    if ( 
      userEmail !== '' 
      && userEmail.replace(' ', '') !== '' 
      && password !== '' 
      && password.replace(' ', '') !== ''      
      && confirmPassword !== '' 
      && confirmPassword.replace(' ', '') !== ''
     ) {
       if (password === confirmPassword) {
        await signUp(userEmail, password);
        this.setState({ loading: true });
        navigation.navigate('DeckList');
       } else {
        this.setState({ loading: true });
         Platform.OS === 'ios' ?
         Toast.show({
           text: "Passwords don't match!"
         })
         :
         ToastAndroid.show("Passwords don't match!", ToastAndroid.SHORT);
       }      
     }
  }

  onNavigateBack = () => {
    const { navigation } = this.props;
    navigation.navigate('LoginScreen');
  }

  onEmailChange = (userEmail) => {
    this.setState({ userEmail });    
  }

  onPassword = (password) => {
    this.setState({ password });
  }

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  }  

  render() {
    const { 
      userEmail, 
      password, 
      confirmPassword, 
      loading 
    } = this.state;
    return (
      <Root>
        <Container>
          <Header
            style={{ borderBottomColor: darkGray, backgroundColor: darkBlue }}
            androidStatusBarColor={darkBlue}
            iosBarStyle={'light-content'}
          >
            <Left>
              <Button 
                onPress={this.onNavigateBack}
                transparent
                dark
              >
                <Icon 
                  name={'arrow-back'}
                  style={{ color: white }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: white }}>SignUp</Title>
            </Body>
            <Right />
          </Header>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextInput 
            autoCapitalize={'none'}
            placeholder={'Your email: user@email.com'}
            style={[styles.textInput, { marginTop: 40 }]}
            value={userEmail}
            onChangeText={text => this.onEmailChange(text)}
          />
          <TextInput 
            autoCapitalize={'none'}
            secureTextEntry
            placeholder={'Password'}
            style={[styles.textInput, { marginVertical: 30 }]}
            value={password}
            onChangeText={text => this.onPassword(text)}
          />
          <TextInput 
            autoCapitalize={'none'}
            secureTextEntry
            placeholder={'Confirm Password'}
            style={[styles.textInput, { marginBottom: 30 }]}
            value={confirmPassword}
            onChangeText={text => this.onConfirmPasswordChange(text)}
          />
          {
            Platform.OS === 'ios' ?
            <TouchableOpacity onPress={this.onRegisterUser}>
              <Text style={{ color: lightGreen }}>Register</Text>              
            </TouchableOpacity>
            :
            <TouchableNativeFeedback onPress={this.onRegisterUser}>
              <View>
                <Text>Register</Text>
              </View>
            </TouchableNativeFeedback>
          }
          {
            loading ? 
            <ActivityIndicator color={lightGreen} size={'large'} />
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
  textInput: { 
    paddingLeft: 5, 
    borderColor: darkBlue, 
    borderWidth: 1, 
    borderRadius: 3, 
    minHeight: 60, 
    width: '80%'
  }
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
