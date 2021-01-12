import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StudentScreen from '../screens/StudentScreen';
import TeacherScreen from '../screens/TeahcerScreen';

export const AppTabNavigator = createBottomTabNavigator({
  TeacherScreen : {
    screen: TeacherScreen,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Teacher Screen",
    }
  },
  StudentRequest: {
    screen: StudentScreen,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ads-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "Student Screen",
    }
  }
});
