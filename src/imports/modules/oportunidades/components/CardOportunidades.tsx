import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Share, View, useColorScheme} from 'react-native';
import {Card, Divider, IconButton, Text, useTheme} from 'react-native-paper';
import {cardOportunidadesStyle} from './CardOportunidadesStyle';
import {theme} from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { oportunidadesOff } from '../api/oportunidadesOff';
import { Divisor } from '../../../components/Divisor/Divisor';

interface ICardOportunidades {
  oportunidade: rssParser.FeedItem;
  url: string;
  oportunidades?: rssParser.FeedItem[];
  texto?: string;
  cor?: string;
  navigation?: NativeStackNavigationProp<any>;
  removerDivider?: boolean;
  onPress?: () => void;
}

export const CardOportunidades = (props: ICardOportunidades) => {
  const {oportunidade, url, navigation, texto, cor, oportunidades, onPress, removerDivider} = props;
  const idOportunidade = oportunidade.id.substring(oportunidade.id.indexOf('=') + 1);

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardOportunidadesStyle(colors);
  const colorScheme = useColorScheme();


  const compartilharOportunidade = async () => {
    try {
      await Share.share({
        message: url
      });
    } catch (error) {
        console.warn(`Erro ao compartilhar a notícia: ${error}`)
    }
  }

  const insereOportunidadeRealm = async (oportunidade: rssParser.FeedItem) => {
        const oportunidadeArmazenada = await oportunidadesOff.findById(idOportunidade);
        if(oportunidadeArmazenada.length == 0){
          oportunidadesOff.insereOportunidade(oportunidade)
        }
  }

  return (
    <>
        <Card style={styles.container} mode='contained' testID='url'
                    onPress={ async () => { 
                      // await insereOportunidadeRealm(oportunidade);
                      navigation?.navigate('oportunidadesRoute', {
                        screen: 'OportunidadesDetail',
                        params: { screenState: 'view', id: idOportunidade }})          
        }
        }>
          {texto ? (
            <View style={styles.boxHeader}>
              <Text variant='titleLarge' style={{color: cor ?? undefined}}> {texto} </Text>
              <IconButton icon='chevron-right-circle' size={30} 
                  iconColor={cor}
                  onPress={onPress}/>
          </View>
          ): null}
        {oportunidade.media && oportunidade.media[0] ? (
            <Card.Cover source={{uri: oportunidade.media[0].url}} style={styles.imagemCover} resizeMode='center'/>
          ): null
          }
          <Card.Title
            title={oportunidade.title}
            titleVariant="titleMedium"
            subtitle={oportunidade.description}
            subtitleVariant="bodyMedium"
            titleNumberOfLines={4}
            subtitleNumberOfLines={4}
          />
          <Card.Actions>
          <View style={styles.boxActions}>
            <View style={styles.boxImagemUrl}>
              <Image source={require('../../../../img/icone_dcc.png')} style={styles.imagem} />
              <View style={{flexShrink: 1}}>
                <Text style={styles.textoUrl} numberOfLines={1} variant='labelMedium' ellipsizeMode='tail'> {url} </Text>
              </View>
            </View>
            <View style={styles.boxBotoes}>
              <IconButton
                icon={'share-variant-outline'}
                iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                style={styles.botoes}
                size={25}
                onPress={async() => await compartilharOportunidade()}
              />
            </View>
            </View>
          </Card.Actions>
        </Card>
        {!removerDivider ? (
        <Divisor />
        ): null}
    </>
  );
};
