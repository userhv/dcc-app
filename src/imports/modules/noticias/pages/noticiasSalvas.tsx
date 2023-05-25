import {ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';

import { INoticias } from '../sch/noticiasSch';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { noticiasSalvasStyle } from './style/noticiasSalvasStyle';

interface INoticiasSalvas {
    navigation?: NativeStackNavigationProp<any>;
  }

export const NoticiasSalvas = (props: INoticiasSalvas) => {

    const { navigation } = props;

    const [noticias, setNoticias] = useState<INoticias[]>([]);


    useEffect(() => {
        const retornaNoticias = async () => {
           const data = await noticiasOff.retornaNoticiasSalvas();
           setNoticias(data as INoticias[]);
        };
        retornaNoticias();

    },[])

  return (
    <View style={noticiasSalvasStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
      <View style={noticiasSalvasStyle.containerTop}>
      <Icon
          name="arrow-left"
          size={25}
          color={theme.colors.azul}
          onPress={() => navigation?.goBack()}
        />
        <View style={noticiasSalvasStyle.descricao} accessible={true}>
          <Text variant="headlineSmall"> Suas notícias salvas</Text>
        </View>

      </View>
      {noticias.length > 0 ? (
        <ScrollView style={{flex: 1}}>
          {noticias &&
            noticias.map((noticia, i) => (
              <CardNoticias
                key={i}
                noticia={noticia as unknown as rssParser.FeedItem}
                navigation={navigation}
                url={noticia.url}
              />
            ))}
        </ScrollView>
      ) : (
        <View style={noticiasSalvasStyle.boxIconeVazio} accessible={true}> 
            <Icon 
                name='bookmark-off-outline'
                size={150}
                color={theme.colors.vermelhoVivo}
            />
            <Text style={noticiasSalvasStyle.texto} variant='headlineSmall'> 
                    Você não tem nenhuma notícia salva.
            </Text>
        </View>

      )}
    </View>
  );
};