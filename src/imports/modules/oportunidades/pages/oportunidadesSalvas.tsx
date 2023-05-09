import {ScrollView, StatusBar, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {theme} from '../../../paper/theme';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { oportunidadesSalvasRNStyle } from './style/oportunidadesSalvasStyle';

interface IOportunidadesSalvas {
    navigation?: NativeStackNavigationProp<any>;
  }

export const OportunidadesSalvas = (props: IOportunidadesSalvas) => {
  
      const { navigation } = props;
  
  
  return (
    <View style={oportunidadesSalvasRNStyle.container}>

    </View>
  );
};
