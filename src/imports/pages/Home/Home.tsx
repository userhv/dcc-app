//@ts-ignore
import React  from 'react';
import { StatusBar, View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { Divider, Text } from 'react-native-paper';
import { theme } from '../../paper/theme';


export const Home = (props: any) => {
  const {user} = props;


  return (
    <View style={homeStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco}  barStyle={'dark-content'}/>
      <HomeHeader  />
      <Divider style={homeStyle.divisor}/>
      <View style={homeStyle.blocoInterno}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.azulOpacoMenuOportunidades }}>
					<Text variant='titleSmall' style={{color: theme.colors.azul}}> PREVIEW</Text>
				</View>
      </View>
    </View>
  );
};
