import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import TeacherScreen from '../screens/TeacherScreen';
import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  ServiceList : {
    screen : TeacherScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'ServiceList'
  }
);
