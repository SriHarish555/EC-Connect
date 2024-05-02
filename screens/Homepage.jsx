import React, {useEffect, useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import {Core} from 'react-native-linphone-sdk';

export default function Homepage({userAgent}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  useEffect(() => {
    Core.on('callStateChanged', event => {
      console.log('hello', event);
    });
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);

    console.log('In Home page#############3', userAgent);
  }, []);

  const handleCall = () => {
    options = {mediaConstraints: {audio: true, video: false}};
    userAgent.call(phoneNumber, options);
  };
  const onEndCallAction = async event => {
    const options = {linphoneCallId: event.callUUID};
    console.log(userAgent);
    console.log('call terminate', userAgent?.terminate(options));
  };
  const onAnswerCallAction = async event => {
    const options = {
      callId: event.callUUID,
      mediaConstraints: {
        audio: true,
        video: false,
      },
    };

    console.log('Answered', userAgent?.answer(options));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter SIP uri"
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Button
        title="Call"
        onPress={handleCall}
        color="#007AFF" // Button color
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
};
