/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'
import React from 'react';
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import {
  Center,
  Button,
  NativeBaseProvider,
  Pressable,
  Stack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Icon,
} from 'native-base';
import Footer from '../components/Footer';

import user from '../../assets/images/user-man.png';
import TopNavbarUser from './TopNavbarUser';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import Feather from 'react-native-vector-icons/dist/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
import {launchImageLibrary} from 'react-native-image-picker';
import {ControlledPropUpdatedSelectedItem} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import {logoutAction} from '../redux/reducers/auth';

YupPasword(Yup);
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1'),
});

const ProfilePage = () => {
  const token = useSelector(state => state?.auth?.token);
  const decode = jwt_decode(token);
  const {id} = decode;
  const [bio, setBio] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  React.useEffect(() => {
    getBio().then(data => {
      setBio(data?.results);
    });
  }, []);

  const getBio = async () => {
    const {data} = await http(token).get(
      'http://192.168.171.14:8888/users/' + id,
    );
    return data;
  };

  const [preview, setPreview] = React.useState({});

  const openGallery = async () => {
    const result = await launchImageLibrary();
    setPreview(result.assets[0]);
  };

  const uploadImage = async () => {
    try {
      if (preview?.filename) {
        const obj = {
          name: preview.filename,
          type: preview.type,
          uri: preview.uri,
        };
        const form = new FormData();
        form.append('picture', obj);
        const {data} = await http().post('assets/upload/', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(data.message);
      } else {
        alert('Please choose image first');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const updateProfile = async value => {
    try {
      const values = {
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
        email: value.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
      };
      await http(token).patch(
        `http://192.168.171.14:8888/profile/${id}/update/`,
        values,
      );
      setAlertSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <ScrollView>
      <TopNavbarUser />
      <View style={{backgroundColor: '#e9ecf4'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 48,
            marginBottom: 32,
          }}>
          <View style={{flexGrow: 1}}>
            <Text
              style={{
                color: '#101e2b',
                fontFamily: 'Mulish-Medium',
                marginBottom: 16,
              }}>
              Details Account
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                width: 90,
                marginLeft: 5,
                borderBottomColor: '#f1554c',
              }}></View>
          </View>
          <Pressable>
            <Text
              onPress={() => navigation.navigate('OrderHistory')}
              style={{color: '#AAAAAA', fontFamily: 'Mulish-Medium'}}>
              Order History
            </Text>
          </Pressable>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              paddingTop: 40,
              marginBottom: 32,
            }}>
            <View style={{marginBottom: 32, paddingLeft: 40}}>
              <Text>INFO</Text>
            </View>
            <NativeBaseProvider>
              <Center
                style={{paddingLeft: 40, paddingRight: 40, marginBottom: 40}}>
                <View
                  style={{
                    elevation: 5,
                    marginBottom: 32,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri:
                        'http://192.168.171.14:8888/assets/upload/' +
                        bio.picture,
                    }}
                    style={{
                      width: 136,
                      height: 136,
                      borderRadius: 100,
                      marginBottom: 10,
                    }}
                  />
                  <Pressable>
                    <Icon
                      onPress={openGallery}
                      mr="2"
                      mb="2"
                      size={5}
                      as={<Feather name="edit" />}
                    />
                  </Pressable>
                  {preview?.uri && (
                    <Image
                      source={{uri: preview?.uri}}
                      alt="preview"
                      style={{
                        width: 136,
                        height: 136,
                        resizeMode: 'contain',
                        borderRadius: 100,
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <Button onPress={uploadImage}>Upload</Button>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#101e2b',
                      fontFamily: 'Mulish-Medium',
                      fontWeight: '600',
                      letterSpacing: 0.75,
                      fontSize: 20,
                      marginBottom: 5,
                    }}>
                    {bio.firstName + ' ' + bio.lastName}
                  </Text>
                  <Text
                    style={{
                      color: '#4E4B66',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    Moviegoers
                  </Text>
                </View>
              </Center>
            </NativeBaseProvider>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 21,
              }}></View>
            <View style={{paddingHorizontal: 24, paddingBottom: 27}}>
              <Button
                onPress={handlerLogout}
                size="lg"
                style={{backgroundColor: '#f1554c'}}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Logout
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={{paddingLeft: 24, marginBottom: 39}}>
          <View>
            <Text
              style={{
                color: '#101e2b',
                fontFamily: 'Mulish-Medium',
                fontSize: 18,
              }}>
              Account Settings
            </Text>
          </View>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={updateProfile}
          validationSchema={SignUpSchema}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={{paddingHorizontal: 24, marginBottom: 38}}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 24,
                  paddingVertical: 40,
                  borderRadius: 24,
                  marginBottom: 38,
                }}>
                <View style={{marginBottom: 49}}>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 5,
                    }}>
                    Details Information
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#DEDEDE',
                    }}></View>
                </View>

                <View style={{marginBottom: 55}}>
                  <Stack style={{marginBottom: 25}}>
                    <FormControl isInvalid>
                      <FormControl.Label>Full Name</FormControl.Label>
                      <Input
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                        placeholder={bio.firstName}
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
                      <FormControl.Label>Email</FormControl.Label>
                      <Input
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder={bio.email}
                        name="email"
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
                      <FormControl.Label>Phone Number</FormControl.Label>
                      <Input
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber]')}
                        value={values.phoneNumber}
                        placeholder={bio.phoneNumber}
                        name="phoneNumber"
                      />

                      {errors.phoneNumber && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.phoneNumber}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </Stack>
                  {alertSuccess ? (
                    <Stack>
                      <Button bg="#feb05f">Profile Updated</Button>
                    </Stack>
                  ) : (
                    false
                  )}
                </View>
              </View>
              <Button
                onPress={handleSubmit}
                size="lg"
                w="100%"
                paddingHorizontal="24"
                _pressed={{bg: 'purple.500'}}
                style={{
                  backgroundColor: '#f1554c',
                  marginBottom: 32,
                  paddingHorizontal: 24,
                }}>
                <Text style={{fontWeight: '700', color: 'white'}}>
                  Update changes
                </Text>
              </Button>
              <View style={{marginBottom: 38}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 24,
                    paddingTop: 40,
                    borderRadius: 24,
                  }}>
                  <View style={{marginBottom: 49}}>
                    <Text
                      style={{
                        color: '#14142B',
                        fontFamily: 'Mulish-Medium',
                        letterSpacing: 0.75,
                        marginBottom: 5,
                      }}>
                      Account and Privacy
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#DEDEDE',
                      }}></View>
                  </View>
                  <View style={{marginBottom: 55}}>
                    <Stack style={{marginBottom: 25}}>
                      <FormControl isInvalid>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                          type={show ? 'text' : 'password'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          placeholder="************"
                          name="password"
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
                          placeholder="************"
                          name="confirmPassword"
                          InputRightElement={
                            <Pressable
                              onPress={() => setShowConfirm(!showConfirm)}>
                              <Icon
                                mr="2"
                                size={5}
                                as={
                                  <Feather
                                    name={showConfirm ? 'eye-off' : 'eye'}
                                  />
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
                    {alertSuccess ? (
                      <Stack>
                        <Button bg="#feb05f">Profile Updated</Button>
                      </Stack>
                    ) : (
                      false
                    )}
                  </View>
                </View>
              </View>
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
                  Update Changes
                </Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ProfilePage;
