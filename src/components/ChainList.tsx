import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {chains} from '../screens/MarketScreen';
import {colors} from '../../assets/colors';

const ChainList = ({tokenData}) => {
  const availableChains = chains.filter(
    chain => tokenData?.contractAddress[chain.id],
  );
  return (
    <View style={[styles.contractContainer, {flexDirection: 'row'}]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {availableChains.map(chain => (
          <View key={chain.id} style={styles.chainContainer}>
            <Image
              source={{uri: chain.image}}
              style={styles.chainImage}
              resizeMode="cover"
            />
            <Text style={styles.chainText}>{chain.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChainList;

const styles = StyleSheet.create({
  chainText: {
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
    color: colors.white,
  },
  chainImage: {
    height: 16,
    width: 16,
    marginRight: 4,
    borderRadius: 40,
  },
  chainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  contractContainer: {
    marginTop: 18,
  },
});
