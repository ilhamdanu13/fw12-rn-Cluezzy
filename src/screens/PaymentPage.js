/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import {Button, NativeBaseProvider} from 'native-base';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/dist/Feather';
import google from '../../assets/images/google.png';
import {useNavigation} from '@react-navigation/native';
import TopNavbarUser from './TopNavbarUser';
// color:
// primarybg: '#e9ecf4'z
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'

const PaymentPage = () => {
  const navigation = useNavigation();
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
              $30.00
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
            <NativeBaseProvider>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: 36,
                  paddingLeft: 40,
                }}>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{marginRight: 16, marginBottom: 10}}>
                  <View
                    style={{
                      width: 40,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={google} style={{width: 50, height: 20}} />
                  </View>
                </Button>
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
            </NativeBaseProvider>
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
                <Text
                  style={{
                    color: '#696F79',
                    fontFamily: 'Mulish-Medium',
                    marginBottom: 8,
                  }}>
                  Full Name
                </Text>
                <TextInput
                  placeholder="Jonas El Rodriguez"
                  style={{
                    borderWidth: 1,
                    borderColor: '#dedede',
                    borderRadius: 12,
                    paddingLeft: 24,
                  }}
                />
              </View>
              <View style={{marginBottom: 24}}>
                <Text
                  style={{
                    color: '#696F79',
                    fontFamily: 'Mulish-Medium',
                    marginBottom: 8,
                  }}>
                  Email
                </Text>
                <TextInput
                  placeholder="jonasrodri123@gmail.com"
                  style={{
                    borderWidth: 1,
                    borderColor: '#dedede',
                    borderRadius: 12,
                    paddingLeft: 24,
                  }}
                />
              </View>
              <View style={{marginBottom: 24}}>
                <Text
                  style={{
                    color: '#696F79',
                    fontFamily: 'Mulish-Medium',
                    marginBottom: 8,
                  }}>
                  Phone Number
                </Text>
                <TextInput
                  placeholder="081445687121"
                  style={{
                    borderWidth: 1,
                    borderColor: '#dedede',
                    borderRadius: 12,
                    paddingLeft: 24,
                  }}
                />
              </View>
            </View>
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
        <View style={{paddingHorizontal: 24}}>
          <NativeBaseProvider>
            <Button
              onPress={() => navigation.navigate('PaymentPage')}
              size="lg"
              style={{backgroundColor: '#f1554c', marginBottom: 50}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                Pay your order
              </Text>
            </Button>
          </NativeBaseProvider>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default PaymentPage;
