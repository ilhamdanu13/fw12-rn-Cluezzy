/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeBaseProvider, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  logotext: {
    fontFamily: 'RubikBubbles-Regular',
    color: '#ef91a1',
    fontSize: 30,
  },
});
const TopNavbar = () => {
  const [focus, setFocus] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#e9ecf4'}}>
      <Pressable>
        <View
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
        </View>
      </Pressable>
      {focus && (
        <View>
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
              <Pressable onPress={() => navigation.navigate('Signin')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Mulish-Medium',
                    color: '#101e2b',
                  }}>
                  Sign In
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

export default TopNavbar;
