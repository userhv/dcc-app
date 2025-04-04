import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Pressable, Share, View, useColorScheme} from 'react-native';
import {Card, IconButton, Text, useTheme} from 'react-native-paper';
import {cardNoticiasStyle} from './style/CardNoticiasStyle';
import { useEffect, useState } from 'react';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import { INoticias } from '../sch/noticiasSch';
import { Divisor } from '../../../components/Divisor/Divisor';

interface ICardNoticias {
  noticia: rssParser.FeedItem;
  url: string;
  rolagem: boolean;
  navigation: NativeStackNavigationProp<any> | null;
}

export const CardNoticias = (props: ICardNoticias) => {
  const {noticia, url, navigation, rolagem} = props;

  const [noticiaSalva, setNoticiaSalva] = useState<boolean>(false);
  const [noticiaParaSerTratada, setNoticiaParaSerTratada] = useState<INoticias | undefined>(undefined);

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardNoticiasStyle(colors);
  const colorScheme = useColorScheme();
    
  useEffect(() => {
    const noticiaEstaSalva = async () => {
      const data = await noticiasOff.find("url == $0", url);
      if(data.length > 0){
        setNoticiaParaSerTratada(data[0]);
        setNoticiaSalva(true);
      } 
      else setNoticiaSalva(false);
    }
    noticiaEstaSalva();

  }, [noticia]);

  const compartilharNoticia = async () => {
    try {
      await Share.share({
        message: url
      });
    } catch (error) {
        console.warn(`Erro ao compartilhar a notícia: ${error}`)
    }
  }

  const salvarOuRemoverNoticia = async () => {
    if(noticiaSalva){
      await noticiasOff.removeNoticia(noticiaParaSerTratada);
      setNoticiaSalva(false);
    }else{
      await noticiasOff.insereNoticia(noticia);
      setNoticiaSalva(true);
    }
  }

  return (
    <>
        <Pressable  onPress={() => 	navigation?.navigate('Root', {
                screen: 'WebView', params: {
                  url: url
                }})}
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent } : {},]}
            disabled={!rolagem}>
        <Card style={styles.container} mode="contained" testID='url' accessible={true} accessibilityLabel='Toque para ler a notícia'>
          {noticia.media[0] ? (
            <Card.Cover source={{uri: noticia.media[0].url}} style={styles.imagemCover}/>
          ): null
          }
          <Card.Title
            title={noticia.title}
            titleVariant="titleMedium"
            subtitle={noticia.description}
            subtitleVariant="bodyMedium"
            subtitleStyle={styles.subtitulo}
            titleNumberOfLines={4}
            subtitleNumberOfLines={4}
          />
          <Card.Actions>
            <View style={styles.boxActions}>
              <View style={styles.boxImagemUrl}>
                <Image source={colorScheme === 'dark' ? require('../../../../img/icone_dcc_branco.png') : require('../../../../img/icone_dcc_light.png')} style={styles.imagem} />
                <View style={{flexShrink: 1}}>
                  <Text style={styles.textoUrl} 
                    numberOfLines={1} variant='labelMedium' ellipsizeMode='tail'> {url} </Text>
                  </View>
              </View>
            <View style={styles.boxBotoes}>
              <IconButton
                accessible={true}
                accessibilityLabel='Toque uma vez para salvar a notícia, toque duas vezes para remover a notícia salva'
                accessibilityRole='button'
                icon={noticiaSalva ? 'bookmark-remove' :'bookmark-outline'}
                iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                style={styles.botoes}
                size={28}
                onPress={async() => await salvarOuRemoverNoticia()}
                />
              <IconButton
                accessible={true}
                accessibilityLabel='Toque para compartilhar a notícia'
                accessibilityRole='button'
                icon={'share-variant-outline'}
                iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                style={styles.botoes}
                size={28}
                onPress={async() => await compartilharNoticia()}
                />
            </View>
            </View>
          </Card.Actions>
        </Card>
      </Pressable>
      <Divisor/>
    </>
  );
};
