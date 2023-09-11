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
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', margin: 10}}>
                <Image source={require('../../../../img/DCC-Oficial.png')} style={styles.imagem} resizeMode='cover'/>
                <View style={styles.boxTexto}>
                    <Text variant='titleMedium' style={{ flex: 1}}> {oportunidade.title} </Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                    size={25}  iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>    
              </View>
            </View>
            <View style={styles.boxDetalhes}>
            {abrirDetalhes? 
            (oportunidade?.content ? (
                <>
                  <RenderHTML contentWidth={width} source={{ html: oportunidade?.content }} 
                    baseStyle={styles.baseRender}/>
                    <View style={{flex: 1,  alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                      <Button
                        icon='check-circle-outline'
                        mode='contained'
                        buttonColor={colors.accent}
                        style={{marginBottom: 10, marginTop: 10}}
                        onPress={() => console.log('oiii')}>
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












//     <>
//         <Card style={styles.container} mode='contained' testID='url'
//                     onPress={ async () => { 
//                       // await insereOportunidadeRealm(oportunidade);
//                       navigation?.navigate('oportunidadesRoute', {
//                         screen: 'OportunidadesDetail',
//                         params: { screenState: 'view', id: idOportunidade }})          
//         }
//         }>
//           {texto ? (
//             <View style={styles.boxHeader}>
//               <Text variant='titleLarge' style={{color: cor ?? undefined}}> {texto} </Text>
//               <IconButton icon='chevron-right-circle' size={30} 
//                   iconColor={cor}
//                   onPress={onPress}/>
//           </View>
//           ): null}
//         {oportunidade.media && oportunidade.media[0] ? (
//             <Card.Cover source={{uri: oportunidade.media[0].url}} style={styles.imagemCover} resizeMode='center'/>
//           ): null
//           }
//           <Card.Title
//             title={oportunidade.title}
//             titleVariant="titleMedium"
//             subtitle={oportunidade.description}
//             subtitleVariant="bodyMedium"
//             titleNumberOfLines={4}
//             subtitleNumberOfLines={4}
//           />
//           <Card.Actions>
//           <View style={styles.boxActions}>


// {/* 
//             <View style={styles.boxImagemUrl}>
//               <Image source={require('../../../../img/icone_dcc.png')} style={styles.imagem} />
//               <View style={{flexShrink: 1}}>
//                 <Text style={styles.textoUrl} numberOfLines={1} variant='labelMedium' ellipsizeMode='tail'> {url} </Text>
//               </View>
//             </View> */}
            
            
//             {/* <View style={styles.boxBotoes}>
//               <IconButton
//                 icon={'share-variant-outline'}
//                 iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
//                 style={styles.botoes}
//                 size={25}
//                 onPress={async() => await compartilharOportunidade()}
//               />
//             </View> */}
  
//             </View>
//           </Card.Actions>
//         </Card>
//           <Divisor />
//     </>
  );
};


// <View style={{ flexDirection: 'column'}}>
// <View style={{flex: 1, marginLeft: 50,}}>

// </View>

// </View>