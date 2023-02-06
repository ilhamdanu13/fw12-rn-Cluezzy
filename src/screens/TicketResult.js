/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import barcode from '../../assets/images/barcode.png';
import Footer from '../components/Footer';
import TopNavbarUser from './TopNavbarUser';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

const TicketResult = () => {
  const token = useSelector(state => state?.auth?.token);
  const [ticket, setTicket] = React.useState({});
  const route = useRoute();

  React.useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    const {data} = await http(token).get(
      'https://fw12-backend-shr6.vercel.app/transactions/ticket/' +
        route.params.ticketDetail,
    );
    setTicket(data.results);
  };

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
                    {ticket.title}
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
                    {ticket.genre}
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
                    {moment(ticket.bookingDate)
                      .add(-2, 'day')
                      .format('0d, MMM')}
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
                    {String(ticket.bookingTime)
                      .split(':')
                      .slice(0, 2)
                      .join(':')}
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
                    {Math.round(ticket?.seatNum?.length / 3)}
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
                    {ticket.seatNum}
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
                IDR.{ticket.totalPrice}
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
