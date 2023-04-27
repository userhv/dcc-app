import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Divider, IconButton, Text} from 'react-native-paper';
import {cardNoticiasStyle} from './CardNoticiasStyle';
import {theme} from '../../../paper/theme';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { useContext } from 'react';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';

interface ICardNoticias {
  noticia: {[key: string]: any};
  url: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const CardNoticias = (props: ICardNoticias) => {
  const {noticia, url, navigation} = props;
  const { showModal } = useContext(
    GeneralComponentsContext
    ) as IGeneralComponentsContext;
    
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
              icon={'bookmark-outline'}
              iconColor={theme.colors.azul}
              style={cardNoticiasStyle.botoes}
              size={25}
              onPress={() => {}}
            />
            <IconButton
              icon={'share-variant-outline'}
              iconColor={theme.colors.azul}
              style={cardNoticiasStyle.botoes}
              size={25}
              onPress={() => {}}
            />
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
      <Divider style={cardNoticiasStyle.divisor} />
    </>
  );
};
