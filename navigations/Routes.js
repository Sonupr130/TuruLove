import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import Splash from '../screens/Splash';
import ShareCard from '../components/ShareCard';
// import LoveCardScreen from '../screens/LoveCardScreen';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        {/* <Stack.Screen name='ShareCard' component={ShareCard}/> */}
        {/* <Stack.Screen name="LoveCard" component={LoveCardScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
