import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../assets/colors';
import SearchIcon from '../../../assets/images/search.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllTokenRequest,
  selectAllTokenData,
  selectAllTokenError,
  selectAllTokenLoading,
} from '../../redux/slices/allTokenSlice';
import {navigate} from '../../utils/navigationUtils';

export const chains = [
  {
    id: 'all',
    name: 'All',
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/dcbda7884cf04dbeb498ba96cd7180a2.jpeg',
  },
  {
    id: 'linea',
    name: 'Linea',
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/203ccaf09aa64c19bc8989db729468a6.jpg',
  },
  {
    id: 'zkevm',
    name: 'zkEVM',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  },
  {
    id: 'fantom',
    name: 'Fantom',
    image:
      'https://s3.coinmarketcap.com/static/img/portraits/62d51d9af192d82df8ff3a83.png',
  },
  {
    id: 'base',
    name: 'Base',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27716.png',
  },
];

const MarketScreen = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const handleSearch = () => {};
  const allTokens = useSelector(selectAllTokenData);
  const isLoading = useSelector(selectAllTokenLoading);
  const isError = useSelector(selectAllTokenError);

  useEffect(() => {
    dispatch(fetchAllTokenRequest());
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.main} barStyle={'light-content'} />
      <View style={styles.headerContainer}>
        <View style={styles.drawerSection}>
          <Text style={[styles.drawerText, {marginRight: 15}]}>MARKET</Text>
          <Text style={styles.drawerText}>NFT</Text>
        </View>
        <Text style={styles.tokenText}>ALL TOKENS</Text>
        <View style={styles.searchBarContainer}>
          <SearchIcon height={18} width={18} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for tokens or addresses"
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor={colors.placeholderText}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 18}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {chains.map(chain => (
              <TouchableOpacity style={styles.chainContainer} key={chain.id}>
                <Image
                  source={{
                    uri: chain.image,
                  }}
                  style={styles.chainImage}
                  resizeMode="cover"
                />
                <Text style={styles.chainText}>{chain.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.allTokenContainer}>
          <FlatList
            data={allTokens}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.coingeckoId}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() =>
                  navigate('TokenDetailsScreen', {
                    coingeckoId: item.coingeckoId,
                  })
                }>
                <View style={styles.startContainer}>
                  <Image
                    source={{
                      uri: item.logoURI,
                    }}
                    style={styles.currencyImage}
                    resizeMode="cover"
                  />
                  <View style={styles.firstTextContainer}>
                    <Text style={styles.currencySymbolText}>{item.symbol}</Text>
                    <Text style={styles.currencyText}>{item.name}</Text>
                  </View>
                </View>
                <View style={styles.endContainer}>
                  <Text style={styles.priceText}>${item.price}</Text>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        color:
                          item.priceChange24h < 0 ? colors.red : colors.green,
                        fontSize: 14,
                      },
                    ]}>
                    {item.priceChange24h > 0 ? '+' : '-'}
                    {item.priceChange24h}%
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.main,
    height: '100%',
  },
  drawerText: {
    fontFamily: 'ClashGroteskDisplay-Semibold',
    color: colors.white,
    fontSize: 20,
  },
  headerContainer: {
    paddingLeft: 17,
    paddingRight: 17,
    marginTop: 60,
  },
  drawerSection: {
    flexDirection: 'row',
  },
  tokenText: {
    fontFamily: 'ClashGroteskDisplay-Semibold',
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 30,
    includeFontPadding: true,
  },
  searchBarContainer: {
    backgroundColor: `${colors.gray}66`,
    borderRadius: 50,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginTop: 26,
  },
  searchBar: {
    color: colors.white,
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
    width: '100%',
    includeFontPadding: false,
  },
  chainImage: {
    height: 16,
    width: 16,
    marginRight: 4,
    borderRadius: 40,
  },
  currencyImage: {
    height: 32,
    width: 32,
    marginRight: 12,
    borderRadius: 50,
  },
  chainText: {
    fontSize: 11,
    fontFamily: 'ProductSans-Regular',
    color: colors.white,
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
  cardContainer: {
    width: '100%',
    height: 66,
    borderRadius: 18,
    backgroundColor: colors.primaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 3,
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstTextContainer: {},
  currencySymbolText: {
    fontSize: 16,
    fontFamily: 'ClashGroteskDisplay-Semibold',
    color: colors.white,
  },
  endContainer: {},
  priceText: {
    fontSize: 16,
    fontFamily: 'ProductSans-Bold',
    color: colors.white,
    textAlign: 'right',
  },
  currencyText: {
    color: colors.placeholderText,
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
  },
  allTokenContainer: {
    marginTop: 18,
  },
});
