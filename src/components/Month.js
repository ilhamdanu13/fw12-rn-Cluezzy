/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView} from 'react-native';
import {HStack, VStack, Button} from 'native-base';

const Month = () => {
  return (
    <ScrollView horizontal>
      <VStack space={2} marginBottom="10">
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
      </VStack>
    </ScrollView>
  );
};

export default Month();
