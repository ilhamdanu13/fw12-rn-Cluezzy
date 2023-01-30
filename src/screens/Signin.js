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
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {useDispatch} from 'react-redux';

import {loginAction} from '../redux/actions/auth';
import {set} from 'immer/dist/internal';

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

// const phoneRegExpID = /^(^08)(\d{8,10})$/;
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});
const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginProcess = async value => {
    const email = value.email;
    const password = value.password;

    try {
      const results = await dispatch(
        loginAction({
          email,
          password,
        }),
      );
      setErrMessage(results.payload);
    } catch (error) {
      console.log(error);
    }
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
              Sign In
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#8692A6',
                fontSize: 15,
                letterSpacing: 0.1,
                lineHeight: 18,
              }}>
              Sign in with your data that you entered during your registration
            </Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={loginProcess}
            validationSchema={SignInSchema}>
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

                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <Text>Password</Text>
                    <Input
                      type={show ? 'text' : 'password'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Write your password"
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            mr="2"
                            size={5}
                            as={<Feather name={show ? 'eye-off' : 'eye'} />}
                          />
                        </Pressable>
                      }
                    />

                    {errors.password && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>

                <Button
                  onPress={handleSubmit}
                  size="lg"
                  w="100%"
                  _pressed={{bg: 'purple.500'}}
                  style={{
                    backgroundColor: '#f1554c',
                    marginBottom: 12,
                  }}>
                  <Text style={{fontWeight: '700', color: 'white'}}>
                    Sign In
                  </Text>
                </Button>

                <Center>
                  <Text style={{marginBottom: 10}}>
                    Forgot your password?{' '}
                    <Pressable
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: 'blue',
                          fontWeight: '700',
                        }}>
                        Reset now
                      </Text>
                    </Pressable>
                  </Text>
                  <Text>
                    Don't have an account?{' '}
                    <Pressable onPress={() => navigation.navigate('SignUp')}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: 'blue',
                          fontWeight: '700',
                        }}>
                        Sign Up
                      </Text>
                    </Pressable>
                  </Text>
                </Center>
              </View>
            )}
          </Formik>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default SignIn;
