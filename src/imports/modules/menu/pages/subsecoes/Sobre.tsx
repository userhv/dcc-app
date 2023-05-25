import {ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';

import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { subSecoesStyle } from './SubSecoesStyle';
import { theme } from '../../../../paper/theme';
import { CardSecaoInterno } from '../../components/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';

interface ISobre {
    navigation?: NativeStackNavigationProp<any>;
  }

export const Sobre = (props: ISobre) => {

    const { navigation } = props;


  return (
    
    <View style={subSecoesStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
      <View style={subSecoesStyle.containerTop}>
      <Icon
          name="arrow-left"
          size={25}
          color={theme.colors.azul}
          onPress={() => navigation?.goBack()}
        />
        <View style={subSecoesStyle.descricao} accessible={true}>
          <Text variant="headlineSmall"> Sobre o aplicativo</Text>
        </View>
      </View>
        <CardSecaoInterno titulo='Termos de uso' />
        <CardSecaoInterno titulo='Política de privacidade'/>
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()}/>

    </View>
  );
};