/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  Box,
  TextArea,
  Button,
  Input,
  Center,
  Stack,
  Icon,
  FormControl,
  WarningOutlineIcon,
  Pressable,
} from 'native-base';
import Feather from 'react-native-vector-icons/dist/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {forgotPassword} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 54,
    backgroundColor: 'white',
    paddingBottom: 269,
  },
  logotext: {
    fontFamily: 'RubikBubbles-Regular',
    color: '#ef91a1',
    fontSize: 30,
  },
  text: {
    color: '#f1eaea',
  },
  mulish: {
    fontFamily: 'Mulish-Medium',
  },
  inter: {
    fontFamily: 'Inter-Regular',
  },
  borderInput: {
    borderLeftWidth: 0.5,
  },
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});
const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = React.useState('');
  const [alertEmail, setAlertEmail] = React.useState(false);
  const [alertRequested, setAlertRequested] = React.useState(false);

  const getEmailProcess = async value => {
    const cb = () => {
      setAlertEmail(false);
      setAlertRequested(true);
      setTimeout(() => {
        navigation.navigate('SetPassword', {value});
      }, 3000);
    };
    try {
      const result = await dispatch(forgotPassword({...value, cb}));
      setErrMessage(result.payload);
      if (result.payload.startsWith('User')) {
        setAlertRequested(false);
        setAlertEmail(true);
        return;
      }
      if (result.payload.startsWith('Reset')) {
        setAlertEmail(false);
        cb();
      }
      // cb();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{marginBottom: 46}}>
          <Text style={styles.logotext}>Cluezzy</Text>
        </View>
        <View style={{marginBottom: 41}}>
          <Text
            style={{
              fontSize: 26,
              color: '#101e2b',
              fontFamily: 'Mulish-Medium',
              marginBottom: 12,
              fontWeight: '600',
            }}>
            Forgot Password
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#8692A6',
              fontSize: 15,
              letterSpacing: 0.1,
              lineHeight: 18,
            }}>
            we'll send a link to your email shortly
          </Text>
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
          }}
          onSubmit={getEmailProcess}
          validationSchema={SignUpSchema}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={{marginBottom: 55}}>
              <Stack style={{marginBottom: 25}}>
                <FormControl isInvalid>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Write your email"
                  />

                  {errors.email && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              </Stack>
              {alertRequested ? (
                <Stack
                  borderWidth={1}
                  bg={'green.200'}
                  borderColor={'green.500'}
                  paddingVertical={5}
                  marginBottom={2}
                  borderRadius={2}>
                  <Text
                    style={{
                      textAlign: 'center',
                    }}>
                    Request sent, please check your email
                  </Text>
                </Stack>
              ) : (
                false
              )}
              {alertEmail ? (
                <Stack
                  borderWidth={1}
                  bg={'red.200'}
                  borderColor={'red.500'}
                  paddingVertical={5}
                  marginBottom={2}
                  borderRadius={2}>
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                    }}>
                    User not found
                  </Text>
                </Stack>
              ) : (
                false
              )}
              <Button
                onPress={handleSubmit}
                size="lg"
                w="100%"
                style={{
                  backgroundColor: '#f1554c',
                  marginBottom: 12,
                }}>
                <Text style={{fontWeight: '700', color: 'white'}}>Send</Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
