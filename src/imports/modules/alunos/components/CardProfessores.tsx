import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, Share, View, useColorScheme} from 'react-native';
import {Card, IconButton, Text, useTheme} from 'react-native-paper';
import { theme } from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { memo, useContext, useEffect, useState } from 'react';
import { cardProfessoresStyle } from './style/CardProfessoresStyle';
import React from 'react';
import { Linking } from 'react-native';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { Divisor } from '../../../components/Divisor/Divisor';

interface ICardProfessores {
    professor: rssParser.FeedItem;
    navigation: NativeStackNavigationProp<any>;
}

const CardProfessores = (props: ICardProfessores) => {

  const { navigation, professor } = props;

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardProfessoresStyle(colors);

  const colorScheme = useColorScheme();

  const [areas, setAreas] = useState<string[]>([]);

  const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

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

  const abreWebViewProfessor = () => {
    showModal({
      isFullScreen: true,
      renderedComponent: (_props: any) => (
        <WebViewRN url={professor.links[0].url} handleClose={_props.onDismiss} navigation={navigation}/>
      )
      });
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
        <Pressable  onPress={abreWebViewProfessor} 
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent } : {},]}>
        <Card style={styles.container} mode='contained'>
            <Card.Title
              title={professor.title}
              titleVariant="headlineSmall"
              titleStyle={{color: colorScheme === 'dark' ? colors.cinza90: null}}
              titleNumberOfLines={3}
            />
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Card.Cover source={ require('../../../../img/avatar.png')} style={styles.imagemCover} />
              <View style={{flex: 1, flexDirection: 'column'}}>
                {areas.length > 0 ? (
                    <View style={styles.containerArea}>
                        <Text variant='labelMedium' style={{color: colorScheme === 'dark' ? colors.cinza80 : null}}> {areas.length > 1 ? 'Áreas de pesquisa' : 'Área de pesquisa'} </Text>
                        <View style={styles.boxArea}>
                          {areas.map((area, i) => (
                            <View style={{...styles.chipArea, backgroundColor: colorScheme === 'dark' ? colors.accentOpacoDark : colors.accentOpaco}} key={i}>
                                  <Text style={{...styles.textoChip, color: colorScheme === 'dark' ? colors.cinza90 : colors.accent}} variant='bodyMedium'> {area} </Text>
                            </View>
                          ))}
                        </View>
                    </View>
                ): null}
              </View>
            </View>
          <Card.Actions>
            <View style={styles.boxActions}>
              <View style={styles.boxIconeEmail}> 
                {/* <Button 
                  mode='contained'
                  icon='email-outline'
                  buttonColor={colors.azul}
                  onPress={() => enviarEmail()}>
                    Contato
                </Button> */}
              </View>
              <View style={styles.boxBotaoCompartilhar}>
                <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para compartilhar a notícia'
                  accessibilityRole='button'
                  icon='share-variant-outline'
                  iconColor={colors.accent}
                  style={styles.botoes}
                  size={28}
                  onPress={async() => await compartilharPerfilProfessor()}
                  />
              </View>
            </View>
          </Card.Actions>
        </Card>
        <Divisor/>
      </Pressable>
    </>
    );
};

const arePropsEqual = (prevProps: ICardProfessores, nextProps: ICardProfessores) => {
  return prevProps.professor.title !== nextProps.professor.title; 
}


export default memo(CardProfessores, arePropsEqual);
