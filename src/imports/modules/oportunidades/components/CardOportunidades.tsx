import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Share, View} from 'react-native';
import {Card, Divider, IconButton, Text} from 'react-native-paper';
import {cardOportunidadesStyle} from './CardOportunidadesStyle';
import {theme} from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { oportunidadesOff } from '../api/oportunidadesOff';
import { oportunidadesListRNStyle } from '../pages/style/oportunidadesListRNStyle';

interface ICardOportunidades {
  oportunidade: rssParser.FeedItem;
  url: string;
  texto: string;
  cor: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const CardOportunidades = (props: ICardOportunidades) => {
  const {oportunidade, url, navigation, texto, cor} = props;
  const idOportunidade = oportunidade.id.substring(oportunidade.id.indexOf('=') + 1);


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
        <Card style={cardOportunidadesStyle.container} mode="elevated" testID='url' elevation={1}
                    onPress={ async () => { 
                      await insereOportunidadeRealm(oportunidade);
                      navigation?.navigate('oportunidadesRoute', {
                        screen: 'OportunidadesDetail',
                        params: { screenState: 'view', id: idOportunidade }})          
        }
          
        }>
        <View style={oportunidadesListRNStyle.boxHeader}>
          <Text variant='titleLarge' style={{color: cor}}> {texto} </Text>
          <IconButton icon='arrow-right-circle' size={30} 
              iconColor={cor}
              onPress={() => {}}/>
       </View>
        {oportunidade.media[0] ? (
            <Card.Cover source={{uri: oportunidade.media[0].url}} style={cardOportunidadesStyle.imagemCover} resizeMode='center'/>
          ): null
          }
          <Card.Title
            title={oportunidade.title}
            titleVariant="titleMedium"
            titleStyle={cardOportunidadesStyle.titulo}
            subtitle={oportunidade.description}
            subtitleStyle={cardOportunidadesStyle.subtitulo}
            subtitleVariant="bodyMedium"
            titleNumberOfLines={4}
            subtitleNumberOfLines={4}
          />
          <Card.Actions>
          <View style={cardOportunidadesStyle.boxActions}>
            <View style={cardOportunidadesStyle.boxImagemUrl}>
              <Image source={require('../../../../img/icone_dcc.png')} style={cardOportunidadesStyle.imagem} />
              <View style={{flexShrink: 1}}>
                <Text style={cardOportunidadesStyle.textoUrl} numberOfLines={1} variant='labelMedium' ellipsizeMode='tail'> {url} </Text>
              </View>
            </View>
            <View style={cardOportunidadesStyle.boxBotoes}>
              <IconButton
                icon={'share-variant-outline'}
                iconColor={theme.colors.azul}
                style={cardOportunidadesStyle.botoes}
                size={25}
                onPress={async() => await compartilharOportunidade()}
              />
            </View>
            </View>
          </Card.Actions>
        </Card>
      <Divider style={cardOportunidadesStyle.divisor} />
    </>
  );
};
