/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {NativeBaseProvider, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../redux/reducers/auth';
import {useRoute} from '@react-navigation/native';
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
  logotext: {
    fontFamily: 'RubikBubbles-Regular',
    color: '#ef91a1',
    fontSize: 30,
  },
});
const TopNavbarUser = () => {
  const token = useSelector(state => state?.auth?.token);
  const [focus, setFocus] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <View style={{backgroundColor: 'white', elevation: 5}}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 33,
          paddingHorizontal: 24,
        }}>
        <Text
          onPress={() => navigation.navigate('Home')}
          style={styles.logotext}>
          Cluezzy
        </Text>
        <Icon onPress={() => setFocus(!focus)} name="menu" size={20} />
      </Pressable>
      {focus && (
        <View>
          <View style={{paddingHorizontal: 24, marginBottom: 40}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#dedede',
                paddingLeft: 20,
              }}>
              <Icon name="search" size={20} />
              <TextInput placeholder="Search..." style={{paddingLeft: 20}} />
            </View>
          </View>
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 16,
              }}></View>
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Mulish-Medium',
                    color: '#101e2b',
                  }}>
                  Home
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 16,
              }}></View>
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <Pressable onPress={() => navigation.navigate('ViewAll')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Mulish-Medium',
                    color: '#101e2b',
                  }}>
                  List Movie
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 16,
              }}></View>
          </View>
          <View>
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Mulish-Medium',
                    color: '#101e2b',
                  }}>
                  Profile
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 16,
              }}></View>
          </View>
          <View>
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <Pressable onPress={handlerLogout}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Mulish-Medium',
                    color: '#101e2b',
                  }}>
                  Logout
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 32,
              }}></View>
          </View>
          <View style={{alignItems: 'center', paddingBottom: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Mulish-Medium',
                color: '#6E7191',
              }}>
              © 2020 Tickitz. All Rights Reserved.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TopNavbarUser;
