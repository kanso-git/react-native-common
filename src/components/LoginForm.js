import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';


class LoginForm extends Component {
state= {
  email: '', password: '', error: '', loading: false,
};
onLoginSucess=() => {
  this.setState(() => ({
    email: '',
    password: '',
    error: '',
    loading: false,
  }));
}
handleBtnPress = (e) => {
  const { email, password } = this.state;
  let error = '';
  this.setState(() => ({ error }));
  this.setState(() => ({ loading: true }));
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.onLoginSucess();
    }).catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.onLoginSucess();
        })
        .catch(() => {
          error = 'Authentication Failed';
          this.setState(() => ({ error, loading: false }));
        });
    });
};

styles = StyleSheet.create({
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
});
render() {
  return (
    <Card>
      <CardSection >
        <Input
          autoFocus
          label="Email"
          placeholder="user@gmail.com"
          value={this.state.email}
          onChangeText={email => this.setState(() => ({ email }))}
        />
      </CardSection>
      <CardSection >
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          value={this.state.password}
          onChangeText={password => this.setState(() => ({ password }))}
        />
      </CardSection>
      <Text style={this.styles.errorStyle}> {this.state.error}</Text>

      <CardSection>
        {this.state.loading ? <Spinner /> : <Button press={this.handleBtnPress}> Log in </Button>}
      </CardSection>
    </Card>);
}
}

export default LoginForm;
