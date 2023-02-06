import React from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';

import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'global_notif',
  channelName: 'Global Notification',
});

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});

PushNotification.channelExists('global_notif', function (exists) {
  console.log(exists); // true/false
});

PushNotification.configure({
  onRegister: token => {
    console.log('fcm token: ' + JSON.stringify(token));
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
