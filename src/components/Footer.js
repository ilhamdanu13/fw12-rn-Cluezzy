/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import ebu from '../../assets/images/ebu.png';
import cinema from '../../assets/images/cinema.png';
import hiflix from '../../assets/images/hiflix.png';

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
const Footer = () => {
  return (
    <View
      style={{
        paddingHorizontal: 24,
        backgroundColor: 'white',
        paddingTop: 75,
        marginBottom: 50,
      }}>
      <View style={{marginBottom: 23}}>
        <Text style={styles.logotext}>Cluezzy</Text>
      </View>
      <View>
        <Text
          style={{
            color: '#6E7191',
            lineHeight: 24,
            width: 252,
            marginBottom: 40,
          }}>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>
      </View>
      <View style={{marginBottom: 12}}>
        <Text style={{color: '#101e2b', fontSize: 16, fontWeight: '600'}}>
          Explore
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 30}}>
        <Text style={{marginRight: 61, color: '#6E7191'}}>Home</Text>
        <Text style={{color: '#6E7191'}}>List Movie</Text>
      </View>
      <View style={{marginBottom: 16}}>
        <Text style={{color: '#101e2b', fontSize: 16, fontWeight: '600'}}>
          Our Sponsor
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 48,
        }}>
        <Image source={ebu} style={{marginRight: 24}} />
        <Image source={cinema} style={{marginRight: 24}} />
        <Image source={hiflix} />
      </View>
      <View style={{marginBottom: 18}}>
        <Text style={{color: '#101e2b', fontSize: 16, fontWeight: '600'}}>
          Follow us
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 66,
        }}>
        <Icon
          name="facebook"
          size={20}
          style={{color: '#6E7191', marginRight: 41}}
        />
        <Icon
          name="instagram"
          size={20}
          style={{color: '#6E7191', marginRight: 37}}
        />
        <Icon
          name="twitter"
          size={20}
          style={{color: '#6E7191', marginRight: 35}}
        />
        <Icon name="youtube" size={20} style={{color: '#6E7191'}} />
      </View>
      <View style={{paddingBottom: 43}}>
        <Text style={{color: '#6E7191'}}>
          © 2020 Tickitz. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

export default Footer;
