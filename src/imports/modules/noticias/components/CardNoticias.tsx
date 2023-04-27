import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Share, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Divider, IconButton, Text} from 'react-native-paper';
import {cardNoticiasStyle} from './CardNoticiasStyle';
import {theme} from '../../../paper/theme';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { useContext, useEffect, useState } from 'react';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import { INoticias } from '../sch/noticiasSch';

interface ICardNoticias {
  noticia: rssParser.FeedItem;
  url: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const CardNoticias = (props: ICardNoticias) => {
  const {noticia, url, navigation} = props;

  const [noticiaSalva, setNoticiaSalva] = useState<boolean>(false);
  const [noticiaParaSerTratada, setNoticiaParaSerTratada] = useState<INoticias | undefined>(undefined);

  const { showModal } = useContext(
    GeneralComponentsContext
    ) as IGeneralComponentsContext;
      
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

  const abreWebViewNoticia = () => {
		showModal({
			renderedComponent: (_props: any) => (
				<WebViewRN url={url} handleClose={_props.onDismiss}/>
			)
		});
    
  }

  return (
    <>
      <TouchableWithoutFeedback testID='url' onPress={() => {abreWebViewNoticia()}}>
        <Card style={cardNoticiasStyle.container} mode="contained">
          <Card.Title
            title={noticia.title}
            titleVariant="titleMedium"
            titleStyle={cardNoticiasStyle.titulo}
            subtitle={noticia.description}
            subtitleStyle={cardNoticiasStyle.subtitulo}
            subtitleVariant="bodyMedium"
            titleNumberOfLines={4}
            subtitleNumberOfLines={4}
          />
          <Card.Actions>
            <View style={cardNoticiasStyle.boxImagemUrl}>
              <Image source={require('../../../../img/icone_dcc.png')} style={cardNoticiasStyle.imagem} />
              <Text style={cardNoticiasStyle.textoUrl} numberOfLines={1} variant='labelMedium'> {url} </Text>
            </View>
            <IconButton
              icon={noticiaSalva ? 'bookmark' :'bookmark-outline'}
              iconColor={theme.colors.azul}
              style={cardNoticiasStyle.botoes}
              size={25}
              onPress={async() => await salvarOuRemoverNoticia()}
            />
            <IconButton
              icon={'share-variant-outline'}
              iconColor={theme.colors.azul}
              style={cardNoticiasStyle.botoes}
              size={25}
              onPress={async() => await compartilharNoticia()}
            />
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
      <Divider style={cardNoticiasStyle.divisor} />
    </>
  );
};
