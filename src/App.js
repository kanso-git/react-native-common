import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';


import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from 'react-native-dotenv';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state={
    loggedIn: null,
  };

  /* remember that lifecycle methods are methods that are automatically invoked inside
  of our component all you have to do is to define the method
   */
  componentWillMount() {
    const config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    };
    console.log('config', JSON.stringify(config, null, 3));
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`Login case User is ${user} `);
        this.setState(() => ({ loggedIn: true }));
      } else {
        console.log(`Logout case user :${user} `);
        this.setState(() => ({ loggedIn: false }));
      }
    });
  }

  logout = (e) => {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout done ');
      })
      .catch(() => {
        console.log('logout error ');
      });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button press={this.logout}>
            Log out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;

      default:
        return <Spinner />;
    }
  };
  render() {
    return (
      <View>
        <Header headerTitle="Auth" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
