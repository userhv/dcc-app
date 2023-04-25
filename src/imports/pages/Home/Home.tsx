//@ts-ignore
import React  from 'react';
import { View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';


export const Home = (props: any) => {
  const {user} = props;

  return (
    <View style={homeStyle.container}>
      <HomeHeader user={user} />
      <View style={homeStyle.listContainer}>
        <View style={{flex: 1, marginTop: 24}}>
          {/* <ExampleContainer {...props} /> */}
        </View>
      </View>
    </View>
  );
};
