//@ts-ignore
import React  from 'react';
import { StatusBar, View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { theme } from '../../paper/theme';
import { Linking } from 'react-native';
import qs from 'qs';

export const Home = (props: any) => {
  const {user} = props;

  const [text, setText] = React.useState("");

  const enviarEmail = async () => {

    let url = `mailto:dcc.ufmg@gmail.com`;

    const query = qs.stringify({
      subject: "Feedback do aplicativo",
      body: text,
  });

  
    if (query.length) {
      url += `?${query}`;
    }

  return Linking.openURL(url);

  }


  return (
    <View style={homeStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco}  barStyle={'dark-content'}/>
      <HomeHeader  />
      <Divider style={homeStyle.divisor}/>
      <View style={homeStyle.blocoInterno}>

        <View style={homeStyle.form}>
          <View style={homeStyle.labelForm}>
            <Text variant='labelLarge'> Envie seu feedback do que pode ser melhorado </Text>
          </View>
        <TextInput
            value={text}
            onChangeText={text => setText(text)}
            multiline
            mode='outlined'
            selectionColor={theme.colors.azul}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            activeOutlineColor={theme.colors.azul}
            numberOfLines={10}
            textColor={theme.colors.preto}
            contentStyle={{borderRadius: 8, padding: 5}}
        />
        <View style={{paddingTop: 10,flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            mode='contained'
            icon='send'
            buttonColor={theme.colors.azul}
            onPress={async() => await enviarEmail()}>
            Enviar feedback
          </Button>
        </View>
        </View>
      </View>
    </View>
  );
};
