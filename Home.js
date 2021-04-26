import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    render() {  
        return (
            <View style={styles.container}>
                <Text>Bem vindo</Text>
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
})