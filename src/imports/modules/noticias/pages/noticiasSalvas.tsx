import {ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';
import {noticiasSalvasRNStyle} from './style/noticiasSalvasStyle';
import { INoticias } from '../sch/noticiasSch';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <View style={noticiasSalvasRNStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
      <View style={noticiasSalvasRNStyle.containerTop}>
      <Icon
          name="arrow-left"
          size={25}
          color={theme.colors.azul}
          onPress={() => navigation?.goBack()}
        />
        <View style={noticiasSalvasRNStyle.descricao}>
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
        <View style={noticiasSalvasRNStyle.boxIconeVazio}> 
            <Icon 
                name='bookmark-off-outline'
                size={150}
                color={theme.colors.vermelhoVivo}
            />
            <Text style={noticiasSalvasRNStyle.texto} variant='headlineSmall'> 
                    Você não tem nenhuma notícia salva.
            </Text>
        </View>

      )}
    </View>
  );
};
