import {Animated, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';
import {noticiasSalvasRNStyle} from './style/noticiasSalvasStyle';
import { INoticias } from '../sch/noticiasSch';
import { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';

interface INoticiasSalvas {
    navigation?: NativeStackNavigationProp<any>;
  }

export const NoticiasSalvas = (props: INoticiasSalvas) => {

    const { navigation } = props;

    const [noticias, setNoticias] = useState<INoticias[]>([]);

    const offset = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const retornaNoticias = async () => {
           const data = await noticiasOff.retornaNoticiasSalvas();
           setNoticias(data as INoticias[]);
        };
        retornaNoticias();

    },[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={"Suas notícias salvas"}/>
      {noticias.length > 0 ? (
        <ScrollView style={{flex: 1}}  
            onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )} scrollEventThrottle={16}>
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
        <View style={noticiasSalvasRNStyle.boxIconeVazio} accessible={true}> 
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
    </SafeAreaView>
  );
};
