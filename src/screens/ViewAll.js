/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  NativeBaseProvider,
  Button,
  HStack,
  Center,
  Actionsheet,
  useDisclose,
  Icon,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Footer from '../components/Footer';
import imageHome from '../../assets/images/image-home.png';
import card1 from '../../assets/images/card-1.png';
import card2 from '../../assets/images/card-2.png';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import TopNavbarUser from './TopNavbarUser';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

// color:
// primarybg: '#e9ecf4'
// secondarybg:'#0b2361'
// primarybtn: '#f1554c'
// secondarycolor: '#ef91a1' ->logo
// tertiercolor: '#feb05f'
// colortextblack: '#101e2b',
// color text-grey: '#A0A3BD'
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
const ViewAll = () => {
  const token = useSelector(state => state?.auth?.token);
  const [selected, setSelected] = React.useState('');
  const [movies, setMovies] = React.useState({});
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();

  React.useEffect(() => {
    getMovies().then(data => {
      setMovies(data);
    });
  }, []);

  const getMovies = async () => {
    const {data} = await http(token).get('http://192.168.171.14:8888/movies');
    return data;
  };
  return (
    <ScrollView style={styles.wrapper}>
      <TopNavbarUser />
      <View>
        <View style={{paddingHorizontal: 24, paddingTop: 48, marginBottom: 20}}>
          <View>
            <View>
              <View style={{marginBottom: 12}}>
                <Text
                  style={{color: '#101e2b', fontSize: 18, fontWeight: '600'}}>
                  List Movie
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 19,
                }}>
                <Button
                  onPress={onOpen}
                  _pressed={{bg: 'warmGray.100'}}
                  bg={'white'}
                  width={'100px'}
                  height={'12'}
                  borderRadius={16}
                  borderWidth={1}
                  borderColor={'#DEDEDE'}>
                  <Text style={{color: '#A0A3BD'}}>Sort</Text>
                </Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Actionsheet.Item>By 1</Actionsheet.Item>
                    <Actionsheet.Item>By 2</Actionsheet.Item>
                    <Actionsheet.Item>By 3</Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>

                <View>
                  <TextInput
                    placeholder="Search Movie Name ..."
                    style={{
                      borderColor: '#DEDEDE',
                      borderWidth: 1,
                      borderRadius: 16,
                      paddingLeft: 20,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
              </View>
            </View>
            <ScrollView horizontal>
              <HStack space={2} style={{marginBottom: 32}}>
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
                    variant="outline"
                    key={month}
                    style={{
                      //   backgroundColor: '#f1554c',
                      borderColor: '#f1554c',
                      width: 100,
                    }}>
                    <Text style={{color: '#f1554c'}}>{month}</Text>
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
                {movies?.results?.map(char => (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                      backgroundColor: 'white',
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

                    <View
                      style={{
                        marginBottom: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          color: '#101e2b',
                          marginBottom: 5,
                          width: 100,
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

                    <Button
                      onPress={() => navigation.navigate('MovieDetails')}
                      size="sm"
                      variant="outline"
                      style={{borderColor: '#f1554c'}}>
                      <Text style={{color: '#f1554c'}}>Details</Text>
                    </Button>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <NativeBaseProvider>
          <Center style={{marginBottom: 58}}>
            <HStack>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginRight: 6,
                }}>
                <Text style={{fontSize: 18}}>1</Text>
              </View>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginRight: 6,
                }}>
                <Text style={{fontSize: 18}}>2</Text>
              </View>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginRight: 6,
                }}>
                <Text style={{fontSize: 18}}>3</Text>
              </View>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginRight: 6,
                }}>
                <Text style={{fontSize: 18}}>4</Text>
              </View>
            </HStack>
          </Center>
        </NativeBaseProvider>

        <Footer />
      </View>
    </ScrollView>
  );
};

export default ViewAll;
