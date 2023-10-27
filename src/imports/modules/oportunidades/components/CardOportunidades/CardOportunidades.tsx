import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Dimensions,  Pressable, View, useColorScheme, Image} from 'react-native';
import { IconButton, Text, useTheme, Button} from 'react-native-paper';
import {cardOportunidadesStyle} from './CardOportunidadesStyle';
import * as rssParser from 'react-native-rss-parser';
import RenderHTML from 'react-native-render-html';
import {  useContext, useState } from 'react';
import { IAsyncStorageUser } from '../../../../context/UserContext';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { ModalOportunidade } from '../../../../components/Oportunidade/ModalOportunidade';
import { IAnexo } from '../../../anexos/IAnexo';
import firestore from '@react-native-firebase/firestore';

interface ICardOportunidades {
  oportunidade: rssParser.FeedItem;
  url: string;
  navigation?: NativeStackNavigationProp<any>;
  user: IAsyncStorageUser | undefined;
  curriculo: IAnexo | undefined;
  historico: IAnexo | undefined;
}

export const CardOportunidades = (props: ICardOportunidades) => {
  const {oportunidade, url, navigation, user, curriculo, historico} = props;
  const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);
  const { showModal, showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardOportunidadesStyle(colors);
  const colorScheme = useColorScheme();

  const {width, height} = Dimensions.get('window');

  const cadastroNaOportunidade = async() => {
    const idOportunidade = oportunidade.id.split('&p=')[1];
    firestore()
    .collection('default')
    .add({
      oportunidade: idOportunidade,
      nome: user?.name,
      email: user?.email,
      curriculo: curriculo?.link,
      historico: historico?.link,
      criadoEm: new Date(),
    })
    .then(() => {
      showSnackBar({texto: 'Seu cadastro foi realizado com sucesso'});
    }).catch((error) =>{
      console.log(error)
    })

  }

  const modalSalvarDados = () => {
    showModal({
     renderedComponent: (_props: any) => (
       <ModalOportunidade
        oportunidadeTitulo={oportunidade.title}
        historicoNome={historico?.nome}
        curriculoNome={curriculo?.nome}
        navigation={navigation}
        user={user}
        handleCancela={_props.onDismiss}
        handleConfirma={async() => await cadastroNaOportunidade()}
         {...{ showSnackBar, showDialog }}/>
     )
     });
 }

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
                <Image source={colorScheme === 'dark' ? require( '../../../../../img/DCC-Oficial-Dark.png') : require('../../../../../img/DCC-Oficial-Light.png')} style={styles.imagem} resizeMode='cover'/>
                  <RenderHTML contentWidth={width} source={{ html: oportunidade?.content }} 
                    baseStyle={styles.baseRender}/>
                    <View style={{flex: 1,  alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                      <Button
                        icon='check-circle-outline'
                        mode='contained'
                        buttonColor={colors.accent}
                        style={{marginBottom: 10, marginTop: 10}}
                        onPress={async () => 	
                          user? (
                              modalSalvarDados()
                          ): (
                            navigation?.navigate('MenuTab',{
                              screen: 'Login', 
                              params:{ user: user} 
                            })
                          )
                        }>
                        {user ? 'Quero me candidatar' : 'Cadastrar meus dados'}
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