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
  textDecorationLine,
} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  TextArea,
  Button,
  Input,
  Stack,
  Center,
  FormControl,
  WarningOutlineIcon,
  Pressable,
  Icon,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {registerAction} from '../redux/actions/auth';

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

const phoneRegExpID = /^(^08)(\d{8,10})$/;
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExpID, 'Invalid phone number')
    .required('Required'),
});
const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const register = async value => {
    const firstName = value.firstName;
    const lastName = value.lastName;
    const phoneNumber = value.phoneNumber;
    const email = value.email;
    const password = value.password;
    const cb = () => {
      navigation.navigate('SignIn');
    };

    try {
      const results = await dispatch(
        registerAction({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,

          cb,
        }),
      );
      console.log(results.payload);
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
              Sign Up
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#8692A6',
                fontSize: 15,
              }}>
              Fill your additional details
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
            onSubmit={register}
            validationSchema={SignUpSchema}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={{marginBottom: 55}}>
                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>First Name</FormControl.Label>
                    <Input
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder="Write your first name"
                    />

                    {errors.firstName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.firstName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>Last Name</FormControl.Label>
                    <Input
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      placeholder="Write your last name"
                    />

                    {errors.lastName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.lastName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>

                <Stack style={{marginBottom: 25}}>
                  <FormControl isInvalid>
                    <FormControl.Label>Phone Number</FormControl.Label>
                    <Input
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber]')}
                      value={values.phoneNumber}
                      placeholder="Write your phone number"
                    />

                    {errors.phoneNumber && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.phoneNumber}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>

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
                <Box justifyContent="center" alignItems="center">
                  <Text>
                    Already have account ? {''}
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
                </Box>
              </View>
            )}
          </Formik>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default SignUp;
