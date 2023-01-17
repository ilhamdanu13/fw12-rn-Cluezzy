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
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1'),
});
const SetPassword = () => {
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const navigation = useNavigation();

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
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => console.log(values)}
            validationSchema={SignUpSchema}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={{marginBottom: 55}}>
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
                    Sign Up
                  </Text>
                </Button>
                <Center>
                  <Text>
                    Already have account ?{' '}
                    <Pressable onPress={() => navigation.navigate('SignIn')}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: 'blue',
                          fontWeight: '700',
                        }}>
                        Sign In
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

export default SetPassword;
