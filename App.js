import React, { Component, useState } from 'react';
import splash from './splash';
import Home from './Home';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

const axios = require('axios');

export default class App extends React.Component {
  state = {
    email: "usuario@teste.com",
    password: "usuario_test_@@",
    logado: false
};
componentDidMount(){
  this.validarToken()
}
submeter(email, password ){
  axios.post('https://delivery.leaderaplicativos.com.br/api/api-token-auth/', {
  email: email,
  password: password,
  }).then((resp) => {
    const token = resp.data.token
    this.saveToken(token)
  })
  .catch((error) => {    
    Alert.alert('Algum erro aconteceu.')
  })
  }
  changeInputEmail(value){
    this.setState({email: value})
  }
  changeInputPassowrd(value){
    this.setState({password: value})
  }
  async saveToken(token){
    this.setState({logado: true})
    try {
      await AsyncStorage.setItem(
        'token',
        token
      );
    } catch (error) {
      // Error saving data
    }
  }
  async validarToken(){
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        if(value.trim().length > 0){
          this.setState({logado: true})
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  render() {  
    return (
    <View style={styles.container}>
    { !this.state.logado &&
      <View>
        <TextInput 
        style={styles.input} 
        placeholder="Digite seu E-mail"
        onChangeText={email => this.changeInputEmail(email)}
        value={this.state.email} 
        />
        <TextInput 
        style={styles.input}
        placeholder="Digite sua Senha"
        onChangeText={password => this.changeInputEmail(password)}
        value={this.state.password}
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}
        onPress={() => this.submeter(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity> 
      </View> }
      { this.state.logado &&
      <View>
        <Home></Home> 
      </View> }
    </View>
  );
}
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#069',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
