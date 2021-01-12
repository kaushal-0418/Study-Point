import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
//import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
//import MyReceivedServiceScreen from '../screens/MyReceivedServiceScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
 // MyDonations : {
    //screen : MyDonationScreen
  //},
  Notification : {
    screen : NotificationScreen
  },
  //MyReceivedService :{
    //screen: MyReceivedServiceScreen
  //},
  Setting : {
    screen : SettingScreen
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
