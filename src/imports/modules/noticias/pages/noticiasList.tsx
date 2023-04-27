import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {noticiasListRNStyle} from './style/noticiasListRNStyle';
import {CardNoticias} from '../components/CardNoticias';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../../paper/theme';
import {EnumMediator} from '../../../mediator/EnumMediator';
import {mediator} from '../../../mediator/mediator';
import {Loading} from '../../../components/Loading/Loading';
import {useFocusEffect} from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';

interface INoticiasList {
  navigation?: NativeStackNavigationProp<any>;
}

export const NoticiasList = (props: INoticiasList) => {
  const {navigation} = props;

  const [noticias, setNoticias] = useState<rssParser.FeedItem[]>([]);

  const rssNoticias = async () => {
    const data: rssParser.FeedItem[] | undefined =
      await mediator.selecionaRequesicao(EnumMediator.NOTICIAS);
    data && setNoticias(data);
  };

  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => rssNoticias();
      _rsssNoticias();
    }, []),
  );

  return (
    <View style={noticiasListRNStyle.container}>
      <View style={noticiasListRNStyle.containerTop}>
        <View style={noticiasListRNStyle.descricao}>
          <Text variant="headlineSmall"> Últimas notícias do DCC</Text>
        </View>
        <Icon
          name="bookmarks"
          size={25}
          style={noticiasListRNStyle.icone}
          color={theme.colors.azul}
          onPress={() => {}}
        />
      </View>
      <Divider style={noticiasListRNStyle.divisor} />

      {noticias.length > 0 ? (
        <ScrollView style={{flex: 1}}>
          {noticias &&
            noticias.map((noticia, i) => (
              <CardNoticias
                key={i}
                noticia={noticia}
                navigation={navigation}
                url={noticia.links[0].url}
              />
            ))}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};
