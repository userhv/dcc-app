//@ts-ignore
import React  from 'react';
import { View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { Divider } from 'react-native-paper';


export const Home = (props: any) => {
  const {user} = props;

  return (
    <View style={homeStyle.container}>
      <HomeHeader user={user} />
      <Divider style={homeStyle.divisor}/>
      <View style={homeStyle.blocoInterno}>
      </View>
    </View>
  );
};
