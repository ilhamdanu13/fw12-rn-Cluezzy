/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'

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
  NativeBaseProvider,
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

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 54,
    backgroundColor: 'white',
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

  const getEmailProcess = () => {
    navigation.navigate('SetPassword');
  };
  return (
    <ScrollView>
      <NativeBaseProvider>
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

                <NativeBaseProvider>
                  <Button
                    onPress={handleSubmit}
                    size="lg"
                    w="100%"
                    style={{
                      backgroundColor: '#f1554c',
                      marginBottom: 12,
                    }}>
                    <Text style={{fontWeight: '700', color: 'white'}}>
                      Send
                    </Text>
                  </Button>
                </NativeBaseProvider>
              </View>
            )}
          </Formik>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default ForgotPassword;
