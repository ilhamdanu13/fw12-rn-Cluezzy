/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {NativeBaseProvider, Button, Pressable, Image} from 'native-base';
import Footer from '../components/Footer';
import cinema from '../../assets/images/cinema.png';
import ebu from '../../assets/images/ebu.png';
import TopNavbarUser from './TopNavbarUser';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const OrderHistory = () => {
  const movieName = useSelector(state => state.transaction.movieName);
  const bookingDate = useSelector(state => state.transaction.bookingDate);
  const bookingTime = useSelector(state => state.transaction.bookingTime);
  const cinemaPicture = useSelector(state => state.transaction.cinemaPicture);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let duration = bookingTime;
  let hour = String(duration).split(':').slice(0, 1).join(':');
  let minute = String(duration).split(':')[1];

  let NewDate = new Date(bookingDate).toDateString();
  let month = NewDate.split(' ')[1];
  let dates = NewDate.split(' ')[2];
  let year = NewDate.split(' ')[3];
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
            <Pressable>
              <Text
                onPress={() => navigation.navigate('ProfilePage')}
                style={{
                  color: '#aaaaaa',
                  fontFamily: 'Mulish-Medium',
                }}>
                Details Account
              </Text>
            </Pressable>
          </View>
          <View>
            <Text
              style={{
                color: '#101e2b',
                fontFamily: 'Mulish-Medium',
                marginBottom: 16,
              }}>
              Order History
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                width: 90,

                borderBottomColor: '#f1554c',
              }}></View>
          </View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              paddingTop: 25,
              paddingBottom: 40,
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 24,
            }}>
            <View style={{marginBottom: 17, paddingHorizontal: 25}}>
              <Image
                source={{uri: cinemaPicture}}
                alt="cinema"
                size={10}
                width={32}
                resizeMode="contain"
              />
            </View>
            <View style={{marginBottom: 32, paddingHorizontal: 25}}>
              <Text
                style={{
                  color: '#AAAAAA',
                  fontSize: 13,
                  fontFamily: 'Mulish-Medium',
                  letterSpacing: 0.25,
                  marginBottom: 5,
                }}>
                {month} {dates}, {year} - {hour}:{minute}
              </Text>
              <Text
                style={{
                  color: '#101e2b',
                  fontFamily: 'Mulish-Medium',
                  fontSize: 18,
                  letterSpacing: 0.75,
                  fontWeight: '600',
                }}>
                {movieName}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 24,
              }}></View>
            <View style={{paddingHorizontal: 24}}>
              <NativeBaseProvider>
                <Button
                  onPress={() => navigation.navigate('TicketResult')}
                  size="lg"
                  style={{backgroundColor: '#feb05f'}}>
                  <Text
                    style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                    Ticket in active
                  </Text>
                </Button>
              </NativeBaseProvider>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default OrderHistory;
