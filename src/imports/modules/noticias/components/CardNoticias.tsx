import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Pressable, Share, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {cardNoticiasStyle} from './style/CardNoticiasStyle';
import {theme} from '../../../paper/theme';
import { useContext, useEffect, useState } from 'react';
import { noticiasOff } from '../api/noticiasOff';
import * as rssParser from 'react-native-rss-parser';
import { INoticias } from '../sch/noticiasSch';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
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
      

  const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

  
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
      isFullScreen: true,
			renderedComponent: (_props: any) => (
				<WebViewRN url={url} handleClose={_props.onDismiss} navigation={navigation ?? null}/>
			)
		});

  }

  return (
    <>
        <Pressable onPress={() => 	abreWebViewNoticia()} 
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: theme.colors.azul } : {},]}
            disabled={!rolagem}>
        <Card style={cardNoticiasStyle.container} mode="contained" testID='url' accessible={true} accessibilityLabel='Toque para ler a notícia'>
          {noticia.media[0] ? (
            <Card.Cover source={{uri: noticia.media[0].url}} style={cardNoticiasStyle.imagemCover}/>
          ): null
          }
          <Card.Title
            title={noticia.title}
            titleVariant="titleMedium"
            subtitle={noticia.description}
            subtitleStyle={cardNoticiasStyle.subtitulo}
            subtitleVariant="bodyMedium"
            titleNumberOfLines={4}
            subtitleNumberOfLines={4}
          />
          <Card.Actions>
            <View style={cardNoticiasStyle.boxActions}>
              <View style={cardNoticiasStyle.boxImagemUrl}>
                <Image source={require('../../../../img/icone_dcc.png')} style={cardNoticiasStyle.imagem} />
                <View style={{flexShrink: 1}}>
                  <Text style={cardNoticiasStyle.textoUrl} numberOfLines={1} variant='labelMedium' ellipsizeMode='tail'> {url} </Text>
                  </View>
              </View>
            <View style={cardNoticiasStyle.boxBotoes}>
              <IconButton
                accessible={true}
                accessibilityLabel='Toque uma vez para salvar a notícia, toque duas vezes para remover a notícia salva'
                accessibilityRole='button'
                icon={noticiaSalva ? 'bookmark-remove' :'bookmark-outline'}
                iconColor={theme.colors.azul}
                style={cardNoticiasStyle.botoes}
                size={25}
                onPress={async() => await salvarOuRemoverNoticia()}
                />
              <IconButton
                accessible={true}
                accessibilityLabel='Toque para compartilhar a notícia'
                accessibilityRole='button'
                icon={'share-variant-outline'}
                iconColor={theme.colors.azul}
                style={cardNoticiasStyle.botoes}
                size={25}
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
