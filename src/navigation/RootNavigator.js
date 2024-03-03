import React, {useState, useEffect} from 'react';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


// исполнитель - Executor
import ConverterScreen from '../screens/Converter/ConverterScreen';
import Loader from '../screens/include/Loader';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const stackNavigationRef = React.createRef();
  return (
    <NavigationContainer ref={stackNavigationRef}>

      <Stack.Navigator
        initialRouteName={'LobbyScreen'}
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          detachPreviousScreen: true,
          presentation: 'transparentModal',
        }}>
        <Stack.Screen
          name="ConverterScreen"
          component={ConverterScreen}
          options={({route}) => ({
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          })}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default RootNavigator;
