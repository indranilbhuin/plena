import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../assets/colors';
import ArrowIcon from '../../../assets/images/arroow.svg';
import ShareIcon from '../../../assets/images/share.svg';
import StarIcon from '../../../assets/images/star.svg';
import LineChart from '../../components/LineChart';
import BellIcon from '../../../assets/images/bell.svg';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTokenRequest,
  selectTokenData,
  selectTokenError,
  selectTokenLoading,
} from '../../redux/slices/tokenSlice';
import {goBack} from '../../utils/navigationUtils';
import ChainList from '../../components/ChainList';
import {formatNumber} from '../../utils/numberUtils';
import GlobeIcon from '../../../assets/images/globe.svg';
import LinkIcon from '../../../assets/images/link.svg';

const TokenDetailsScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {coingeckoId} = route.params;
  const tokenData = useSelector(selectTokenData);
  const isLoading = useSelector(selectTokenLoading);
  const isError = useSelector(selectTokenError);
  console.log('is loading data', isLoading);

  const [selectedTimeInterval, setSelectedTimeInterval] = useState('24H');
  const [tooltipX, setTooltipX] = useState(-1);

  // console.log(coingeckoId);
  // console.log(tokenData);

  useEffect(() => {
    if (coingeckoId) {
      dispatch(fetchTokenRequest(coingeckoId));
    }
  }, [coingeckoId]);

  const handleTooltipChange = x => {
    setTooltipX(x);
  };

  const handleWebsiteClick = url => {
    Linking.openURL(url).catch(err =>
      console.error('Error opening GitHub:', err),
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: colors.main,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.priceText}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: colors.main,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.priceText}>Some Error occured...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#24242420" barStyle={'light-content'} />

      <View style={styles.headerContainer}>
        <View style={styles.headerStart}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => goBack()}>
            <ArrowIcon height={20} width={20} />
          </TouchableOpacity>
          <Image
            source={{
              uri: tokenData?.logoURI,
            }}
            style={styles.currencyImage}
            resizeMode="cover"
          />
          <Text style={styles.currencySymbolText}>{tokenData?.symbol}</Text>
        </View>

        <View style={styles.headerEnd}>
          <View style={styles.shareContainer}>
            <ShareIcon height={20} width={20} />
          </View>
          <StarIcon height={28} width={28} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.lastText, {marginTop: 22}]}>Last Price</Text>
          <Text style={[styles.priceText, {marginTop: 13}]}>
            ${tokenData?.price}
          </Text>
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor:
                  tokenData?.priceChange24h >= 0
                    ? `${colors.green}33`
                    : `${colors.redBackground}33`,
              },
            ]}>
            <Text
              style={[
                styles.percetText,
                {
                  color:
                    tokenData.priceChange24h >= 0 ? colors.green : colors.red,
                },
              ]}>
              {tokenData.priceChange24h > 0 ? '+' : '-'}
              {tokenData.priceChange24h}%
            </Text>
          </View>
        </View>
        <View style={styles.priceGapContainer}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[styles.lastText, {color: colors.white, marginBottom: 5}]}>
              ${tokenData?.high24}
            </Text>
            <Text style={[styles.lastText, {fontSize: 12}]}>24H High</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={[styles.lastText, {color: colors.white, marginBottom: 5}]}>
              ${tokenData?.low24}
            </Text>
            <Text style={[styles.lastText, {fontSize: 12}]}>24H Low</Text>
          </View>
        </View>
        {tokenData.chart !== undefined ? (
          <LineChart
            setPositionX={handleTooltipChange}
            positionX={tooltipX}
            stroke={colors.redBackground}
            chartDataValue={tokenData?.chart[selectedTimeInterval]}
          />
        ) : (
          <LineChart
            setPositionX={undefined}
            positionX={undefined}
            stroke={colors.redBackground}
            chartDataValue={[]}
          />
        )}

        <View style={styles.timeContainer}>
          <TouchableOpacity
            style={[
              styles.timeCard,
              selectedTimeInterval === '24H'
                ? {backgroundColor: colors.white}
                : {backgroundColor: 'transparent'},
            ]}
            onPress={() => setSelectedTimeInterval('24H')}>
            <Text
              style={[
                styles.timeText,
                selectedTimeInterval === '24H'
                  ? {color: colors.justBlack}
                  : {color: colors.white},
              ]}>
              24H
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeCard,
              selectedTimeInterval === '7D'
                ? {backgroundColor: colors.white}
                : {backgroundColor: 'transparent'},
            ]}
            onPress={() => setSelectedTimeInterval('7D')}>
            <Text
              style={[
                styles.timeText,
                selectedTimeInterval === '7D'
                  ? {color: colors.justBlack}
                  : {color: colors.white},
              ]}>
              1W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeCard,
              selectedTimeInterval === '30D'
                ? {backgroundColor: colors.white}
                : {backgroundColor: 'transparent'},
            ]}
            onPress={() => setSelectedTimeInterval('30D')}>
            <Text
              style={[
                styles.timeText,
                selectedTimeInterval === '30D'
                  ? {color: colors.justBlack}
                  : {color: colors.white},
              ]}>
              1M
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <Text style={styles.marketText}>MARKET STATS</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Market cap</Text>
              <Text style={styles.statsNumber}>
                ${formatNumber(tokenData.marketCap)}
              </Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Total supply</Text>
              <Text style={styles.statsNumber}>
                ${formatNumber(112222222222)}
              </Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Volume</Text>
              <Text style={styles.statsNumber}>
                ${formatNumber(tokenData.volume)}
              </Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsText}>All-Time</Text>
              <Text style={styles.statsNumber}>${tokenData.ath}</Text>
            </View>
            <View style={[styles.statsCard, {borderBottomWidth: 0}]}>
              <Text style={styles.statsText}>Rank</Text>
              <Text style={styles.statsNumber}>#1</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.circle}>
              <BellIcon height={24} width={24} />
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>SELL</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.white}]}>
              <Text style={[styles.buttonText, {color: colors.main}]}>BUY</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>
            Bitcoin is a decentralized cryptocurrency. Nodes in the bitcoin
            network verify transactions through cryptography and record them in
            a public distributed ledger called a blockchain. Based on a free
            market ideology, bitcoin was invented in 2008 by Satoshi Nakamoto,
            an unknown person.
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
            <Text style={[styles.contractText, {marginRight: 4}]}>
              CONTRACT ADDRESSES
            </Text>
            <TouchableOpacity>
              <LinkIcon />
            </TouchableOpacity>
          </View>
          {tokenData?.contractAddress !== undefined ? (
            <ChainList tokenData={tokenData} />
          ) : null}
          <View style={styles.contractContainer}>
            <Text style={styles.contractText}>EXTRA LINKS</Text>
            <View
              style={{flexDirection: 'row', marginTop: 18, marginBottom: 10}}>
              <TouchableOpacity
                style={[styles.chainContainer, {backgroundColor: '#875FD920'}]}
                onPress={() => handleWebsiteClick(tokenData.website)}>
                <GlobeIcon height={14} width={14} style={{marginRight: 5}} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'ClashGroteskDisplay-Medium',
                    color: '#875FD9',
                  }}>
                  Website
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TokenDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.main,
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    backgroundColor: '#24242420',
    paddingTop: 10,
  },
  backContainer: {
    height: 46,
    width: 46,
    backgroundColor: colors.primaryBackground,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  currencyImage: {
    height: 28,
    width: 28,
    borderRadius: 50,
    marginRight: 9,
  },
  currencySymbolText: {
    fontSize: 18,
    fontFamily: 'ClashGroteskDisplay-Semibold',
    color: colors.white,
  },
  shareContainer: {
    height: 38,
    width: 38,
    borderRadius: 50,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  headerStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastText: {
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
    color: colors.placeholderText,
  },
  priceText: {
    fontSize: 22,
    fontFamily: 'ClashGroteskDisplay-Medium',
    color: colors.white,
  },
  cardContainer: {
    height: 25,
    borderRadius: 40,
    backgroundColor: `${colors.redBackground}33`,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    marginTop: 10,
  },
  percetText: {
    color: colors.redBackground,
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
    alignSelf: 'center',
  },
  priceGapContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.justBlack,
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 13,
    marginLeft: 15,
    marginRight: 15,
  },
  verticalLine: {
    height: 44,
    width: 1,
    backgroundColor: '#303030',
  },
  statsContainer: {
    backgroundColor: colors.justBlack,
    borderRadius: 10,
    marginTop: 18,
  },
  statsText: {
    color: colors.placeholderText,
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 39.6,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
    paddingHorizontal: 15,
  },
  marketText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 22,
  },
  statsNumber: {
    color: colors.white,
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#181818',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    borderRadius: 50,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 50,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    color: colors.placeholderText,
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
    marginTop: 30,
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
  chainText: {
    fontSize: 11,
    fontFamily: 'ProductSans-Regular',
    color: colors.white,
  },
  chainImage: {
    height: 16,
    width: 16,
    marginRight: 4,
    borderRadius: 40,
  },
  contractText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
  },
  contractContainer: {
    marginTop: 18,
  },
  timeContainer: {
    height: 27,
    width: 202,
    backgroundColor: '#1B1B1B',
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeCard: {
    backgroundColor: colors.white,
    height: 27,
    borderRadius: 30,
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: colors.justBlack,
    fontSize: 14,
    fontFamily: 'ClashGroteskDisplay-Medium',
  },
});
