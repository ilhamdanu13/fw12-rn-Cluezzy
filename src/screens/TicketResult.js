/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {NativeBaseProvider, Button} from 'native-base';
import barcode from '../../assets/images/barcode.png';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import TopNavbarUser from './TopNavbarUser';
// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'
const TicketResult = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <TopNavbarUser />
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: '#e9ecf4',
          paddingTop: 48,
          paddingBottom: 72,
        }}>
        <View
          style={{
            backgroundColor: 'white',

            paddingVertical: 32,

            borderRadius: 8,
          }}>
          <View
            style={{
              marginBottom: 105,
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            <Image source={barcode} />
          </View>
          <View style={{paddingLeft: 24, paddingRight: 36}}>
            <View style={{marginBottom: 50}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 80}}>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Movie
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    Spider-Man: ..
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Category
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    Action
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row', marginBottom: 50}}>
                <View style={{marginRight: 140}}>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Date
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    07 Jul
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Time
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    2:00pm
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 50}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 140}}>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Count
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    3 pcs
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: 13,
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                      marginBottom: 4,
                    }}>
                    Seats
                  </Text>
                  <Text
                    style={{
                      color: '#14142B',
                      fontFamily: 'Mulish-Medium',
                      letterSpacing: 0.75,
                    }}>
                    C4, C5, C6
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 24}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#dedede',
                paddingVertical: 10,
                paddingHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Mulish-Medium',
                  color: '#101e2b',
                  letterSpacing: 0.75,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Mulish-Medium',
                  color: '#101e2b',
                  letterSpacing: 0.75,
                  fontWeight: '600',
                }}>
                $30.00
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            left: 8,
            top: 270,
          }}>
          <View
            style={{
              borderWidth: 16,
              borderRadius: 20,
              borderColor: '#e9ecf4',
            }}></View>
          <View
            style={{
              borderBottomWidth: 1,
              width: 280,
              borderStyle: 'dashed',
              borderBottomColor: '#e9ecf4',
            }}></View>
          <View
            style={{
              borderWidth: 16,
              borderRadius: 20,
              borderColor: '#e9ecf4',
            }}></View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default TicketResult;
