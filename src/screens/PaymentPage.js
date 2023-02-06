/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  Button,
  Image,
  Stack,
  Input,
  WarningOutlineIcon,
  Modal,
} from 'native-base';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/dist/Feather';
import google from '../../assets/images/google.png';
import {useNavigation} from '@react-navigation/native';
import TopNavbarUser from './TopNavbarUser';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import http from '../helpers/http';
import {trxAction} from '../redux/actions/transaction';
import PushNotification from 'react-native-push-notification';

const phoneRegExpID = /^(^08)(\d{8,10})$/;
const formSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExpID, 'Invalid phone number')
    .required('Required'),
});

const PaymentPage = () => {
  const token = useSelector(state => state?.auth?.token);
  const decode = jwt_decode(token);
  const {id} = decode;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bio, setBio] = React.useState({});
  const [payment, setPayment] = React.useState([]);
  const totalPrice = useSelector(state => state.transaction.totalPrice);
  const dataTransaction = useSelector(state => state.transaction);
  const [showModal, setShowModal] = React.useState(false);
  const [alertPayment, setAlertPayment] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertForm, setAlertForm] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    paymentMethodId: '',
  });

  React.useEffect(() => {
    console.log(form);
  }, [form]);

  React.useEffect(() => {
    getPayment().then(data => {
      setPayment(data?.results);
    });
  }, []);

  const getPayment = async () => {
    const {data} = await http(token).get(
      'https://fw12-backend-shr6.vercel.app/paymentMethod',
    );
    return data;
  };

  const pay = () => {
    if (!form.paymentMethodId) {
      setAlertPayment(true);
      setAlertSuccess(false);
      return;
    }
    if (form.paymentMethodId) {
      setAlertPayment(false);
    }
    if (!form.email) {
      setAlertForm(true);
      return;
    }
    if (!form.fullName) {
      setAlertForm(true);
      return;
    }
    if (!form.phoneNumber) {
      setAlertForm(true);
      return;
    }

    dispatch(trxAction({...dataTransaction, ...form, token}));
    setShowModal(true);
  };
  const redirect = () => {
    setTimeout(() => {
      navigation.navigate('OrderHistory');

      PushNotification.localNotification({
        channelId: 'global_notif',
        title: 'Order success',
        message: 'Your seat is ready, we wait for you!',
      });
    }, 3000);
  };

  return (
    <ScrollView>
      <TopNavbarUser />
      <View style={{backgroundColor: '#e9ecf4', paddingTop: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 24,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            paddingVertical: 18,
            marginBottom: 40,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#AAAAAA',
                fontSize: 16,
                fontFamily: 'Mulish-Medium',
              }}>
              Total Payment
            </Text>
            <Text
              style={{
                color: '#101e2b',
                fontSize: 20,
                fontFamily: 'Mulish-Medium',
                fontWeight: '600',
              }}>
              IDR.{totalPrice}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 24, marginBottom: 16}}>
          <Text
            style={{
              fontSize: 18,
              color: '#101e2b',
              fontFamily: 'Mulish-Medium',
              fontWeight: '600',
            }}>
            Payment Method
          </Text>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              backgroundColor: 'white',
              marginBottom: 40,
              paddingVertical: 32,
              borderRadius: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 36,
                paddingLeft: 40,
              }}>
              {payment?.map((item, i) => (
                <Button
                  onPress={() => setForm({...form, paymentMethodId: item.id})}
                  key={i}
                  size="sm"
                  variant="outline"
                  bg={form.paymentMethodId === item.id ? 'amber.300' : 'white'}
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: item.picture}}
                      alt={item.name}
                      size={6}
                      width={20}
                      resizeMode="contain"
                    />
                  </View>
                </Button>
              ))}
            </View>
            <View style={{paddingHorizontal: 24, paddingBottom: 24}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    width: '40%',
                  }}></View>
                <Text style={{color: '#A0A3BD', paddingHorizontal: 20}}>
                  or
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    width: '40%',
                  }}></View>
              </View>
            </View>
            <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
              <Text style={{color: '#6E7191'}}>
                Pay via cash. See how it work
              </Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 24, marginBottom: 16}}>
          <Text
            style={{
              fontSize: 18,
              color: '#101e2b',
              fontFamily: 'Mulish-Medium',
            }}>
            Personal Info
          </Text>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              paddingTop: 40,
              paddingHorizontal: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 56,
            }}>
            <View style={{marginBottom: 33}}>
              <View style={{marginBottom: 24}}>
                <View isInvalid>
                  <Text
                    style={{
                      color: '#696F79',
                      fontFamily: 'Mulish-Medium',
                      marginBottom: 8,
                    }}>
                    Full Name
                  </Text>
                  <Input
                    onChangeText={value => setForm({...form, fullName: value})}
                    placeholder="write your full name"
                    style={{
                      borderColor: '#dedede',
                      borderRadius: 12,
                      paddingLeft: 24,
                    }}
                  />
                </View>
              </View>
              <Stack style={{marginBottom: 24}}>
                <View isInvalid>
                  <Text
                    style={{
                      color: '#696F79',
                      fontFamily: 'Mulish-Medium',
                      marginBottom: 8,
                    }}>
                    Email
                  </Text>
                  <Input
                    onChangeText={value => setForm({...form, email: value})}
                    placeholder="write your email"
                    style={{
                      borderColor: '#dedede',
                      borderRadius: 12,
                      paddingLeft: 24,
                    }}
                  />
                </View>
              </Stack>
              <Stack style={{marginBottom: 24}}>
                <View isInvalid>
                  <Text
                    style={{
                      color: '#696F79',
                      fontFamily: 'Mulish-Medium',
                      marginBottom: 8,
                    }}>
                    Phone Number
                  </Text>
                  <Input
                    onChangeText={value =>
                      setForm({...form, phoneNumber: value})
                    }
                    placeholder="write your phone number"
                    keyboardType="numeric"
                    style={{
                      borderColor: '#dedede',
                      borderRadius: 12,
                      paddingLeft: 24,
                    }}
                  />
                </View>
              </Stack>
            </View>
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              _backdrop={{
                _dark: {
                  bg: 'coolGray.800',
                },
                bg: 'warmGray.50',
              }}>
              <Modal.Content maxWidth="350" maxH="212">
                <Modal.Header>Order status</Modal.Header>
                <Modal.Body>Preparing seat, please wait...</Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button onPress={redirect} bg="#f1554c">
                      Yay!
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <View style={{paddingBottom: 25}}>
              <View
                style={{
                  backgroundColor: '#e9ecf4',
                  paddingHorizontal: 35,
                  paddingVertical: 12,
                  borderRadius: 12,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="alert-triangle"
                    size={20}
                    style={{color: '#feb05f', marginRight: 16}}
                  />
                  <Text style={{color: '#4E4B66'}}>
                    Fill your data correctly.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {alertSuccess ? (
          <Stack
            borderWidth={1}
            bg={'yellow.200'}
            borderColor={'yellow.500'}
            paddingVertical={5}
            marginBottom={2}
            borderRadius={2}
            marginHorizontal={24}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              Your order success!
            </Text>
          </Stack>
        ) : (
          false
        )}
        {alertForm ? (
          <Stack
            borderWidth={1}
            bg={'yellow.200'}
            borderColor={'yellow.500'}
            paddingVertical={5}
            marginBottom={2}
            borderRadius={2}
            marginHorizontal={24}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              Please fill form correctly!
            </Text>
          </Stack>
        ) : (
          false
        )}
        {alertPayment ? (
          <Stack
            borderWidth={1}
            bg={'yellow.200'}
            borderColor={'yellow.500'}
            paddingVertical={5}
            marginBottom={2}
            borderRadius={2}
            marginHorizontal={24}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              Please choose payment!
            </Text>
          </Stack>
        ) : (
          false
        )}
        <View style={{paddingHorizontal: 24}}>
          <Button
            onPress={pay}
            size="lg"
            style={{backgroundColor: '#f1554c', marginBottom: 50}}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
              Pay your order
            </Text>
          </Button>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default PaymentPage;
