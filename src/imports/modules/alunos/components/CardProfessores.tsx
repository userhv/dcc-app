import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, Share, View, useColorScheme} from 'react-native';
import {Button, Card, IconButton, Text, useTheme} from 'react-native-paper';
import * as rssParser from 'react-native-rss-parser';
import { memo, useEffect, useState } from 'react';
import { cardProfessoresStyle } from './style/CardProfessoresStyle';
import React from 'react';
import { Linking } from 'react-native';
import { Divisor } from '../../../components/Divisor/Divisor';
import { rolesAreasIgnoradas } from '../config/EnumAreasIgnoradas';

interface ICardProfessores {
    professor: rssParser.FeedItem;
    foto: string;
    navigation: NativeStackNavigationProp<any>;
}

const CardProfessores = (props: ICardProfessores) => {

  const { navigation, professor, foto } = props;

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardProfessoresStyle(colors);

  const colorScheme = useColorScheme();

  const [areas, setAreas] = useState<string[]>([]);
  const [isVoluntario, setIsVoluntario] = useState<boolean>(false);

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
        if(area && area.name === 'Voluntário') setIsVoluntario(true);
        if (area && area?.name !== rolesAreasIgnoradas[area?.name])
              areas.push(area.name)
      })
      setAreas(areas);

  },[professor])

    return (
      <>
        <Card style={styles.container} mode='contained'>
            <Card.Title
              title={professor.title}
              titleVariant="headlineSmall"
              titleNumberOfLines={3}
            />
            {isVoluntario ?
            (<View style={{...styles.boxArea, paddingLeft: 10,  paddingBottom: 10}}>
                <View style={{ ...styles.chipArea, backgroundColor:  colors.accentClaro}}>
                      <Text style={{...styles.textoChip, color: colors.branco}} variant='bodyMedium'> Professor(a) voluntário(a) </Text>
                </View>
            </View>): null}
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Card.Cover source={ {uri:foto} ?? require('../../../../img/avatar.png') } style={styles.imagemCover}/>
              <View style={{flex: 1, flexDirection: 'column'}}>
                {areas.length > 0 ? (
                    <View style={styles.containerArea}>
                        <Text variant='labelMedium'> {areas.length > 1 ? 'Áreas de pesquisa' : 'Área de pesquisa'} </Text>
                        <View style={styles.boxArea}>
                          {areas.map((area, i) => (
                            <View style={{...styles.chipArea, backgroundColor: colorScheme === 'dark' ? colors.cinza30 : colors.quaseBranco}} key={i}>
                                  <Text style={{...styles.textoChip, color: colorScheme === 'dark' ? colors.cinza90 : colors.preto}} variant='bodyMedium'> {area} </Text>
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
                  buttonColor={colors.accent}
                  onPress={() => enviarEmail()}>
                    Contato
                </Button> */}
              </View>
              <View style={styles.boxBotaoCompartilhar}>
                <IconButton
                    accessible={true}
                    accessibilityLabel='Toque para abrir a página'
                    accessibilityRole='button'
                    icon='launch'
                    iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                    style={styles.botoes}
                    size={28}
                    onPress={() => 	navigation?.navigate('Root', {
                      screen: 'WebView', params: {
                      url: professor.links[0].url
                    }})}
                    />
                  <IconButton
                    accessible={true}
                    accessibilityLabel='Toque para compartilhar a notícia'
                    accessibilityRole='button'
                    icon='share-variant-outline'
                    iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                    style={styles.botoes}
                    size={28}
                    onPress={async() => await compartilharPerfilProfessor()}
                    />
              </View>
            </View>
          </Card.Actions>
        </Card>
        <Divisor/>
    </>
    );
};

const arePropsEqual = (prevProps: ICardProfessores, nextProps: ICardProfessores) => {
  return prevProps.professor.title !== nextProps.professor.title; 
}


export default memo(CardProfessores, arePropsEqual);
