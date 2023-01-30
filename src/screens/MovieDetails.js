/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'
import {
  NativeBaseProvider,
  Center,
  Button,
  Actionsheet,
  useDisclose,
  HStack,
  Select,
  Input,
} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, Text, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import card1 from '../../assets/images/card-1.png';
import ebu from '../../assets/images/ebu.png';
import cinema from '../../assets/images/cinema.png';
import Footer from '../components/Footer';
import DatePicker from 'react-native-date-picker';
import TopNavbarUser from './TopNavbarUser';
import http from '../helpers/http';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {chooseMovie} from '../redux/reducers/transaction';

const MovieDetails = () => {
  const [selected, setSelected] = React.useState('');
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const [dateView, setDateView] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [movieDetail, setMovieDetail] = React.useState({});
  const [cityList, setCityList] = React.useState([]);
  const [city, setCity] = React.useState({});
  const [schedule, setSchedule] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedCinema, setSelectedCinema] = React.useState(null);

  const token = useSelector(state => state.auth.token);
  const route = useRoute();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getMovieDetail();
    getCinemas();
  }, []);
  const getMovieDetail = async () => {
    const {data} = await http(token).get(
      'http://192.168.136.14:8888/movies/' + route.params.id,
    );
    setMovieDetail(data.results);
    // console.log(data);
  };

  const getCinemas = async () => {
    const {data} = await http(token).get('http://192.168.136.14:8888/cinemas');
    setCityList(data.results);

    if (data.results.length) {
      setCity(data.results[0].name);
    }
  };

  const getSchedule = async () => {
    const {data} = await http(token).get(
      'http://192.168.136.14:8888/movieSchedules',
    );
    setSchedule(data.results);
    console.log(data);
  };

  const selectTime = (time, cinema) => {
    setSelectedTime(time);
    setSelectedCinema(cinema);
  };

  const book = () => {
    dispatch(
      chooseMovie({
        movieId: route.params.id,
        cinemaId: selectedCinema,
        bookingDate: date,
        bookingTime: selectedTime,
      }),
    );
    navigation.navigate('OrderPage');
  };

  return (
    <ScrollView>
      <TopNavbarUser />
      <View style={{backgroundColor: 'white'}}>
        <View>
          <Center style={{paddingTop: 50}}>
            <View
              style={{
                borderWidth: 1,
                padding: 20,
                borderColor: '#dedede',
                marginBottom: 32,
                borderRadius: 4,
              }}>
              <Image
                source={{uri: movieDetail.picture}}
                style={{width: 159, height: 244, borderRadius: 2}}
              />
            </View>
            <View style={{alignItems: 'center', marginBottom: 32}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#101e2b',
                  fontFamily: 'Mulish-Medium',
                }}>
                {movieDetail.title}
              </Text>
              <Text
                style={{
                  color: '#4E4B66',
                  fontSize: 16,
                  fontFamily: 'Mulish-Medium',
                }}>
                {movieDetail.genre}
              </Text>
            </View>
          </Center>

          <View
            style={{
              paddingHorizontal: 24,
              flexDirection: 'row',
              marginBottom: 50,
            }}>
            <View style={{marginRight: 60}}>
              <Text
                style={{
                  color: '#8692A6',
                  fontSize: 13,
                  fontFamily: 'Mulish-Medium',
                  marginBottom: 5,
                }}>
                Release date
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish-Medium',
                  fontSize: 16,
                  color: '#101e2b',
                }}>
                {movieDetail.releaseDate}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#8692A6',
                  fontSize: 13,
                  fontFamily: 'Mulish-Medium',
                  marginBottom: 5,
                }}>
                Directed by
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish-Medium',
                  fontSize: 16,
                  color: '#101e2b',
                }}>
                {movieDetail.director}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              flexDirection: 'row',
              marginBottom: 50,
            }}>
            <View style={{marginRight: 60}}>
              <Text
                style={{
                  color: '#8692A6',
                  fontSize: 13,
                  fontFamily: 'Mulish-Medium',
                  marginBottom: 5,
                }}>
                Duration
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish-Medium',
                  fontSize: 16,
                  color: '#101e2b',
                }}>
                {movieDetail.duration}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#8692A6',
                  fontSize: 13,
                  fontFamily: 'Mulish-Medium',
                  marginBottom: 5,
                }}>
                Casts
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish-Medium',
                  fontSize: 16,
                  color: '#101e2b',
                  width: 150,
                }}>
                {movieDetail.casts}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#dedede',
              marginHorizontal: 24,
              marginBottom: 24,
            }}></View>
          <View style={{paddingHorizontal: 24, paddingBottom: 56}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Mulish-Medium',
                marginBottom: 16,
                color: '#101e2b',
              }}>
              Synopsis
            </Text>
            <Text
              style={{
                color: '#4E4B66',
                fontSize: 13,
                fontFamily: 'Mulish-Medium',
                lineHeight: 22,
              }}>
              {movieDetail.synopsis}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#e9ecf4',
            paddingTop: 40,
            paddingHorizontal: 24,
          }}>
          <NativeBaseProvider>
            <Center>
              <View style={{marginBottom: 24}}>
                <Text
                  style={{
                    color: '#101e2b',
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '700',
                  }}>
                  Showtimes and Tickets
                </Text>
              </View>
              <View style={{marginBottom: 48}}>
                <Button
                  onPress={() => setDateView(true)}
                  _pressed={{bg: 'warmGray.100'}}
                  bg={'#D6D8E7'}
                  width={'150px'}
                  height={'12'}
                  borderRadius={16}
                  borderWidth={1}
                  borderColor={'#DEDEDE'}
                  marginBottom="2"
                  leftIcon={<Icon name="calendar" size={20} />}>
                  <HStack>
                    <Text
                      style={{
                        color: '#4E4B66',
                        fontFamily: 'Mulish-Medium',
                        marginRight: 20,
                      }}>
                      Set a date
                    </Text>
                    <Icon name="chevron-down" size={20} />
                  </HStack>
                </Button>
                <DatePicker
                  modal
                  mode="date"
                  open={dateView}
                  date={date}
                  onConfirm={newDate => {
                    setDate(newDate);
                    setDateView(false);
                  }}
                  onCancel={() => {
                    setDateView(false);
                  }}
                />

                <Button
                  onPress={onOpen}
                  _pressed={{bg: 'warmGray.100'}}
                  bg={'#D6D8E7'}
                  width={'150px'}
                  height={'12'}
                  borderRadius={16}
                  borderWidth={1}
                  borderColor={'#DEDEDE'}
                  leftIcon={<Icon name="map-pin" size={20} />}>
                  <HStack>
                    <Text
                      style={{
                        color: '#4E4B66',
                        fontFamily: 'Mulish-Medium',
                        marginRight: 20,
                      }}>
                      Set a City
                    </Text>
                    <Icon name="chevron-down" size={20} />
                  </HStack>
                </Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Pressable>
                      <Actionsheet.Item>Jakarta</Actionsheet.Item>
                      <Actionsheet.Item>Semarang</Actionsheet.Item>
                      <Actionsheet.Item>Medan</Actionsheet.Item>
                    </Pressable>
                  </Actionsheet.Content>
                </Actionsheet>
              </View>
            </Center>
            <View style={{marginBottom: 48}}>
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    paddingTop: 30,
                    paddingBottom: 32,
                    paddingHorizontal: 31,
                    marginBottom: 32,
                  }}>
                  <View style={{marginBottom: 23, alignItems: 'center'}}>
                    <Image
                      source={cinema}
                      width={20}
                      style={{marginBottom: 12}}
                    />
                    <Text
                      style={{
                        color: '#AAAAAA',
                        fontFamily: 'Mulish-Medium',
                        fontSize: 13,
                        textAlign: 'center',
                        width: 212,
                      }}>
                      Whatever street No.12, South Purwokerto
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#dedede',
                      marginBottom: 16,
                    }}></View>
                  <View style={{marginBottom: 24}}>
                    <Text>08:30am</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginBottom: 25}}>
                    <Text
                      style={{
                        color: '#101e2b',
                        fontFamily: 'Mulish-Medium',
                        flexGrow: 1,
                      }}>
                      Price
                    </Text>
                    <Text
                      style={{
                        color: '#101e2b',
                        fontWeight: '600',
                        fontFamily: 'Mulish-Medium',
                      }}>
                      $10.00/seat
                    </Text>
                  </View>
                  <View>
                    <Button
                      onPress={book}
                      size="sm"
                      style={{backgroundColor: '#f1554c'}}>
                      BOOK NOW
                    </Button>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 31,
                  paddingTop: 30,
                  paddingBottom: 32,
                  marginBottom: 32,
                  borderRadius: 8,
                }}>
                <View style={{marginBottom: 23, alignItems: 'center'}}>
                  <Image source={ebu} width={20} style={{marginBottom: 12}} />
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontFamily: 'Mulish-Medium',
                      fontSize: 13,
                      textAlign: 'center',
                      width: 212,
                    }}>
                    Whatever street No.12, South Purwokerto
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    marginBottom: 16,
                  }}></View>
                <View style={{marginBottom: 24}}>
                  <Text>08:30am</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 25}}>
                  <Text
                    style={{
                      color: '#101e2b',
                      fontFamily: 'Mulish-Medium',
                      flexGrow: 1,
                    }}>
                    Price
                  </Text>
                  <Text
                    style={{
                      color: '#101e2b',
                      fontWeight: '600',
                      fontFamily: 'Mulish-Medium',
                    }}>
                    $10.00/seat
                  </Text>
                </View>
                <View>
                  <Button
                    onPress={() => navigation.navigate('OrderPage')}
                    size="sm"
                    style={{backgroundColor: '#f1554c'}}>
                    BOOK NOW
                  </Button>
                </View>
              </View>
            </View>
            <View style={{paddingRight: 24, paddingBottom: 64}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    width: '35%',
                  }}></View>
                <Text style={{color: '#f1554c', paddingHorizontal: 32}}>
                  view all
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    width: '35%',
                  }}></View>
              </View>
            </View>
          </NativeBaseProvider>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default MovieDetails;
