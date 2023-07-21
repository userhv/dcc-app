import {Platform, ScrollView, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';
import { INoticias } from '../sch/noticiasSch';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { noticiasSalvasStyle } from './style/noticiasSalvasStyle';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';
import { styleIOS } from '../../../paper/stylesIOS';

interface INoticiasSalvas {
    navigation: NativeStackNavigationProp<any>;
  }

export const NoticiasSalvas = (props: INoticiasSalvas) => {

    const { navigation } = props;

    const [noticias, setNoticias] = useState<INoticias[]>([]);
    const [rolagem, setRolagem] = useState<boolean>(true);

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = noticiasSalvasStyle(colors);

    useEffect(() => {
        const retornaNoticias = async () => {
           const data = await noticiasOff.retornaNoticiasSalvas();
           setNoticias(data as INoticias[]);
        };
        retornaNoticias();

    },[])

  const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Suas notícias salvas' />
      {noticias.length > 0 ? (
        <ScrollView style={{flex: 1}}
              onMomentumScrollBegin={() => setRolagem(false)}
              onMomentumScrollEnd={() => setRolagem(true)}>
          {noticias &&
            noticias.map((noticia, i) => (
              <CardNoticias
                key={i}
                noticia={noticia as unknown as rssParser.FeedItem}
                navigation={navigation}
                rolagem={rolagem}
                url={noticia.url}
              />
            ))}
        </ScrollView>
      ) : (
        <View style={styles.boxIconeVazio} accessible={true}> 
            <Icon 
                name='bookmark-off-outline'
                size={150}
                color={colors.vermelhoVivo}
            />
            <Text style={{...styles.texto}} variant='headlineSmall'> 
                    Você não tem nenhuma notícia salva.
            </Text>
        </View>

      )}
    </View>
  );
};