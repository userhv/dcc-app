import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Share, View} from 'react-native';
import {Card, Divider, IconButton, Text} from 'react-native-paper';
import { theme } from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { memo, useContext, useEffect, useState } from 'react';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { cardProfessoresStyle } from './style/CardProfessoresStyle';

interface ICardProfessores {
    professor: rssParser.FeedItem;
    navigation?: NativeStackNavigationProp<any>;
}


const CardProfessores = (props: ICardProfessores) => {

    const { navigation, professor } = props;

    const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

    const [areas, setAreas] = useState<string[]>([]);

    const abreWebViewProfessor = () => {
		showModal({
      isFullScreen: true,
			renderedComponent: (_props: any) => (
				<WebViewRN url={professor.links[0].url} handleClose={_props.onDismiss}/>
			)
		});
  }

  const compartilharPerfilProfessor = async () => {
    try {
      await Share.share({
        message: professor.links[0].url
      });
    } catch (error) {
        console.warn(`Erro ao compartilhar a notícia: ${error}`)
    }
  }

useEffect(() => {
    let areas: string[] = [];
    professor.categories.forEach((area, i) => {
       if (area && area?.name !== 'Ativo')
            areas.push(area.name)
    })
    setAreas(areas);

},[professor])

    return (
        <>
      <Card style={cardProfessoresStyle.container} mode='contained'
                onPress={() => {abreWebViewProfessor()}}>
        <Card.Title
          title={professor.title}
          titleVariant="titleMedium"
          titleStyle={cardProfessoresStyle.titulo}
          subtitle={professor.description}
          subtitleStyle={cardProfessoresStyle.subtitulo}
          subtitleVariant="bodyMedium"
          titleNumberOfLines={4}
          subtitleNumberOfLines={4}
        />
        {areas.length > 0 ? (
            <View style={cardProfessoresStyle.containerArea}>
                {areas.map((area, i) => (
                <View style={cardProfessoresStyle.chipArea} key={i}>
                        <Text style={cardProfessoresStyle.textoChip} variant='bodyMedium'> {area} </Text>
                </View>
                ))}
            </View>
        ): null}
        <Card.Actions>
          <View style={cardProfessoresStyle.boxActions}>
            <IconButton
              accessible={true}
              accessibilityLabel='Toque para compartilhar a notícia'
              accessibilityRole='button'
              icon={'share-variant-outline'}
              iconColor={theme.colors.azul}
              style={cardProfessoresStyle.botoes}
              size={25}
              onPress={async() => await compartilharPerfilProfessor()}
              />
          </View>
        </Card.Actions>
      </Card>
    <Divider style={cardProfessoresStyle.divisor} />
    </>
    );
};

const arePropsEqual = (prevProps: ICardProfessores, nextProps: ICardProfessores) => {
  return prevProps.professor.title === nextProps.professor.title; 
}


export default memo(CardProfessores, arePropsEqual);
