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
import Feather from 'react-native-vector-icons/dist/Feather';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {useNavigation} from '@react-navigation/native';
import {resetPassword} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 54,
    backgroundColor: 'white',
    height: '100%',
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
  code: Yup.string().required('Required'),
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1')
    .required('Required'),
  confirmPassword: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1')
    .required('Required'),
});
const SetPassword = () => {
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resetPassword = async value => {
    const code = value.code;
    const email = value.email;
    const password = value.password;
    const confirmPassword = value.confirmPassword;

    if (password !== confirmPassword) {
      return setErrMessage('Password and confirm password does not match');
    }

    const cb = () => {
      navigation.navigate('Signin');
    };

    try {
      const {data} = await dispatch(
        resetPassword({code, email, password, confirmPassword, cb}),
      );
    } catch (error) {
      setErrMessage('Request not found');
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
              Set Password
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#8692A6',
                fontSize: 15,
                letterSpacing: 0.1,
                lineHeight: 18,
              }}>
              set your new password
            </Text>
          </View>
          <Formik
            initialValues={{
              code: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => console.log(values)}
            validationSchema={SignUpSchema}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={{marginBottom: 55}}>
                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>Code</FormControl.Label>
                    <Input
                      keyboardType="numeric"
                      onChangeText={handleChange('code')}
                      onBlur={handleBlur('code')}
                      value={values.code}
                      placeholder="Write your code"
                    />

                    {errors.password && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      type={show ? 'text' : 'password'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
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

                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      placeholder="Write your confirm password"
                      InputRightElement={
                        <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                          <Icon
                            mr="2"
                            size={5}
                            as={
                              <Feather name={showConfirm ? 'eye-off' : 'eye'} />
                            }
                          />
                        </Pressable>
                      }
                    />

                    {errors.confirmPassword && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.confirmPassword}
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
                    Submit
                  </Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default SetPassword;
