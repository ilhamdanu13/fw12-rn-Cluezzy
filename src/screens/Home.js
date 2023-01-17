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
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {NativeBaseProvider, Button, HStack, Pressable, Box} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import imageHome from '../../assets/images/image-home.png';
import card1 from '../../assets/images/card-1.png';
import card2 from '../../assets/images/card-2.png';
import card3 from '../../assets/images/card-3.png';
import card4 from '../../assets/images/card-4.png';
import http from '../helpers/http';
import TopNavbarUser from './TopNavbarUser';
import {useSelector, useDispatch} from 'react-redux';
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 54,
    backgroundColor: '#e9ecf4',
    fontFamily: 'Mulish-Medium',
  },
  logotext: {
    fontFamily: 'RubikBubbles-Regular',
    color: '#ef91a1',
    fontSize: 30,
  },
});

const Home = () => {
  const token = useSelector(state => state?.auth?.token);
  const [focus, setFocus] = React.useState(null);
  const [nowShowing, setNowShowing] = React.useState({});
  const [upcoming, setUpcoming] = React.useState({});
  React.useEffect(() => {
    getNowShowing().then(data => {
      setNowShowing(data);
    });
    getUpcoming().then(data => {
      setUpcoming(data);
    });
  }, []);
  const getNowShowing = async () => {
    const {data} = await http(token).get(
      'http://192.168.171.14:8888/movies/now',
    );
    return data;
  };

  const getUpcoming = async () => {
    const {data} = await http(token).get(
      'http://192.168.171.14:8888/movies/upcoming',
    );
    return data;
  };

  const navigation = useNavigation();
  const toggleFocus = id => {
    if (focus === id) {
      setFocus(null);
    } else {
      setFocus(id);
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <TopNavbarUser />
      <View style={{paddingTop: 30}}>
        <View style={{marginBottom: 60, paddingHorizontal: 24}}>
          <Text
            style={{
              fontSize: 14,

              marginBottom: 8,
            }}>
            Nearest Cinema, Newest Movie,
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#feb05f',
            }}>
            Find out now!
          </Text>
        </View>
        <View style={{marginBottom: 100, paddingHorizontal: 24}}>
          <Image source={imageHome} style={{width: '100%', height: 330}} />
        </View>
        <View style={{backgroundColor: '#D6D8E7'}}>
          <View style={{paddingHorizontal: 24, paddingTop: 48}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 32,
              }}>
              <Text style={{flexGrow: 1, color: '#0b2361', fontSize: 18}}>
                Now Showing
              </Text>
              <Pressable onPress={() => navigation.navigate('ViewAll')}>
                <Text style={{color: '#0b2361'}}>view all</Text>
              </Pressable>
            </View>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 56,
                }}>
                {nowShowing?.results?.map(char => (
                  <Pressable onPress={() => toggleFocus(char.id)}>
                    <Box
                      borderWidth="0.5"
                      padding="4"
                      borderRadius="4"
                      marginRight="4"
                      backgroundColor={
                        focus === char.id ? 'white' : 'transparent'
                      }
                      borderColor={focus === char.id ? '#e9ecf4' : 'white'}>
                      <Image
                        source={{uri: char.picture}}
                        style={{
                          marginBottom: 8,
                          width: 122,
                          height: 185,
                          borderRadius: 2,
                        }}
                      />
                      {focus === char.id && (
                        <Box>
                          <View
                            style={{
                              width: 100,
                              paddingLeft: 14,
                            }}>
                            <Text
                              style={{
                                marginBottom: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}>
                              {char.title}
                            </Text>
                            <Text
                              style={{
                                marginBottom: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}>
                              {char.genre}
                            </Text>
                          </View>
                          <Button
                            onPress={() =>
                              navigation.navigate('MovieDetails', {id: char.id})
                            }
                            width="120"
                            backgroundColor="#f1554c">
                            Detail
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{paddingHorizontal: 24, paddingTop: 48, marginBottom: 72}}>
          <View style={{paddingTop: 80}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 32,
              }}>
              <Text style={{flexGrow: 1, color: '#0b2361', fontSize: 18}}>
                Upcoming Movies
              </Text>
              <Text style={{color: '#0b2361'}}>view all</Text>
            </View>
            <ScrollView horizontal>
              <HStack space={2} marginBottom="10">
                {[
                  'September',
                  'October',
                  'November',
                  'Desember',
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                ].map(month => (
                  <Button
                    key={month}
                    style={{
                      backgroundColor: '#f1554c',
                      width: 100,
                    }}>
                    {month}
                  </Button>
                ))}
              </HStack>
            </ScrollView>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 56,
                }}>
                {upcoming?.results?.map(char => (
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                      padding: 16,
                      borderRadius: 4,
                      marginRight: 16,
                    }}>
                    <Image
                      source={{uri: char.picture}}
                      style={{
                        marginBottom: 12,
                        width: 122,
                        height: 185,
                        borderRadius: 2,
                      }}
                    />
                    <View style={{marginBottom: 24}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          color: '#101e2b',
                          marginBottom: 5,
                        }}>
                        {char.title}
                      </Text>
                      <Text
                        style={{
                          width: 120,
                          textAlign: 'center',
                          color: '#A0A3BD',
                        }}>
                        {char.genre}
                      </Text>
                    </View>
                    <NativeBaseProvider>
                      <Button
                        onPress={() => navigation.navigate('MovieDetails')}
                        size="sm"
                        variant="outline"
                        style={{borderColor: '#f1554c'}}>
                        <Text style={{color: '#f1554c'}}>Details</Text>
                      </Button>
                    </NativeBaseProvider>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            height: 400,
            paddingBottom: 48,
            marginBottom: 140,
            elevation: 5,
          }}>
          <View
            style={{
              paddingTop: 48,
              flexDirection: 'column',
              marginBottom: 42,
              alignItems: 'center',
            }}>
            <Text style={{color: '#4E4B66'}}>Be the vanguard of the</Text>
            <Text style={{fontSize: 32, color: '#feb05f'}}>Moviegoers</Text>
          </View>
          <View style={{marginBottom: 94}}>
            <TextInput
              placeholder="Type your email"
              style={{
                borderColor: 'white',
                borderWidth: 0.5,
                backgroundColor: 'white',
                paddingLeft: 10,
                marginBottom: 16,
              }}></TextInput>
            <NativeBaseProvider>
              <Button
                size="sm"
                style={{
                  backgroundColor: '#f1554c',
                  height: 50,
                }}>
                <Text style={{fontWeight: '600', color: 'white'}}>
                  Join Now
                </Text>
              </Button>
            </NativeBaseProvider>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#6E7191',
                textAlign: 'center',
                width: 220,
                lineHeight: 22,
              }}>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email .
            </Text>
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default Home;
