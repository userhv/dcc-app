import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, Share, View} from 'react-native';
import {Button, Card, Divider, IconButton, Text} from 'react-native-paper';
import { theme } from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { memo, useContext, useEffect, useState } from 'react';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { cardProfessoresStyle } from './style/CardProfessoresStyle';
import React from 'react';
import { Linking } from 'react-native';

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

  const enviarEmail = () => {
    let url = `mailto:dcc.ufmg@gmail.com`;
    return Linking.openURL(url);
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
        <Pressable onPress={abreWebViewProfessor} 
            style={({ pressed }) => [pressed ? { opacity: 0.8, backgroundColor: theme.colors.azul } : {},]}>
        <Card style={cardProfessoresStyle.container} mode='contained'  >
          <Card.Title
            title={professor.title}
            titleVariant="headlineSmall"
            subtitle={professor.description}
            subtitleVariant="bodyMedium"
            titleNumberOfLines={3}
            subtitleNumberOfLines={4}
          />
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Card.Cover source={ require('../../../../img/avatar.png')} style={cardProfessoresStyle.imagemCover} />
              <View style={{flex: 1, flexDirection: 'column'}}>
                {areas.length > 0 ? (
                    <View style={cardProfessoresStyle.containerArea}>
                        <Text variant='labelMedium'> {areas.length > 1 ? 'Áreas de pesquisa' : 'Área de pesquisa'} </Text>
                        <View style={cardProfessoresStyle.boxArea}>
                          {areas.map((area, i) => (
                            <View style={cardProfessoresStyle.chipArea} key={i}>
                                  <Text style={cardProfessoresStyle.textoChip} variant='bodyMedium'> {area} </Text>
                            </View>
                          ))}
                        </View>
                    </View>
                ): null}
              </View>
            </View>
          <Card.Actions>
            <View style={cardProfessoresStyle.boxActions}>
              <View style={cardProfessoresStyle.boxIconeEmail}> 
                <Button 
                  mode='contained'
                  icon='email-outline'
                  buttonColor={theme.colors.azul}
                  onPress={() => enviarEmail()}>
                    Entrar em contato
                </Button>
              </View>
              <View style={cardProfessoresStyle.boxBotaoCompartilhar}>
                <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para compartilhar a notícia'
                  accessibilityRole='button'
                  icon='share-variant-outline'
                  iconColor={theme.colors.azul}
                  style={cardProfessoresStyle.botoes}
                  size={25}
                  onPress={async() => await compartilharPerfilProfessor()}
                  />
              </View>
            </View>
          </Card.Actions>
        </Card>
      <Divider style={cardProfessoresStyle.divisor} />
      </Pressable>
    </>
    );
};

const arePropsEqual = (prevProps: ICardProfessores, nextProps: ICardProfessores) => {
  return prevProps.professor.title !== nextProps.professor.title; 
}


export default memo(CardProfessores, arePropsEqual);
