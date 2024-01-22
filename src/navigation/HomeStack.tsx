import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketScreen from '../screens/MarketScreen';
import TokenDetailsScreen from '../screens/TokenDetailsScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MarketScreen" component={MarketScreen} />
      <Stack.Screen name="TokenDetailsScreen" component={TokenDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
