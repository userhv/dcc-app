import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Linking, TouchableWithoutFeedback} from 'react-native';
import {Card, Divider, IconButton} from 'react-native-paper';
import {cardNoticiasStyle} from './CardNoticiasStyle';
import {theme} from '../../../paper/theme';

interface ICardNoticias {
  noticia: {[key: string]: any};
  url: string;
}

export const CardNoticias = (props: ICardNoticias) => {
  const {noticia, url} = props;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Linking.openURL(url)} testID='url'>
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
