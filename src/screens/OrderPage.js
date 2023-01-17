/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Center, NativeBaseProvider, Button, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import cinema from '../../assets/images/cinema.png';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import TopNavbarUser from './TopNavbarUser';
import SeatGrid from '../components/SeatGrid';
// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'
const OrderPage = () => {
  const [selected, setSelected] = React.useState([]);

  const onChangeSeat = seatNum => {
    if (selected.includes(seatNum)) {
      setSelected(selected.filter(o => o !== seatNum));
    } else {
      setSelected([...selected, seatNum]);
    }
  };
  const navigation = useNavigation();
  return (
    <ScrollView>
      <TopNavbarUser />
      <View
        style={{
          paddingTop: 50,

          backgroundColor: '#e9ecf4',
        }}>
        <View>
          <View style={{paddingHorizontal: 24}}>
            <Text
              style={{
                fontSize: 18,
                color: '#101e2b',
                fontFamily: 'Mulish-Medium',
                fontWeight: '600',
                marginBottom: 16,
              }}>
              Choose Your Seat
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 41,
            borderRadius: 16,
            paddingBottom: 56,
            marginBottom: 33,

            marginHorizontal: 7,
          }}>
          <View>
            <View
              style={{
                borderColor: '#f1554c',
                borderWidth: 4,
                borderRadius: 6,
                marginHorizontal: 16,
                marginBottom: 16,
              }}></View>
            <View style={{marginLeft: 8, marginRight: 8, marginBottom: 40}}>
              <View
                style={{
                  borderLeftWidth: 2,

                  borderLeftColor: '#00BA88',
                }}></View>
              <HStack space={4}>
                <SeatGrid selected={selected} onChange={onChangeSeat} />
                <SeatGrid
                  selected={selected}
                  onChange={onChangeSeat}
                  startNum={8}
                />
              </HStack>
            </View>
            <View style={{paddingHorizontal: 33}}>
              <View>
                <Text
                  style={{
                    color: '#101e2b',
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '600',
                    marginBottom: 20,
                  }}>
                  Seating key
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 70,
                  }}>
                  <Icon
                    name="arrow-down"
                    size={20}
                    style={{color: '#14142B', marginRight: 12}}
                  />
                  <Text style={{color: '#4E4B66', fontSize: 13}}>A - G</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 70,
                  }}>
                  <Icon
                    name="arrow-right"
                    size={20}
                    style={{color: '#14142B', marginRight: 12}}
                  />
                  <Text style={{color: '#4E4B66', fontSize: 13}}>1 - 14</Text>
                </View>
              </View>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 40,
                  }}>
                  <View
                    style={{
                      borderWidth: 10,
                      borderColor: '#D6D8E7',
                      marginRight: 8,
                      borderRadius: 4,
                    }}></View>
                  <Text>Available</Text>
                </View>
                <View style={{flexDirection: 'row', marginRight: 40}}>
                  <View
                    style={{
                      borderWidth: 10,
                      borderColor: '#f1554c',
                      marginRight: 8,
                      borderRadius: 4,
                    }}></View>
                  <Text>Selected</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 20}}>
                  <View
                    style={{
                      borderWidth: 10,
                      borderColor: '#0b2361',
                      marginRight: 8,
                      borderRadius: 4,
                    }}></View>
                  <Text>Sold</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 11, paddingHorizontal: 24}}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Mulish-Medium',
                fontWeight: '600',
                color: '#101e2b',
              }}>
              Order Info
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 32,
              borderRadius: 6,
              paddingBottom: 23,
              marginBottom: 50,
              elevation: 5,
            }}>
            <NativeBaseProvider>
              <Center style={{marginBottom: 27}}>
                <View style={{marginBottom: 7}}>
                  <Image source={cinema} />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#101e2b',
                      fontFamily: 'Mulish-Medium',
                      fontWeight: '600',
                      marginBottom: 7,
                    }}>
                    CineOne21 Cinema
                  </Text>
                  <Text
                    style={{
                      color: '#101e2b',
                      fontFamily: 'Mulish-Medium',
                      fontWeight: '600',
                    }}>
                    Spider-Man: Homecoming
                  </Text>
                </View>
              </Center>
            </NativeBaseProvider>
            <View style={{paddingHorizontal: 20, marginBottom: 32}}>
              <View>
                <View style={{flexDirection: 'row', marginBottom: 11}}>
                  <Text
                    style={{
                      color: '#6B6B6B',
                      fontFamily: 'Mulish-Medium',
                      flexGrow: 1,
                    }}>
                    Tuesday, 07 July 2020
                  </Text>
                  <Text style={{color: '#101e2b'}}>02:00pm</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 11}}>
                  <Text
                    style={{
                      color: '#6B6B6B',
                      fontFamily: 'Mulish-Medium',
                      flexGrow: 1,
                    }}>
                    One ticket price
                  </Text>
                  <Text style={{color: '#101e2b'}}>$10</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#6B6B6B',
                      fontFamily: 'Mulish-Medium',
                      flexGrow: 1,
                    }}>
                    Seat choosed
                  </Text>
                  <Text style={{color: '#101e2b'}}>C4, C5, C6</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
                marginBottom: 20,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#101e2b',
                  fontFamily: 'Mulish-Medium',
                }}>
                Total Payment
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#f1554c',
                  fontFamily: 'Mulish-Medium',
                }}>
                $30
              </Text>
            </View>
          </View>
        </View>
        <NativeBaseProvider>
          <View style={{paddingHorizontal: 24}}>
            <Button
              onPress={() => navigation.navigate('PaymentPage')}
              size="lg"
              style={{backgroundColor: '#f1554c', marginBottom: 50}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                Checkout now
              </Text>
            </Button>
          </View>
        </NativeBaseProvider>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default OrderPage;
