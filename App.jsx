import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {UserAgent, Core} from 'react-native-linphone-sdk';
import {SafeAreaView} from 'react-native-safe-area-context';
import Homepage from './screens/Homepage';
import RNCallKeep from 'react-native-callkeep';

export default function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(null);
  const [userAgent, setUserAgent] = useState(null);

  useEffect(() => {
    Core.on('registered', event => {
      setAuth('success');
      console.log('Registration status', event);
    });
    Core.on('unregistered', event => {
      console.log('Registration status', event);
    });
    Core.on('registrationFailed', event => {
      console.log('Registration status', event);
    });
    Core.on('registrationProgress', event => {
      console.log('Registration status', event);
    });

    try {
      const options = {
        ios: {
          appName: 'Voip',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
        },
      };

      RNCallKeep.setup(options).then(accepted => {});
    } catch (error) {
      console.log('Call Keep Err', error);
    }
    init();
    // checkAll();
  }, []);

  const handleSubmit = async () => {
    const userAgentConfig = {
      id: username,
      username: username,
      password: password,
      domain: ipAddress,
      displayName: username,
    };
    try {
      const UA = new UserAgent(userAgentConfig);
      setUserAgent(UA);
      console.log('Starter ', await UA.start());
      console.log('registration ', await UA.register());
    } catch (error) {
      console.log('err', error);
    }
  };

  const init = async () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      {auth ? (
        <Homepage userAgent={userAgent} />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            keyboardType="phone-pad"
            placeholder="Enter IP Address"
            onChangeText={text => setIpAddress(text)}
            value={ipAddress}
          />
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            keyboardType="phone-pad"
            placeholder="Enter Username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            keyboardType="phone-pad"
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
}
