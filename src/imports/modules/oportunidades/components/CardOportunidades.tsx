import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Dimensions,  Pressable,  Share, View, useColorScheme, Image} from 'react-native';
import { IconButton, Text, useTheme, Button} from 'react-native-paper';
import {cardOportunidadesStyle} from './CardOportunidadesStyle';
import * as rssParser from 'react-native-rss-parser';
import { oportunidadesOff } from '../api/oportunidadesOff';
import RenderHTML from 'react-native-render-html';
import { useState } from 'react';

interface ICardOportunidades {
  oportunidade: rssParser.FeedItem;
  url: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const CardOportunidades = (props: ICardOportunidades) => {
  const {oportunidade, url, navigation} = props;
  const idOportunidade = oportunidade.id.substring(oportunidade.id.indexOf('=') + 1);
  const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

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

  const {width, height} = Dimensions.get('window');

  return (
    <Pressable onPress={() => setAbrirDetalhes(!abrirDetalhes)}>
      <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco, elevation: 1}}>
          <View style={styles.boxPrincipal}>
            <View style={{flexDirection: 'row', padding: 10}}>
                 <Text variant='titleMedium' style={{ flex: 1}}> {oportunidade.title} </Text>
                <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                    size={25}  iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>    
            </View>
            <View style={styles.boxDetalhes}>
            {abrirDetalhes? 
            (oportunidade?.content ? (
              <>
                <Image source={colorScheme === 'dark' ? require( '../../../../img/DCC-Oficial-Dark.png') : require('../../../../img/DCC-Oficial-Light.png')} style={styles.imagem} resizeMode='cover'/>
                  <RenderHTML contentWidth={width} source={{ html: oportunidade?.content }} 
                    baseStyle={styles.baseRender}/>
                    <View style={{flex: 1,  alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                      <Button
                        icon='check-circle-outline'
                        mode='contained'
                        buttonColor={colors.accent}
                        style={{marginBottom: 10, marginTop: 10}}
                        onPress={() => 	navigation?.navigate('AlunosTab',{
                          screen: 'OportunidadesCadastro', 
                          params: {
                            oportunidade: oportunidade
                          }
                        })}>
                        Quero me candidatar
                      </Button>
                    </View>
                  </>
                ): null
            ): null}
            </View>
          </View>
      </View>
    </Pressable>
  );
};