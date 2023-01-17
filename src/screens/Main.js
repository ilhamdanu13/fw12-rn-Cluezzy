/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Home from './Home';
import ViewAll from './ViewAll';
import SignUp from './Signup';
import Footer from '../components/Footer';
import MovieDetails from './MovieDetails';
import OrderPage from './OrderPage';
import PaymentPage from './PaymentPage';
import ProfilePage from './ProfilePage';
import OrderHistory from './OrderHistory';
import TicketResult from './TicketResult';
import SignIn from './Signin';
import ForgotPassword from './ForgotPassword';
import SetPassword from './SetPassword';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {!token && (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SetPassword"
                component={SetPassword}
                options={{headerShown: false}}
              />
            </>
          )}
          {token && (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ViewAll"
                component={ViewAll}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrderPage"
                component={OrderPage}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="PaymentPage"
                component={PaymentPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TicketResult"
                component={TicketResult}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Main;
