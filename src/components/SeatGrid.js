/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, Box, Text, HStack, Pressable} from 'native-base';

const seatAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SeatGrid = ({max = 7, startNum = 1, onChange, selected}) => {
  //   React.useEffect(() => {
  //     console.log(selected.includes('ok'));
  //   }, [selected]);
  return (
    <FlatList
      ItemSeparatorComponent={() => <Box height={2}></Box>}
      data={seatAlphabet}
      renderItem={({item}) => (
        <HStack space={2}>
          {[...Array(max)].map((_v, index) => {
            return (
              <Pressable
                onPress={() => onChange(item.concat(startNum + index))}>
                <Box
                  width="15px"
                  height="15px"
                  borderRadius="3px"
                  backgroundColor={
                    selected.includes(item.concat(startNum + index))
                      ? '#f1554c'
                      : '#D6D8E7'
                  }>
                  {/* <Text fontSize="xs">
                    {item}
                    {startNum + index}
                  </Text> */}
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      )}
    />
  );
};

export default SeatGrid;
