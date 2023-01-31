/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {
  NativeBaseProvider,
  Center,
  Button,
  Actionsheet,
  useDisclose,
  HStack,
  Select,
  Image,
  Input,
  Box,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
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
import moment from 'moment';
import jwtDecode from 'jwt-decode';

const MovieDetails = () => {
  const token = useSelector(state => state.auth.token);
  const decode = jwtDecode(token);
  const userId = decode.id;
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const [dateView, setDateView] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [movieDetail, setMovieDetail] = React.useState({});
  const [cityList, setCityList] = React.useState([]);
  const [city, setCity] = React.useState({});
  const [schedule, setSchedule] = React.useState({});
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedCinema, setSelectedCinema] = React.useState(null);
  const [selectedCinemaPicture, setSelectedCinemaPicture] = React.useState('');
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [selectedPrice, setSelectedPrice] = React.useState('');

  const route = useRoute();
  const dispatch = useDispatch();

  //release date
  let NewDate = new Date(movieDetail?.releaseDate).toDateString();
  let month = NewDate.split(' ')[1];
  let dateNew = NewDate.split(' ')[2];
  let year = NewDate.split(' ')[3];

  //duration
  let duration = movieDetail?.duration;
  let hour = String(duration).split(':').slice(0, 1).join(':');
  let minute = String(duration).split(':')[1];

  React.useEffect(() => {
    getMovieDetail();
    getCinemas();
    getSchedule();
  }, []);
  const getMovieDetail = async () => {
    const {data} = await http(token).get(
      'https://fw12-backend-shr6.vercel.app/movies/' + route.params.id,
    );
    setMovieDetail(data.results);
    // console.log(data);
  };

  const getCinemas = async () => {
    const {data} = await http(token).get(
      'https://fw12-backend-shr6.vercel.app/cinemas',
    );
    setCityList(data.results);

    if (data.results.length) {
      setCity(data.results[0].name);
    }
  };

  const getSchedule = async () => {
    const {data} = await http(token).get(
      'https://fw12-backend-shr6.vercel.app/movieSchedules/' + route.params.id,
    );
    setSchedule(data.results);
    console.log(data);
  };

  const selectTime = (time, cinema, price, title, cinemaPicture, genre) => {
    setSelectedTime(time);
    setSelectedCinema(cinema);
    setSelectedPrice(price);
    setSelectedMovie(title);
    setSelectedCinemaPicture(cinemaPicture);
    setSelectedGenre(genre);
  };

  const book = () => {
    dispatch(
      chooseMovie({
        userId: userId,
        movieId: route.params.id,
        cinemaId: selectedCinema,
        bookingDate: date,
        bookingTime: selectedTime,
        price: selectedPrice,
        movieName: selectedMovie,
        cinemaPicture: selectedCinemaPicture,
        genre: selectedGenre,
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
                alt="movie"
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
            <View style={{marginRight: 82}}>
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
                {month} {dateNew}, {year}
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
            <View style={{marginRight: 100}}>
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
                  width: 82,
                }}>
                {hour} Hour {minute} Minutes
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
                {movieDetail.casts} ...,
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
            <View style={{marginBottom: 10}}>
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
                  <View
                    style={{
                      marginBottom: 23,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{
                        uri: schedule.cinemapicture,
                      }}
                      alt="cinema"
                      size={6}
                      width={32}
                      style={{marginBottom: 10}}
                    />
                    <Text style={{color: '#6E7191'}}>{schedule.cinema}</Text>
                    <Text
                      style={{
                        color: '#AAAAAA',
                        fontFamily: 'Mulish-Medium',
                        fontSize: 13,
                        textAlign: 'center',
                        width: 212,
                      }}>
                      {schedule.address}
                    </Text>
                    <Text
                      style={{
                        color: '#AAAAAA',
                        fontFamily: 'Mulish-Medium',
                        fontSize: 13,
                        textAlign: 'center',
                        width: 212,
                      }}>
                      {schedule.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#dedede',
                      marginBottom: 16,
                    }}></View>
                  <View
                    style={{
                      marginBottom: 24,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {schedule?.times?.map((time, i) => (
                      <Pressable
                        key={i}
                        marginBottom={2}
                        backgroundColor={'white'}
                        onPress={() =>
                          selectTime(
                            time,
                            schedule.cinema,
                            schedule.price,
                            schedule.title,
                            schedule.cinemapicture,
                            movieDetail.genre,
                          )
                        }>
                        <Text
                          style={{
                            marginRight: 28,
                            color:
                              schedule.cinema === selectedCinema &&
                              time === selectedTime
                                ? '#f1554c'
                                : 'black',
                            fontWeight:
                              schedule.cinema === selectedCinema &&
                              time === selectedTime
                                ? 'bold'
                                : 'normal',
                          }}>
                          {time}
                        </Text>
                      </Pressable>
                    ))}
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
                      IDR.{schedule.price}/seat
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
