import React, { useEffect, useState} from 'react';
import { ScrollView, View} from 'react-native';
import {Button, Divider, FAB, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {noticiasListRNStyle} from './style/noticiasListRNStyle';
import {CardNoticias} from '../components/CardNoticias';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../../paper/theme';

import * as rssParser from 'react-native-rss-parser';

import { EnumMediator } from '../../../mediator/EnumMediator';
import { mediator } from '../../../mediator/mediator';

interface INoticiasList {
  navigation: NativeStackNavigationProp<any>;
}

export const NoticiasList = (props: INoticiasList) => {
  const {navigation} = props;

  const [noticias, setNoticias] = useState<rssParser.FeedItem[]>();


  useEffect(() => {
    const rssNoticias = async () => {
      const data:rssParser.FeedItem[] | undefined = await mediator.selecionaRequesicao(EnumMediator.NOTICIAS);
      data && setNoticias(data);
    }
    rssNoticias();
  },[])

  return (
    <View style={noticiasListRNStyle.container}>
      <View style={noticiasListRNStyle.containerTop}>
          <View style={noticiasListRNStyle.descricao}>
            <Text variant="headlineSmall"> Últimas notícias do DCC</Text>
          </View>
          <Icon
            name="bookmarks"
            size={25}
            style={noticiasListRNStyle.icon}
            color={theme.colors.azul}
            onPress={() => {}}
          />
      </View>
      <Divider style={noticiasListRNStyle.divisor}/>
      <ScrollView style={{flex: 1}}>
        {noticias &&
          noticias.map((e, i) => (
            <CardNoticias
              key={i}
              noticia={e}
              navigation={navigation}
              url={e.links[0].url}
            />
          ))}
      </ScrollView>
    </View>
  );
};
