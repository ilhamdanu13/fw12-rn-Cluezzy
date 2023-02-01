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
import {useSelector} from 'react-redux';

const TicketResult = () => {
  const movieName = useSelector(state => state.transaction.movieName);
  const totalPrice = useSelector(state => state.transaction.totalPrice);
  const bookingDate = useSelector(state => state.transaction.bookingDate);
  const bookingTime = useSelector(state => state.transaction.bookingTime);
  const seatNum = useSelector(state => state.transaction.seatNum);
  const genre = useSelector(state => state.transaction.genre);

  const navigation = useNavigation();

  let duration = bookingTime;
  let hour = String(duration).split(':').slice(0, 1).join(':');
  let minute = String(duration).split(':')[1];

  let NewDate = new Date(bookingDate).toDateString();
  let month = NewDate.split(' ')[1];
  let dates = NewDate.split(' ')[2];

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
                      width: 100,
                    }}>
                    {movieName}
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
                      width: 100,
                    }}>
                    {genre}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row', marginBottom: 50}}>
                <View style={{marginRight: 130}}>
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
                    {dates} {month}
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
                    {hour}:{minute}
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
                    {Math.round(seatNum.length / 4)}
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
                      width: 100,
                    }}>
                    {seatNum}
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
                IDR.{totalPrice}
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
