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
import {useDispatch, useSelector} from 'react-redux';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 54,
    backgroundColor: 'white',
    paddingBottom: 69,
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
  const token = useSelector(state => state?.auth?.token);
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [alertError, setAlertError] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resetPassword = async value => {
    const code = value.code;

    const password = value.password;
    const confirmPassword = value.confirmPassword;

    const cb = () => {
      setAlertError(false);
      navigation.navigate('Signin');
    };

    try {
      if (password !== confirmPassword) {
        setAlertError(true);
      } else {
        const results = await dispatch(
          resetPassword({code, password, confirmPassword, token, cb}),
        );
      }
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
            onSubmit={resetPassword}
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

                    {errors.code && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.code}
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
                {alertError ? (
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
                      Password and confirm password does not match
                    </Text>
                  </Stack>
                ) : (
                  false
                )}
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
