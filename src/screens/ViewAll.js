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
  Select,
  CheckIcon,
  Box,
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

const styles = StyleSheet.create({
  wrapper: {
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
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('');
  const [search, setSearch] = React.useState('');
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  React.useEffect(() => {
    getMovies().then(data => {
      setMovies(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, search]);

  const getMovies = async () => {
    const {data} = await http(token).get(
      `https://fw12-backend-shr6.vercel.app/movies?page=${page}&limit=4&search=${search}&sortBy=title&sort=${sort}`,
    );
    return data;
  };
  return (
    <ScrollView style={styles.wrapper}>
      <TopNavbarUser />
      <View>
        <View style={{paddingTop: 48, marginBottom: 20}}>
          <View>
            <View style={{paddingHorizontal: 10}}>
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
                <Box
                  bg={'white'}
                  borderRadius={16}
                  marginRight={12}
                  flexGrow={1}>
                  <Select
                    selectedValue={sort}
                    onValueChange={value => setSort(value)}
                    minWidth="100"
                    placeholder="Sort"
                    fontSize="14"
                    borderRadius="16"
                    _selectedItem={{
                      bg: '#f1554c',
                      endIcon: <CheckIcon size={2} />,
                    }}>
                    <Select.Item label="A-Z" value="ASC" />
                    <Select.Item label="Z-A" value="DESC" />
                  </Select>
                </Box>

                <View>
                  <TextInput
                    onChangeText={value => setSearch(value)}
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
              <HStack
                space={2}
                style={{marginBottom: 32, marginHorizontal: 10}}>
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
            <ScrollView style={{paddingLeft: 14}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 56,
                  flexWrap: 'wrap',
                }}>
                {movies?.results?.map((char, i) => (
                  <View
                    key={i}
                    style={{
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                      backgroundColor: 'white',
                      padding: 16,
                      borderRadius: 4,
                      marginRight: 16,
                      marginBottom: 16,
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
                      onPress={() =>
                        navigation.navigate('MovieDetails', {id: char.id})
                      }
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

        <Center style={{marginBottom: 58}}>
          <HStack>
            <Pressable
              onPress={() => setPage(1)}
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                marginRight: 6,
              }}>
              <Text style={{fontSize: 18}}>1</Text>
            </Pressable>
            <Pressable
              onPress={() => setPage(2)}
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                marginRight: 6,
              }}>
              <Text style={{fontSize: 18}}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => setPage(3)}
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                marginRight: 6,
              }}>
              <Text style={{fontSize: 18}}>3</Text>
            </Pressable>
            <Pressable
              onPress={() => setPage(4)}
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                marginRight: 6,
              }}>
              <Text style={{fontSize: 18}}>4</Text>
            </Pressable>
          </HStack>
        </Center>

        <Footer />
      </View>
    </ScrollView>
  );
};

export default ViewAll;
